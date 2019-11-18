import React from 'react';
import TimeLine from '../../../common/timeLine';
import { getDishonest } from '@/utils/api/portrait-inquiry/personal/overview';
import { Spin } from '@/common';
import { getQueryByName } from '@/utils';

export default class LostLetter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeLineData: [
				{ num: 2, year: 2017 },
				{ num: 6, year: 2018 },
			],
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
		getDishonest(params)
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
		const { timeLineData, loading } = this.state;
		return (
			<div>
				<Spin visible={loading}>
					<div className="overview-container-title">
						<div className="overview-left-item" />
						<span className="container-title-num">8条</span>
						<span className="container-title-name">失信记录</span>
					</div>
					<div className="overview-container-content">
						<TimeLine title="年份分布" Data={timeLineData} id="lostLetter" />
					</div>
				</Spin>
			</div>
		);
	}
}
