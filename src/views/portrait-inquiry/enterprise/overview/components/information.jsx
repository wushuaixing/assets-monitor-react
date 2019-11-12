import React from 'react';
import RingEcharts from '../../../common/ringEcharts';
import TimeLine from '../../../common/timeLine';
import { TagOneSide, TagTwoSide } from '../../../common/label-tag';

export default class Information extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectType: 'Filing',
			RingData: [
				{ value: 20, name: '普通案件' },
				{ value: 14, name: '执行案件' },
				{ value: 10, name: '终本案件' },
				{ value: 5, name: '破产案件' },
			],
			timeLineData: [
				{ num: 2, year: 2017 },
				{ num: 6, year: 2018 },
			],
		};
	}

	checkTime = (selectType) => {
		if (selectType === 'Filing') {
			this.setState({
				selectType,
				timeLineData: [
					{ num: 2, year: 2017 },
					{ num: 6, year: 2018 },
					{ num: 6, year: 2019 },
				],
				RingData: [
					{ value: 20, name: '普通案件' },
					{ value: 14, name: '执行案件' },
					{ value: 10, name: '终本案件' },
					{ value: 5, name: '破产案件' },
				],
			});
		} else if (selectType === 'Court') {
			this.setState({
				selectType,
				timeLineData: [
					{ num: 2, year: 2017 },
					{ num: 6, year: 2018 },
				],
				RingData: [
					{ value: 20, name: '已成交' },
					{ value: 14, name: '正在进行' },
					{ value: 10, name: '即将开始' },
					{ value: 5, name: '已流拍' },
					{ value: 7, name: '中止' },
					{ value: 6, name: '撤回' },
				],
			});
		} else if (selectType === 'referee') {
			this.setState({
				selectType,
				timeLineData: [
					{ num: 2, year: 2017 },
					{ num: 6, year: 2018 },
					{ num: 6, year: 2019 },
				],
				RingData: [
					{ value: 14, name: '正在进行' },
					{ value: 10, name: '即将开始' },
					{ value: 5, name: '已流拍' },
					{ value: 7, name: '中止' },
					{ value: 6, name: '撤回' },
				],
			});
		}
	};

	render() {
		const { RingData, timeLineData, selectType } = this.state;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-num">12条</span>
					<span className="container-title-name">  涉诉信息</span>
				</div>
				<div className="overview-container-content">
					<div style={{ marginBottom: 20 }}>
						{/* <Button style={{ marginRight: 10 }} onClick={() => this.checkTime('Filing')}>立案信息 8 条</Button>
						<Button style={{ marginRight: 10 }} onClick={() => this.checkTime('Court')}>开庭信息 8 条</Button>
						<Button onClick={() => this.checkTime('referee')}>裁判文书 8 条</Button> */}
						<TagOneSide content="立案信息" num={9} onClick={() => this.checkTime('Filing')} tag={selectType === 'Filing' ? 'yc-tag-active' : ''} />
						<TagTwoSide content="开庭信息" num={8} onClick={() => this.checkTime('Court')} tag={selectType === 'Court' ? 'yc-tag-active' : ''} />
						<TagTwoSide content="裁判文书" num={8} onClick={() => this.checkTime('referee')} tag={selectType === 'referee' ? 'yc-tag-active' : ''} />
					</div>
					<TimeLine title="年份分布" Data={timeLineData} id="Information" />
					<RingEcharts title="案件类型分布" Data={RingData} id="Information" />
				</div>
			</div>
		);
	}
}
