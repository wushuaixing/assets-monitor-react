import React from 'react';
import { Modal, Button } from 'antd';
import Visionpdate from 'img/icon/update2.2.png';
import closeUpdate from 'img/icon/closeUpdate.png';
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
				width={540}
				style={{ 'max-height': 770 }}
				className="yc-versionUpdate"
				closable={false}
				visible={VersionUpdateModalVisible}
				footer={null}
				// onCancel={this.handleCancel}
			>
				<div className="yc-title-box">
					<img className="yc-close" src={closeUpdate} alt="" onClick={this.handleCancel} />
					<img className="yc-title-img" src={Visionpdate} alt="" />
				</div>
				<div className="yc-modal-box">
					<div className="yc-modal-content">
						<div className="yc-modal-title">【版本更新通知】</div>
						<div className="yc-label-box">
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								<span className="yc-label-tips">新增监控日报</span>
								<span className="yc-label-desp">每日新增线索一手方案</span>
							</p>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								<span className="yc-label-tips">新增验证码登录</span>
								<span className="yc-label-desp">多种登录方式任你选</span>
							</p>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								<span className="yc-label-tips">分类搜索优化</span>
								<span className="yc-label-desp">拍卖搜索算法升级；支持拍卖标的物搜索</span>
							</p>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								<span className="yc-label-tips">画像优化</span>
								<span className="yc-label-desp">画像布局调整；新增无形资产、招投标</span>
							</p>
						</div>
						<Button className="yc-modal-btn" onClick={this.handleCancel}>我知道了</Button>
					</div>
				</div>
			</Modal>
		);
	}
}
