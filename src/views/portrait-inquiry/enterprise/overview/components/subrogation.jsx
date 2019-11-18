import React from 'react';
import RingEcharts from '../../../common/ringEcharts';
import TimeLine from '../../../common/timeLine';
import { TagOneSide, TagTwoSide } from '../../../common/label-tag';
import { getSubrogation } from '@/utils/api/portrait-inquiry/enterprise/overview';
import { Spin } from '@/common';
import getCount from '../../../common/getCount';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectType: '',
			FilingArray: [],
			CourtArray: [],
			refereeArray: [],
			FilingNum: 0,
			CourtNum: 0,
			refereeNum: 0,
			RingData: [],
			timeLineData: [],
			RingDataNum: 0,
			timeLineDataNum: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { companyId, getAssetProfile } = this.props;
		this.setState({
			loading: true,
		});
		const params = {
			companyId,
		};
		getSubrogation(params)
			.then((res) => {
				if (res.code === 200) {
					const FilingArray = res.data.subrogationInfos[0];
					const CourtArray = res.data.subrogationInfos[1];
					const refereeArray = res.data.subrogationInfos[2];
					const FilingNum = FilingArray.count;
					const CourtNum = CourtArray.count;
					const refereeNum = refereeArray.count;
					const allNum = FilingArray.count + CourtArray.count + refereeArray.count;
					getAssetProfile(allNum, 'Subrogation');

					if (FilingNum > 0) {
						this.setState({
							selectType: 'Filing',
							RingData: FilingArray.caseTypes,
							timeLineData: FilingArray.yearDistribution,
							RingDataNum: getCount(FilingArray.caseTypes),
							timeLineDataNum: getCount(FilingArray.yearDistribution),
						});
					} else if (CourtNum > 0) {
						this.setState({
							selectType: 'Court',
							RingData: CourtArray.caseTypes,
							timeLineData: CourtArray.yearDistribution,
							RingDataNum: getCount(CourtArray.caseTypes),
							timeLineDataNum: getCount(CourtArray.yearDistribution),
						});
					} else {
						this.setState({
							selectType: 'referee',
							RingData: refereeArray.caseTypes,
							timeLineData: refereeArray.yearDistribution,
							RingDataNum: getCount(refereeArray.caseTypes),
							timeLineDataNum: getCount(refereeArray.yearDistribution),
						});
					}
					this.setState({
						FilingArray, // 立案信息
						CourtArray, // 开庭信息
						refereeArray, // 裁判文书
						FilingNum,
						CourtNum,
						refereeNum,

						loading: false,
					});
				} else {
					this.setState({ loading: false });
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	}

	checkTime = (selectType) => {
		const { FilingArray, CourtArray, refereeArray } = this.state;
		if (selectType === 'Filing') {
			this.setState({
				selectType,
				RingData: FilingArray.caseTypes,
				timeLineData: FilingArray.yearDistribution,
				RingDataNum: getCount(FilingArray.caseTypes),
				timeLineDataNum: getCount(FilingArray.yearDistribution),
			});
		} else if (selectType === 'Court') {
			this.setState({
				selectType,
				RingData: CourtArray.caseTypes,
				timeLineData: CourtArray.yearDistribution,
				RingDataNum: getCount(CourtArray.caseTypes),
				timeLineDataNum: getCount(CourtArray.yearDistribution),
			});
		} else if (selectType === 'referee') {
			this.setState({
				selectType,
				RingData: refereeArray.caseTypes,
				timeLineData: refereeArray.yearDistribution,
				RingDataNum: getCount(refereeArray.caseTypes),
				timeLineDataNum: getCount(refereeArray.yearDistribution),
			});
		}
	};

	render() {
		const {
			RingData, timeLineData, selectType, loading, FilingArray, CourtArray, refereeArray, FilingNum, CourtNum, refereeNum, RingDataNum, timeLineDataNum,
		} = this.state;

		return (
			<div>
				<Spin visible={loading}>
					{timeLineDataNum > 0 || RingDataNum > 0 ? (
						<div>
							<div className="overview-container-title">
								<div className="overview-left-item" />
								<span className="container-title-num">
									{FilingArray.count || CourtArray.count || refereeArray.count ? `${FilingArray.count + CourtArray.count + refereeArray.count} 条` : '-'}
								</span>
								<span className="container-title-name"> 代位权信息 (裁判文书)</span>
							</div>
							<div className="overview-container-content">
								<div style={{ marginBottom: 20 }}>
									<TagOneSide content="立案信息" num={FilingNum} onClick={() => this.checkTime('Filing')} tag={selectType === 'Filing' ? 'yc-tag-active' : ''} />
									<TagTwoSide content="开庭信息" num={CourtNum} onClick={() => this.checkTime('Court')} tag={selectType === 'Court' ? 'yc-tag-active' : ''} />
									<TagTwoSide content="裁判文书" num={refereeNum} onClick={() => this.checkTime('referee')} tag={selectType === 'referee' ? 'yc-tag-active' : ''} />
								</div>
								{timeLineDataNum > 0 && <TimeLine title="年份分布" Data={timeLineData} id="subrogation" />}
								{RingDataNum > 0 && <RingEcharts title="案件类型分布" Data={RingData} id="subrogation" />}
							</div>
						</div>
					) : null}
				</Spin>
			</div>
		);
	}
}
