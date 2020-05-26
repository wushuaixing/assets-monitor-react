import React from 'react';
import { Modal, Button } from 'antd';
import VersionUpdate from 'img/icon/updata2.0.png';
import './style.scss';

export default class VersionUpdateModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { VersionUpdateModalVisible } = this.props;
		return (
			<Modal
				width={600}
				style={{ 'max-height': 770 }}
				className="yc-versionUpdate"
				closable={false}
				visible={VersionUpdateModalVisible}
				footer={null}
				// onCancel={this.handleCancel}
			>
				<div>
					<img src={VersionUpdate} alt="" />
					<div className="yc-modal-content">
						<div className="yc-modal-title">【版本更新通知】</div>
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								首页重磅升级！
							</p>
							<div className="yc-modal-list">
								新增数据动态提醒，债务人
								<span className="yc-modal-list-detail">重要线索更新不遗漏</span>
							</div>
							<div className="yc-modal-list">
								整合各类快速入口，常用功能、数据详情
								<span className="yc-modal-list-detail">一键直达</span>
							</div>
						</div>
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								信息监控入口改版，类目总览信息全面整合！
							</p>
							<div className="yc-modal-list">
								各类信息总体匹配情况
								<span className="yc-modal-list-detail">一目了然 </span>
								，浏览目标更精准
							</div>
						</div>
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								两类信息搜索功能入口合并
							</p>
							<div className="yc-modal-list">
								精简功能类目，减少功能理解和查找负担
							</div>
						</div>
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								机构统计指标优化与迁移（迁移至机构管理处）
							</p>
							<div className="yc-modal-list">
								增加阅读率和最近查阅时间指标，更真实地反馈下级数据使用情况
							</div>
						</div>
						<Button className="yc-modal-btn" onClick={this.handleCancel}>立即体验</Button>
					</div>
				</div>
			</Modal>
		);
	}
}
