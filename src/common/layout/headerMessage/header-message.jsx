import React from 'react';
import { navigate } from '@reach/router';
import { message } from 'antd';
import {
	notify, // 消息提醒
	isRead, // 标记已读
} from '@/utils/api/inform';

import { formatDateTime } from '@/utils/changeTime';
import './style.scss';

export default class HeaderMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
		};
	}

	componentDidMount() {
		this.informCenter();
	}

	informCenter = () => {
		notify().then((res) => {
			if (res.code === 200) {
				this.setState({
					dataList: res.data.list,
				});
			}
		});
	}

	skip= (obligorId, id) => {
		const params = {
			idList: [id],
		};
		console.log(obligorId, '跳转');
		navigate(`/business/debtor/detail?id=${obligorId}`);
		isRead(params).then((res) => {
			if (res.code === 200) {
				message.success(res.message);
			} else {
				message.warning(res.message);
			}
		});
	}

	// all
	allRead = () => {
		const { dataList } = this.state;
		const idList = [];
		dataList.map(item => idList.push(item.id));
		const params = {
			idList,
		};
		isRead(params).then((res) => {
			if (res.code === 200) {
				this.informCenter();
			} else {
				message.warning(res.message);
			}
		});
	}

	render() {
		const { dataList } = this.state;

		return (
			<div
				className="yc-header-message"
				onClick={(e) => {
					e.stopPropagation(); // 防止冒泡
				}}
			>
				<div className="yc-header-title">
					<div className="yc-station-box">
						<span>消息</span>
						<span onClick={this.allRead} className="yc-station-btn">全部标为已读</span>
					</div>
				</div>
				<div className="yc-station-list">
					{dataList && dataList.length > 0 ? dataList.map(item => (
						<div key={item.id} className="yc-station-item" onClick={() => this.skip(item.obligorId, item.id)}>
							{item.isRead === false && <div className="yc-badge-tab-red" />}
							<div className="yc-station-item-title">
								{item.title}
								<span className="yc-station-item-brief">{formatDateTime(item.createTime)}</span>
							</div>
							<div className="yc-station-item-content">{item.content}</div>
						</div>
					)) : (
						<div className="notice-station-wrapper">
							<div className="notice notice-station-img" />
							<span className="notice-text">
								暂无新消息，已读信息请至
								<a
									onClick={() => {
										navigate('/message');
									}}
									target="_blank"
								>
									消息中心
								</a>
								查看
							</span>
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
			</div>
		);
	}
}
