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
							<div className="yc-label-title">
								<span className="yc-modal-icon" />
								<span className="yc-label-tips">金融资产增加招商项目信息</span>
							</div>
							<div className="yc-label-title">
								<span className="yc-modal-icon" />
								<span className="yc-label-tips">金融资产-公示项目增加AMC处置公告信息</span>
							</div>
							<div className="yc-label-title">
								<span className="yc-modal-icon" />
								<span className="yc-label-tips">画像pdf完善与交互优化</span>
							</div>
						</div>
						<Button className="yc-modal-btn" onClick={this.handleCancel}>我知道了</Button>
					</div>
				</div>
			</Modal>
		);
	}
}
