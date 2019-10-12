/** 首页 * */

import React from 'react';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import { message } from 'antd';
import TableTree from './tableTree';
import {
	selfTree, // login
} from '@/utils/api/home';
import { toThousands } from '@/utils/changeTime';
import { Spin } from '@/common';
import './style.scss';


class HomeRouter extends React.Component {
	constructor(props) {
		super(props);
		document.title = '首页';
		this.state = {
			orgDetail: null,
			tree: null,
			errorLoading: false,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		// 避免在登录页请求
		if (hash !== '#/login') {
			this.getData();
		}
	}


	// 获取消息列表
	getData = () => {
		this.setState({
			errorLoading: true,
		});
		selfTree().then((res) => {
			if (res && res.code === 200) {
				this.setState({
					orgDetail: res.data.orgDetail,
					tree: res.data.tree,
					errorLoading: false,
				});
			} else {
				this.setState({
					errorLoading: false,
				});
				message.error(res.message);
			}
		}).catch(() => {
			console.log(1);
			this.setState({
				errorLoading: false,
			});
		});
	};

	render() {
		const { orgDetail, tree, errorLoading } = this.state;
		return (
			<div className="yc-home">
				<Spin visible={errorLoading} modal />

				<div className="yc-home-header">
					<div className="yc-header-left">
						<div className="yc-content-title">我的机构</div>
						<div className="yc-left-text">{orgDetail && orgDetail ? orgDetail.name : '-'}</div>
					</div>
					<div className="yc-header-right">
						<div className="yc-public-normal">机构数</div>
						<div className="yc-right-num">{orgDetail && orgDetail ? orgDetail.totalCount : '-'}</div>
					</div>
				</div>
				<div className="yc-home-background" />
				<div className="yc-home-content">
					<div className="yc-content-header">
						<div className="yc-content-title">
							数据统计
							<span className="yc-public-remark-normal"> 包括本机构及子机构 </span>
						</div>
						<div className="yc-content-item">
							<div className="left yc-content-item1">
								<div className="yc-text">
									<span className="yc-icon" />
									未跟进监控信息数  (条)
								</div>
								<div className="yc-num">
									<span style={{ color: 'red' }}>{tree ? tree.monitorUnfollowedCount : '-'}</span>
									<div className="right yc-count-sounds">
										<span className="yc-statistic-text">
											跟进
											<span className="yc-txt-normal">{tree ? tree.monitorFollowedCount : '-'}</span>
										</span>
										<span className="ant-divider" style={{ margin: '0 20px 0 6px' }} />
										<span className="yc-statistic-text">
											完成
											<span className="yc-txt-normal">{tree ? tree.monitorDoneCount : '-'}</span>
										</span>
										<span className="ant-divider" style={{ margin: '0 20px 0 6px' }} />
										<span className="yc-statistic-text">
											全部
											<span className="yc-txt-normal">{tree ? tree.monitorTotalCount : '-'}</span>
										</span>
									</div>
								</div>
							</div>
							<div className="left yc-content-item2">
								<div className="yc-text">
									<span className="yc-icon-debtor" />
									监控债务人数  (人)
								</div>
								<div className="yc-num">
									<span>{tree ? tree.obligorCount : '-'}</span>
								</div>
							</div>
							<div className="left yc-content-item2">
								<div className="yc-text">
									<span className="yc-icon-money" />
									追回总金额  (元)
								</div>
								<div className="yc-num">
									<span>{tree ? toThousands(tree.recovery) : '-'}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="yc-home-background" />
				<div className="yc-container-main">
					<div className="yc-content-title">
							机构统计
					</div>
					<TableTree tree={tree && tree} />
				</div>
			</div>
		);
	}
}

export default HomeRouter;
