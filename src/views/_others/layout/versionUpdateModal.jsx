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
				title: '短信/日报取值优化',
				content: '展示更“新鲜”的数据',
			},
			{
				title: '失信、限高逻辑优化',
				content: '提供更“准确”的数据',
			},
			{
				title: '资产拍卖、pdf报告展示优化',
				content: '机构管理布局调整，提供更“友好”的体验',
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
