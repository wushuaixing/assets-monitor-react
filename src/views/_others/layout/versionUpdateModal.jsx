import React from 'react';
import { Modal, Button } from 'antd';
import version from 'img/icon/update2.8.png';
import fork from 'img/icon/fork.png';
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
		const tips = [
			{
				title: '资产挖掘增加电子报信息',
				content: '拓展数据广度',
			},
			{
				title: '金融资产取值逻辑优化',
				content: '避免重复推送',
			},
			{
				title: '部分页面内容与交互优化',
				content: '提升产品易用性',
			},
		];
		return (
			<Modal
				width={420}
				style={{ 'max-height': 770 }}
				className="yc-versionUpdate"
				closable={false}
				visible={VersionUpdateModalVisible}
				footer={null}
				// onCancel={this.handleCancel}
			>
				<div className="yc-title-box">
					<img className="yc-title-img" src={version} alt="" />
					<span onClick={this.handleCancel} className="yc-title-fork">
						<img src={fork} alt="" />
					</span>
				</div>
				<div className="yc-modal-box">
					<div className="yc-modal-content">
						<div className="yc-modal-title">【更新日志】</div>
						<div className="yc-label-box">
							{
							    tips.map(i => (
								  <div className="yc-label-title">
									<div key={i}>
										<span className="yc-modal-icon" />
										<span className="yc-label-tips">{i.title}</span>
										<p className="yc-label-hint">{i.content}</p>
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
