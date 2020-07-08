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
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								分类搜索增加：土地信息、股权质押、动产抵押、失信记录
							</p>
							<div className="yc-modal-list">
								资产评估、风险识别新抓手
							</div>
						</div>
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								顶部导航栏 - 信息监控增加三级导航
							</p>
							<div className="yc-modal-list">
								信息切换更健康
							</div>
						</div>
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								业务视图 / 债务人视图展示资产、风险线索数
							</p>
							<div className="yc-modal-list">
								资产 / 风险情况一目了然
							</div>
						</div>
						<Button className="yc-modal-btn" onClick={this.handleCancel}>我知道了</Button>
					</div>
				</div>
			</Modal>
		);
	}
}
