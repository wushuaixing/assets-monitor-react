import React from 'react';
import { navigate } from '@reach/router';
import {
	notify, // 消息提醒
	// exportExcel, // 导出
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
		notify().then((res) => {
			if (res.code === 200) {
				this.setState({
					dataList: res.data.list,
				});
			}
		});
	}

	render() {
		const { dataList } = this.state;

		return (
			<div className="yc-header-message">
				<div className="yc-header-title">
					<div className="yc-station-box">
						<span>消息</span>
						<span className="yc-station-btn">全部标为已读</span>
					</div>
				</div>
				<div className="yc-station-list">
					{dataList && dataList.length > 0 ? dataList.map(item => (
						<div key={item.id} className="yc-station-item">
							{item.isRead && <div className="yc-badge-tab-red" />}
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
