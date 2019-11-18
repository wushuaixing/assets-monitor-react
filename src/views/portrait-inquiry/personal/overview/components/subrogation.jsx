import React from 'react';
import ColumnarEcharts from '../../../common/columnarEcharts';
import RingEcharts from '../../../common/ringEcharts';
import TimeLine from '../../../common/timeLine';
import { getSubrogation } from '@/utils/api/portrait-inquiry/personal/overview';
import { Spin } from '@/common';
import { getQueryByName } from '@/utils';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columnarData: [],
			RingData: [],
			timeLineData: [],
			colorArray: ['#45A1FF', '#4DCAC9', '#FCD44A', '#F2657A'],
		};
		this.info = {
			obligorName: getQueryByName(window.location.href, 'name'),
			obligorNumber: getQueryByName(window.location.href, 'num'),
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const params = this.info;
		this.setState({
			loading: true,
		});
		getSubrogation(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
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

	render() {
		const {
			columnarData, RingData, timeLineData, colorArray, loading,
		} = this.state;
		return (
			<div>
				<Spin visible={loading}>
					<div className="overview-container-title">
						<div className="overview-left-item" />
						<span className="container-title-num">12条</span>
						<span className="container-title-name"> 代位权信息 (裁判文书)</span>
					</div>
					<div className="overview-container-content">
						<TimeLine title="年份分布" Data={timeLineData} id="subrogation" />
						<ColumnarEcharts title="案由分布" Data={columnarData} id="subrogation" />
						<RingEcharts title="案件类型分布" Data={RingData} id="subrogation" colorArray={colorArray} />
					</div>
				</Spin>
			</div>
		);
	}
}
