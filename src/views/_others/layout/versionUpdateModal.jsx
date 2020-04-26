import React from 'react';
import { Modal, Button } from 'antd';
import VersionUpdate from 'img/icon/updata1.5.2.png';
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
						<div className="yc-modal-header">债务人详情/业务详情全面升级！</div>
						<div className="yc-modal-header-dec">以单个债务人/单笔业务为主线，智能整合全维度匹配数据</div>
						<div className="yc-modal-title">【更新内容】</div>
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								债务人/业务画像自动生成
							</p>
							<span className="yc-label-text">
								相关资产抓手及风险参考情况一目了然！
							</span>
						</div>
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								数据分类导航
							</p>
							<span className="yc-label-text">
								快速定位关键信息详情！
							</span>
						</div>
						<div>
							<p className="yc-label-title">
								<span className="yc-modal-icon" />
								债务人/业务画像报告一键导出
							</p>
							<span className="yc-label-text">
								便捷支持信息集成、传递与交流！
							</span>
						</div>
						<Button type="primary" className="yc-modal-btn" onClick={this.handleCancel}>我知道了</Button>
					</div>
				</div>
			</Modal>
		);
	}
}
