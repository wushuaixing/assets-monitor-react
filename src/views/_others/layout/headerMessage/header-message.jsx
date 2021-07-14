import React from 'react';
import { navigate } from '@reach/router';
import { message } from 'antd';
import {
	notify, // 消息提醒
	isRead as isReads, // 标记已读
} from '@/utils/api/inform';
import {
	userInfo, // 通知中心数据
} from '@/utils/api/user';
import { clearEmpty, DownloadFile } from '@/utils';
import { Button, Icon, Spin } from '@/common';
import { formatDateTime } from '@/utils/changeTime';
import noData from '@/assets/img/home/img_blank_nodata.png';
import baseUrl from 'api/config';
import { exportFile } from 'api/home';
import Cookies from 'universal-cookie';
import './style.scss';

const cookies = new Cookies();
export default class HeaderMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
			loading: false,
			orgPower: false,
			isRead: 'all',
		};
	}

	componentWillMount() {
		userInfo().then((res) => {
			const { currentOrgId, masterOrgId } = res.data;
			if (currentOrgId === masterOrgId) {
				this.setState({
					orgPower: true,
				});
			}
		});
	}

	componentDidMount() {
		const { rule } = this.props;
		if (rule && rule.menu_sy) {
			this.informCenter();
		}
	}

	informCenter = (val) => {
		const { getNoticeNum } = this.props;
		const { isRead } = this.state;
		const params = {
			...val,
		};
		if (isRead === 'else') params.isRead = false;
		this.setState({
			loading: true,
		});
		notify(clearEmpty(params)).then((res) => {
			if (res.code === 200) {
				getNoticeNum(res.data.total);
				this.setState({
					dataList: res.data.list,
					loading: false,
				});
			} else {
				this.setState({
					loading: false,
				});
			}
		});
	};

	skip = (item) => {
		const { obligorId, id, operateType } = item;
		// const params = {
		// 	idList: [id],
		// };
		// const { orgPower } = this.state;
		// 资产跟进提醒 tab切换为跟进中 带入拍卖信息标题
		if (operateType === 'newAuctionProcessAlert') {
			const { title } = JSON.parse(item.extend);
			const w = window.open('about:blank');
			w.location.href = `#/monitor?process=3&id=${obligorId}${title ? `&title=${title}` : ''}`;
		}
		// 拍卖状态变更  tab切换为全部 带入拍卖信息标题
		if (operateType === 'auctionStatusChangeAlert') {
			const { title } = JSON.parse(item.extend);
			const w = window.open('about:blank');
			w.location.href = `#/monitor?process=3&id=${obligorId}${title ? `&title=${title}` : ''}`;
		}
		// 列入失信名单 || 失信状态移除
		if (operateType === 'dishonestAdd' || operateType === 'dishonestRemove') {
			const w = window.open('about:blank');
			w.location.href = `#/business/debtor/detail?id=${
				obligorId
			}`;
		}
		// 监控日报
		if (operateType === 'monitorReport') {
			if (JSON.parse(item.extend) && JSON.parse(item.extend).total > 200) {
				const w = window.open('about:blank');
				w.location.href = '#/info/monitor';
			} else {
				const w = window.open('about:blank');
				w.location.href = `#/messageDetail?stationId=${
					id
				}`;
			}
		}
		this.readPackaging(id);
	};

	readPackaging = (item) => {
		const { orgPower } = this.state;
		const { id } = item;
		const params = {
			idList: [id],
		};
		if (orgPower) {
			isReads(params).then((res) => {
				if (res.code === 200) {
					this.informCenter('', true);
					// window.location.reload(); // 实现页面重新加载/
					console.log('成功');
				} else {
					message.warning(res.message);
				}
			});
		}
	}

	// all
	allRead = () => {
		notify({ isRead: false }).then((res) => {
			if (res.code === 200) {
				if (res.data.total) {
					isReads({}).then((val) => {
						if (val.code === 200) {
							this.informCenter();
						} else {
							message.warning(res.message);
						}
					});
				} else {
					message.warning('当前没有未读数量');
				}
			}
		});
	};

	handleReadChange = (val) => {
		this.setState({
			isRead: val,
		}, () => {
			this.informCenter();
		});
	};

	download = (item) => {
		const { total } = JSON.parse(item.extend);
		const token = cookies.get('token');
		DownloadFile(`${baseUrl}${exportFile(total)}?token=${token}`);
	}

	render() {
		const { dataList, loading, isRead } = this.state;
		return (
			<div
				className="yc-header-message"
				onClick={(e) => {
					e.stopPropagation(); // 防止冒泡
				}}
			>
				<div className="yc-header-title">
					<div className="yc-station-box">
						<Button
							style={{ borderRadius: '2px 0 0 2px' }}
							className="yc-station-box-btn"
							active={isRead === 'all'}
							title="全部"
							onClick={() => this.handleReadChange('all')}
						/>
						<Button
							style={{ borderRadius: '0 2px 2px 0' }}
							className="yc-station-box-btn"
							active={isRead === 'else'}
							title="未读"
							onClick={() => this.handleReadChange('else')}
						/>
						<div className="yc-station-btn">
							<i className="iconfont icon-quanbubiaoweiyidu yc-station-btn-icon" />
							<span onClick={this.allRead}>全部标为已读</span>
						</div>
					</div>
				</div>
				<Spin visible={loading}>
					<div
						className="yc-station-list"
						onClick={(e) => {
							e.stopPropagation(); // 防止冒泡
						}}
					>
						{dataList && dataList.length > 0 ? dataList.map(item => (
							<div key={item.id} onClick={() => this.readPackaging(item)} className="yc-station-item">
								{item.isRead === false && (
								<Icon
									type="icon-dot"
									style={{
										fontSize: 12, color: 'red', position: 'absolute', top: '10px', left: '8px',
									}}
								/>
								)}
								<div className="yc-station-item-title">
									{item.title}
									<span className="yc-station-item-brief">{formatDateTime(item.createTime)}</span>
								</div>
								<div className="yc-station-item-content">
									<span dangerouslySetInnerHTML={{ __html: item.content }} />
									，
									{
										item.operateType === 'businessReport' && JSON.parse(item.extend) && !JSON.parse(item.extend).disable ? <span onClick={() => this.download(item)} className="yc-station-item-content-span">下载文件</span> : <span className="yc-station-item-content-text">文件下载失败</span>
									}
									{
										item.operateType === 'monitorReport' && <span onClick={() => this.skip(item)} className="yc-station-item-content-span">点击查看 ></span>
									}
								</div>
							</div>
						)) : (
							<div className="notice-station-wrapper">
								<img src={noData} className="notice-station-img" />
								<div className="notice-text">
									暂无新消息
								</div>
							</div>
						)}
					</div>
					<div className="yc-station-box-center">
						<a onClick={() => {
							navigate('/message');
						}}
						>
							查看全部
						</a>
					</div>
				</Spin>

			</div>
		);
	}
}
