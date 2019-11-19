import React from 'react';
import RingEcharts from '../../../common/ringEcharts';
import TimeLine from '../../../common/timeLine';
import { TagOneSide, TagTwoSide } from '../../../common/label-tag';
import getCount from '../../../common/getCount';

export default class Information extends React.Component {
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
		this.getPropsData();
	}

	getPropsData = () => {
		const { litigationInfosArray } = this.props;

		if (litigationInfosArray && litigationInfosArray.length > 0) {
			const FilingArray = litigationInfosArray[0];
			const CourtArray = litigationInfosArray[1];
			const refereeArray = litigationInfosArray[2];
			const FilingNum = FilingArray.count;
			const CourtNum = CourtArray.count;
			const refereeNum = refereeArray.count;

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
			});
		}
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
			RingData, timeLineData, selectType, timeLineDataNum, RingDataNum, FilingNum, CourtNum, refereeNum,
		} = this.state;


		return (
			<div>
				{timeLineDataNum > 0 || RingDataNum > 0 ? (
					<div>
						<div className="overview-container-title">
							<div className="overview-left-item" />
							<span className="container-title-num">
								{FilingNum || CourtNum || refereeNum ? `${FilingNum + CourtNum + refereeNum}  条` : ''}
							</span>
							<span className="container-title-name">  涉诉信息</span>
						</div>
						<div className="overview-container-content">
							<div style={{ marginBottom: 20 }}>
								<TagOneSide content="立案信息" num={FilingNum} onClick={() => this.checkTime('Filing')} tag={selectType === 'Filing' ? 'yc-tag-active' : ''} />
								<TagTwoSide content="开庭信息" num={CourtNum} onClick={() => this.checkTime('Court')} tag={selectType === 'Court' ? 'yc-tag-active' : ''} />
								<TagTwoSide content="裁判文书" num={refereeNum} onClick={() => this.checkTime('referee')} tag={selectType === 'referee' ? 'yc-tag-active' : ''} />
							</div>
							{timeLineDataNum > 0 && <TimeLine title="年份分布" Data={timeLineData} id="Information" />}
							{RingDataNum > 0 && <RingEcharts title="案件类型分布" Data={RingData} id="Information" />}
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
