import React, { PureComponent } from 'react';
import { Icon } from '@/common';
import EmissionModal from './dynamic-modal/emission-modal';
import './style.scss';

const tag = (value) => {
	switch (value) {
	case 1: return '采矿权发证';
	case 2: return '排污权发证';
	case 3: return '资产拍卖';
	default: return '-';
	}
};

const icon = (value) => {
	switch (value) {
	case 1: return 'intangible-mining';
	case 2: return 'intangible-dump';
	case 3: return 'auction-2';
	default: return '-';
	}
};

class DetailItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			emissionModalVisible: false,
		};
	}

	handleClick = (item) => {
		console.log(item);
		if (item.type === 2) {
			this.setState(() => ({
				emissionModalVisible: true,
			}));
		}
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			emissionModalVisible: false,
		});
	};

	render() {
		const { emissionModalVisible } = this.state;
		const { data } = this.props;
		return (
			<div className="detail-container">
				{
					data.map(item => (
						<div className="detail-container-content" onClick={() => this.handleClick(item)}>
							<div className="detail-container-content-left">
								<div className="detail-container-content-left-icon">
										罗山矿业
								</div>
							</div>
							<div className="detail-container-content-right">
								<div className="detail-container-content-right-header">
									<div className="detail-container-content-right-header-name">
										{item.name}
									</div>
									<div className="detail-container-content-right-header-time">
										{item.time}
									</div>
								</div>
								<div className="detail-container-content-right-item">
									<div className="detail-container-content-right-item-detail">
										{item.content}
									</div>
									<div className="detail-container-content-right-item-tag">
										<Icon type={`icon-${icon(item.type)}`} className="detail-container-content-right-item-tag-icon" />
										{tag(item.type)}
									</div>
								</div>
							</div>
						</div>
					))
				}
				{/** 担保人Modal */}
				{emissionModalVisible && (
					<EmissionModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						emissionModalVisible={emissionModalVisible}
					/>
				)}
			</div>
		);
	}
}

export default DetailItem;
