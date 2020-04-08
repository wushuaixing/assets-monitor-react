import React from 'react';
import { Modal, Button } from 'antd';
import VersionUpdate from '../../assets/img/icon/versionUpdate.png';
import WeChatUpdate from '../../assets/img/icon/wechatUpdate.png';
import QRCode from '../../assets/img/icon/QRCode.png';
import './style.scss';

export default class VersionUpdateModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isWeChat: false,
		};
	}

	componentDidMount() {}

	handleNext = () => {
		this.setState(() => ({
			isWeChat: true,
		}));
	};

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { VersionUpdateModalVisible } = this.props;
		const { isWeChat } = this.state;
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
				{!isWeChat ? (
					<div>
						<img src={VersionUpdate} alt="" />
						<div className="yc-modal-content">
							<div className="yc-modal-title">【版本更新通知】</div>
							<div>
								<p className="yc-label-title">
									<span className="yc-modal-icon" />
								上新四类无形资产：排污权、矿业权、商标专利、建筑建造资质
								</p>
								<ul>
									<li className="yc-label-text">
									新的财产抓手，可查封处置且存在巨大价值!
									</li>
								</ul>
							</div>
							<div>
								<p className="yc-label-title">
									<span className="yc-modal-icon" />
								同一资产的多轮拍卖数据合并，并增加“拍卖轮次新增”提醒标签
								</p>
								<ul>
									<li className="yc-label-text">
									跟进记录一串到底，再也不用同一资产重复跟进.
									</li>
								</ul>
							</div>
							<div>
								<p className="yc-label-title">
									<span className="yc-modal-icon" />
								新增跟进中（或已收藏）数据“拍卖状态变更”提醒标签及相应的短信提醒
								</p>
								<ul>
									<li className="yc-label-text">
									成交、流拍早知道.
									</li>
								</ul>
							</div>
							<div>
								<p className="yc-label-title">
									<span className="yc-modal-icon" />
								上线失信记录匹配列表
								</p>
								<ul>
									<li className="yc-label-text">
									失信详情全知道.
									</li>
								</ul>
							</div>
							<Button type="primary" className="yc-modal-btn" onClick={this.handleNext}>继续探索</Button>
						</div>
					</div>
				) : (
					<div>
						<img src={WeChatUpdate} alt="" />
						<div className="yc-modal-weChat-content">
							<div className="yc-modal-weChat-title">拒绝内网限制，随时随地移动办公！</div>
							<div className="yc-modal-weChat-img-title">扫描下方二维码开启全新体验</div>
							<img src={QRCode} alt="" />
							<Button type="primary" className="yc-modal-btn" onClick={this.handleCancel}>我知道了</Button>
						</div>
					</div>
				)}

			</Modal>
		);
	}
}
