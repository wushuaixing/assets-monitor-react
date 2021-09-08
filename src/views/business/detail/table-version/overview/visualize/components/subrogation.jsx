import React from 'react';
import { Tooltip } from 'antd';
import { businessOverviewSubrogation, overviewSubrogation } from '@/utils/api/professional-work/overview';
import ColumnarEcharts from '@/views/portrait-inquiry/common/columnarEcharts';
import RingEcharts from '@/views/portrait-inquiry/common/ringEcharts';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import TagSide from '@/views/portrait-inquiry/common/checkBtn';
import getCount from '@/views/portrait-inquiry/common/getCount';
import { Icon } from '@/common';


export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectType: '',
			FilingArray: [],
			CourtArray: [],
			refereeArray: [],
			brokeArray: [],
			FilingNum: 0,
			CourtNum: 0,
			refereeNum: 0,
			brokeNum: 0,
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
		const {
			businessId, obligorId, getAssetProfile, portrait,
		} = this.props;
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2, requestSourceType: 1 };
		const api = portrait === 'business' ? businessOverviewSubrogation : overviewSubrogation;
		api(params).then((res) => {
			if (res.code === 200) {
				console.log('res', res);
				const FilingArray = res.data.subrogationInfos[0];
				const CourtArray = res.data.subrogationInfos[1];
				const refereeArray = res.data.subrogationInfos[2];
				const brokeArray = res.data.subrogationInfos[3];
				const FilingNum = FilingArray.count;
				const CourtNum = CourtArray.count;
				const refereeNum = refereeArray.count;
				const brokeNum = brokeArray.count;
				const allNum = FilingArray.count + CourtArray.count + refereeArray.count + brokeNum;
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
				} else if (brokeNum > 0) {
					this.setState({
						selectType: 'Broke',
						RingData: brokeArray.caseTypes,
						columnarData: brokeArray.caseReasons,
						timeLineData: brokeArray.yearDistribution,
						RingDataNum: getCount(brokeArray.caseTypes),
						columnarDataNum: getCount(brokeArray.caseReasons),
						timeLineDataNum: getCount(brokeArray.yearDistribution),
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
					brokeArray, // 破产代位
					FilingNum,
					CourtNum,
					refereeNum,
					brokeNum,
				});
			}
		}).catch(() => {
			// this.setState({ loading: false });
		});
	};

	checkTime = (selectType) => {
		const {
			FilingArray, CourtArray, refereeArray, brokeArray,
		} = this.state;
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
		} else if (selectType === 'broke') {
			this.setState({
				selectType,
				RingData: brokeArray.caseTypes,
				columnarData: brokeArray.caseReasons,
				timeLineData: brokeArray.yearDistribution,
				RingDataNum: getCount(brokeArray.caseTypes),
				columnarDataNum: getCount(brokeArray.caseReasons),
				timeLineDataNum: getCount(brokeArray.yearDistribution),
			});
		}
	};

	render() {
		const { portrait } = this.props;
		const {
			RingData, columnarData, timeLineData, selectType, FilingArray, CourtArray, refereeArray, brokeArray, FilingNum, CourtNum, refereeNum, RingDataNum, timeLineDataNum, columnarDataNum, brokeNum,
		} = this.state;

		return (
			<div>
				{timeLineDataNum > 0 || RingDataNum > 0 ? (
					<div>
						<div className="overview-container-title">
							<div className="overview-left-item" />
							<span className="container-title-num">
								{FilingArray.count || CourtArray.count || refereeArray.count || brokeArray.count ? `${FilingArray.count + CourtArray.count + refereeArray.count + brokeArray.count} 条` : '-'}
							</span>
							<span className="container-title-name">
								{portrait === 'debtor_personal' ? '代位权信息 (裁判文书)' : '代位权信息'}

								<Tooltip placement="top" title="债务人作为原告起诉他人的案件" arrowPointAtCenter>
									<span style={{ verticalAlign: 'middle' }}>
										<Icon
											type="icon-question"
											style={{
												fontSize: 16, color: '#7D8699', marginLeft: 5, cursor: 'pointer',
											}}
										/>
									</span>
								</Tooltip>
							</span>
						</div>
						<div className="overview-container-content">
							{portrait !== 'debtor_personal' && (
							<div style={{ marginBottom: 20 }}>
								<TagSide
									content="立案信息"
									num={FilingNum}
									onClick={() => {
										if (FilingNum > 0) {
											this.checkTime('Filing');
										}
									}}
									tag={selectType === 'Filing' ? 'yc-tag-active' : ''}
									style={{ padding: '0 15px' }}
								/>
								<TagSide
									content="开庭信息"
									num={CourtNum}
									onClick={() => {
										if (CourtNum > 0) {
											this.checkTime('Court');
										}
									}}
									tag={selectType === 'Court' ? 'yc-tag-active' : ''}
									style={{ padding: '0 15px' }}
								/>
								<TagSide
									content="裁判文书"
									num={refereeNum}
									onClick={() => {
										if (refereeNum > 0) {
											this.checkTime('referee');
										}
									}}
									tag={selectType === 'referee' ? 'yc-tag-active' : ''}
									style={{ padding: '0 15px' }}
								/>
								<TagSide
									content="破产代位"
									num={brokeNum}
									onClick={() => {
										if (brokeNum > 0) {
											this.checkTime('broke');
										}
									}}
									tag={selectType === 'broke' ? 'yc-tag-active' : ''}
									style={{ padding: '0 15px' }}
								/>
							</div>
							)}
							{timeLineDataNum > 0 && <TimeLine title="年份分布" Data={timeLineData} id="subrogation" />}
							<div style={{ marginBottom: 20 }}>
								{selectType !== 'Filing' && columnarDataNum > 0 && <ColumnarEcharts title="案由分布" Data={columnarData} id="subrogation" />}
							</div>
							{RingDataNum > 0 && <RingEcharts title="案件类型分布" Data={RingData} id="subrogation" customColorArray={['#45A1FF', '#4DCAC9', '#FCD44A', '#F2657A']} />}
						</div>
					</div>
				) : null }
			</div>
		);
	}
}
