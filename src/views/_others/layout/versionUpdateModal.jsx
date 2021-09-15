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
				title: '代位权下新增破产代位', content: '有清收成功案例的高价值线索',
			},
			{
				title: '破产重组信息整合，涵盖破产文书', content: '全面了解债务人作为被申请人的破产信息',
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
