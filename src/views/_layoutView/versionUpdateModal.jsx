import React from 'react';
import { Modal, Button } from 'antd';
import VersionUpdate from '../../assets/img/icon/versionUpdate.png';
import './style.scss';

export default class VersionUpdateModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { VersionUpdateModalVisible } = this.props;
		return (
			<Modal
				width={520}
				style={{ 'max-height': 770 }}
				className="yc-versionUpdate"
				closable={false}
				visible={VersionUpdateModalVisible}
				footer={null}
				// onCancel={this.handleCancel}
			>
				<img src={VersionUpdate} alt="" />
				<div className="yc-modal-content">
					<div className="yc-modal-title">更新内容</div>
					<div>
						<p className="yc-label-title">监控信息模块</p>
						<ul>
							<li className="yc-label-text">
								<span className="yc-modal-icon" />
								原监控信息重新分类，拆分为资产挖掘、风险监控两大模块。
							</li>
							<li className="yc-label-text">
								<span className="yc-modal-icon" />
									涉诉监控、代位权监控全新改版，解决信息展示、统计冗余问题。
							</li>
							<li className="yc-label-text">
								<span className="yc-modal-icon" />
									新增土地信息、股权质押、动产抵押、裁判文书、经营异常、严重违法、工商变更、行政处罚等维度数据监控。
							</li>
						</ul>
					</div>
					<div>
						<p className="yc-label-title">信息搜索模块</p>
						<ul>
							<li className="yc-label-text">
								<span className="yc-modal-icon" />
									新增破产信息搜索功能。
							</li>
						</ul>
					</div>
					<div>
						<p className="yc-label-title">画像查询模块</p>
						<ul>
							<li className="yc-label-text">
								<span className="yc-modal-icon" />
									新增债务人画像查询功能，支持债务人全维度画像的临时查询。
							</li>
						</ul>
					</div>
					<div>
						<p className="yc-label-title">交互体验优化</p>
						<ul>
							<li className="yc-label-text">
								<span className="yc-modal-icon" />
								批量管理功能优化，支持翻页管理。
							</li>
						</ul>
					</div>
					<Button type="primary" className="yc-modal-btn" onClick={this.handleCancel}>我知道了</Button>
				</div>
			</Modal>
		);
	}
}
