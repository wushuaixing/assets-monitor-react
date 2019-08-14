/** 首页 * */

import React from 'react';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import TableTree from './tableTree';
import './style.scss';


class HomeRouter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="yc-home">
				<div className="yc-home-header">
					<div className="yc-header-left">
						<div className="yc-left-title">我的机构</div>
						<div className="yc-left-text">崔金鑫测试机构121</div>
					</div>
					<div className="yc-header-right">
						<div className="yc-right-title">机构数</div>
						<div className="yc-right-num">28</div>
					</div>
				</div>
				<div className="yc-home-background" />
				<div className="yc-home-content">
					<div className="yc-content-header">
						<div className="yc-content-title">
							数据统计
							<span className="yc-content-spite">（包括本机构及子机构）</span>
						</div>
						<div className="yc-content-item">
							<div className="left yc-content-item1">
								<div className="yc-text">
									<span className="yc-icon" />
									未跟进监控信息数/条
								</div>
								<div className="yc-num">
									<span style={{ color: 'red' }}>201</span>
									<div className="right yc-count-sounds">
										<span className="yc-statistic-text">
											跟进
											<span className="yc-txt-normal">70</span>
										</span>
										<span className="yc-statistic-text">
											完成
											<span className="yc-txt-normal">14</span>
										</span>
										<span className="yc-statistic-text">
											全部
											<span className="yc-txt-normal">300</span>
										</span>
									</div>
								</div>
							</div>
							<div className="left yc-content-item2">
								<div className="yc-text">
									<span className="yc-icon-debtor" />
									未跟进监控信息数/条
								</div>
								<div className="yc-num">
									<span>22735</span>
								</div>
							</div>
							<div className="left yc-content-item2">
								<div className="yc-text">
									<span className="yc-icon-money" />
									未跟进监控信息数/条
								</div>
								<div className="yc-num">
									<span>22735</span>
								</div>
							</div>
						</div>
					</div>
					<div className="yc-container-main">
						<div className="yc-content-title">
							机构统计
						</div>
						<TableTree />
					</div>
				</div>
			</div>
		);
	}
}

export default HomeRouter;
