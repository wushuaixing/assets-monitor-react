import React from 'react';
import { Modal, Button } from 'antd';
import version from 'img/icon/update2.8.png';
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
		const tips = ['优化首页展示内容', '对于不公开的裁判文书，展示其不公开理由', '完善多类数据的展示和跳转逻辑', '交互优化和bug修复'];
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
					<img className="yc-title-img" src={version} alt="" />
					<span onClick={this.handleCancel}>点击关闭</span>
				</div>
				<div className="yc-modal-box">
					<div className="yc-modal-content">
						<div className="yc-modal-title">【版本更新通知】</div>
						<div className="yc-label-box">
							{
							    tips.map(i => (
								  <div className="yc-label-title">
									<div key={i}>
										<span className="yc-modal-icon" />
										<span className="yc-label-tips">{i}</span>
									</div>
								  </div>
							    ))
							  }
						</div>
						<Button className="yc-modal-btn" onClick={this.handleCancel}>我知道了</Button>
					</div>
				</div>
			</Modal>
		);
	}
}
