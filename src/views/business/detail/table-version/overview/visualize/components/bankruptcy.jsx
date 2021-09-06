import React from 'react';
import { overviewBankruptcy } from '@/utils/api/professional-work/overview';

import { Spin, LiItem } from '@/common';

import './style.scss';

export default class Bankruptcy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: {},
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			obligorId,
		} = this.props;
		this.setState({ loading: true });
		overviewBankruptcy({ obligorId }).then((res) => {
			const { data, code } = res;
			if (code === 200) {
				this.setState({
					data,
				});
			}
			this.setState({ loading: false });
		});
	};


	render() {
		const { data, loading } = this.state;
		const { bankruptcyNum, caseNumber, gmtPublish } = data;
		console.log(data);
		return (
			<div>
				{
					bankruptcyNum > 0
						? (
							<Spin visible={loading}>
								<div className="overview-container-title">
									<div className="overview-left-item" />
									<span className="container-title-num">
										{`${bankruptcyNum} 条`}
									</span>
									<span className="container-title-name">破产重组信息</span>
								</div>
								<div className="overview-container-content">
									{/* {getCount(timeLineData) > 0 && <TimeLine title="年份分布" Data={timeLineData} id="ChattelMortgage" />} */}
									<li className="overview-container-content-item">
										<div className="overview-container-content-item-label">关联案号：</div>
										<div className="overview-container-content-item-val">{caseNumber || '-'}</div>
									</li>
									<li className="overview-container-content-item">
										<div className="overview-container-content-item-label">最新公告发布日期：</div>
										<div className="overview-container-content-item-val">{gmtPublish || '-'}</div>
									</li>
								</div>
							</Spin>
						) : null}
			</div>
		);
	}
}
