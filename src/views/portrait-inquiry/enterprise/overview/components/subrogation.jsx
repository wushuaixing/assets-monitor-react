import React from 'react';
import { Tooltip } from 'antd';
import RingEcharts from '../../../common/ringEcharts';
import TimeLine from '../../../common/timeLine';
import ColumnarEcharts from '../../../common/columnarEcharts';
import { TagOneSide, TagTwoSide } from '../../../common/label-tag';
import { getSubrogation } from '@/utils/api/portrait-inquiry/enterprise/overview';
import getCount from '../../../common/getCount';
import businessImg from '@/assets/img/business/icon_recovery_n.png';

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
			columnarData: [],
			timeLineData: [],
			RingDataNum: 0,
			timeLineDataNum: 0,
			columnarDataNum: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { companyId, getAssetProfile } = this.props;
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
							columnarData: FilingArray.caseReasons,
							timeLineData: FilingArray.yearDistribution,
							RingDataNum: getCount(FilingArray.caseTypes),
							columnarDataNum: getCount(FilingArray.caseReasons),
							timeLineDataNum: getCount(FilingArray.yearDistribution),
						});
					} else if (CourtNum > 0) {
						this.setState({
							selectType: 'Court',
							RingData: CourtArray.caseTypes,
							columnarData: CourtArray.caseReasons,
							timeLineData: CourtArray.yearDistribution,
							RingDataNum: getCount(CourtArray.caseTypes),
							columnarDataNum: getCount(CourtArray.caseReasons),
							timeLineDataNum: getCount(CourtArray.yearDistribution),
						});
					} else {
						this.setState({
							selectType: 'referee',
							RingData: refereeArray.caseTypes,
							columnarData: refereeArray.caseReasons,
							timeLineData: refereeArray.yearDistribution,
							RingDataNum: getCount(refereeArray.caseTypes),
							columnarDataNum: getCount(refereeArray.caseReasons),
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
					});
				} else {
					// this.setState({ loading: false });
				}
			})
			.catch(() => {
				// this.setState({ loading: false });
			});
	};

	checkTime = (selectType) => {
		const { FilingArray, CourtArray, refereeArray } = this.state;
		if (selectType === 'Filing') {
			this.setState({
				selectType,
				RingData: FilingArray.caseTypes,
				columnarData: FilingArray.caseReasons,
				timeLineData: FilingArray.yearDistribution,
				RingDataNum: getCount(FilingArray.caseTypes),
				columnarDataNum: getCount(FilingArray.caseReasons),
				timeLineDataNum: getCount(FilingArray.yearDistribution),
			});
		} else if (selectType === 'Court') {
			this.setState({
				selectType,
				RingData: CourtArray.caseTypes,
				columnarData: CourtArray.caseReasons,
				timeLineData: CourtArray.yearDistribution,
				RingDataNum: getCount(CourtArray.caseTypes),
				columnarDataNum: getCount(CourtArray.caseReasons),
				timeLineDataNum: getCount(CourtArray.yearDistribution),
			});
		} else if (selectType === 'referee') {
			this.setState({
				selectType,
				RingData: refereeArray.caseTypes,
				columnarData: refereeArray.caseReasons,
				timeLineData: refereeArray.yearDistribution,
				RingDataNum: getCount(refereeArray.caseTypes),
				columnarDataNum: getCount(refereeArray.caseReasons),
				timeLineDataNum: getCount(refereeArray.yearDistribution),
			});
		}
	};

	render() {
		const {
			RingData, columnarData, timeLineData, selectType, FilingArray, CourtArray, refereeArray, FilingNum, CourtNum, refereeNum, RingDataNum, timeLineDataNum, columnarDataNum,
		} = this.state;

		return (
			<div>
				{timeLineDataNum > 0 || RingDataNum > 0 ? (
					<div>
						<div className="overview-container-title">
							<div className="overview-left-item" />
							<span className="container-title-num">
								{FilingArray.count || CourtArray.count || refereeArray.count ? `${FilingArray.count + CourtArray.count + refereeArray.count} 条` : '-'}
							</span>
							<span className="container-title-name">
								代位权信息
								<Tooltip placement="top" title="查询主体作为原告起诉他人的案件" arrowPointAtCenter>
									<img src={businessImg} alt="业务视图提示" className="yc-business-icon" />
								</Tooltip>
							</span>
						</div>
						<div className="overview-container-content">
							<div style={{ marginBottom: 20 }}>
								<TagOneSide
									content="立案信息"
									num={FilingNum}
									onClick={() => {
										if (FilingNum > 0) {
											this.checkTime('Filing');
										}
									}}
									tag={selectType === 'Filing' ? 'yc-tag-active' : ''}
								/>
								<TagTwoSide
									content="开庭信息"
									num={CourtNum}
									onClick={() => {
										if (CourtNum > 0) {
											this.checkTime('Court');
										}
									}}
									tag={selectType === 'Court' ? 'yc-tag-active' : ''}
								/>
								<TagTwoSide
									content="裁判文书"
									num={refereeNum}
									onClick={() => {
										if (refereeNum > 0) {
											this.checkTime('referee');
										}
									}}
									tag={selectType === 'referee' ? 'yc-tag-active' : ''}
								/>
							</div>
							{timeLineDataNum > 0 && <TimeLine title="年份分布" Data={timeLineData} id="subrogation" />}
							<div style={{ marginBottom: 20 }}>
								{selectType !== 'Filing' && columnarDataNum > 0 && <ColumnarEcharts title="案由分布" Data={columnarData} id="subrogation" />}
							</div>
							{RingDataNum > 0 && <RingEcharts title="案件类型分布" Data={RingData} id="subrogation" />}
						</div>
					</div>
				) : null }
			</div>
		);
	}
}
