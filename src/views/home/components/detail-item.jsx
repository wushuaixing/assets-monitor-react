import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import { Icon } from '@/common';
import EmissionModal from './dynamic-modal/emission-modal';
import './style.scss';

const tag = (value) => {
	switch (value) {
	case 1: return '资产拍卖';
	case 2: return '土地出让';
	case 3: return '土地抵押';
	case 4: return '采矿权发证';
	case 5: return '排污权发证';
	case 6: return '商标专利';
	case 7: return '建筑建造资质';
	case 8: return '动产抵押';
	case 9: return '股权质押';
	case 10: return '代位权(立案)';
	case 11: return '代位权(文书)';
	case 12: return '失信（列入）';
	case 13: return '失信（移除）';
	case 14: return '涉诉（立案）';
	case 15: return '涉诉（文书）';
	case 16: return '经营异常';
	case 17: return '税收违法';
	default: return '-';
	}
};

const icon = (value) => {
	switch (value) {
	case 1: return 'auction-2';
	case 2: return 'land-transfer';
	case 3: return 'land-mortgage';
	case 4: return 'intangible-mining';
	case 5: return 'intangible-dump';
	case 6: return 'intangible-trademark';
	case 7: return 'intangible-build';
	case 8: return 'chattel-2';
	case 9: return 'stock-2';
	case 10: return 'subrogation-2';
	case 11: return 'subrogation-2';
	case 12: return 'broken-add';
	case 13: return 'broken-remove';
	case 14: return 'lawsuit-trial';
	case 15: return 'lawsuit-judgment';
	case 16: return 'abnormal';
	case 17: return 'tax';
	default: return '-';
	}
};

const modalMap = new Map([
	[1, ['assetModalVisible', 'assetModalVisible']],
	[2, ['代位权', 2]],
	[3, ['土地信息', 3]],
	[4, ['股权质押', 4]],
	[5, ['动产抵押', 5]],
	[6, ['招投标', 6]],
	[7, ['无形资产', 7]],
	['default', ['资产拍卖', 1]],
]);

class DetailItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			emissionModalVisible: false,
			data: props.data || [],
		};
	}

	componentWillReceiveProps(nextProps) {
		const { data } = this.props;
		if (data !== nextProps.data) {
			this.setState(() => ({
				data: nextProps.data,
			}));
		}
	}

	handleClick = (item) => {
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

	handleNavigate = () => {
		navigate('/info/monitor');
	};


	render() {
		const {
			emissionModalVisible, data,
		} = this.state;
		// const { data } = this.props;
		const isData = Array.isArray(data) && data.length > 0;
		return (
			<div className="detail-container">
				{/* <Button type="primary" onClick={this.startScrollUp}>向上滚动</Button> */}
				{/* <Button type="primary" onClick={this.startScrollDown}>向下滚动</Button> */}
				{/* <Button type="danger" onClick={this.endScroll}>停止滚动</Button> */}
				{
					isData ? data.map(item => (
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
									<div className={`detail-container-content-right-item-tag ${(item.type === 12 || item.type === 13) ? 'red' : 'yellow'}`}>
										<Icon type={`icon-${icon(item.type)}`} className="detail-container-content-right-item-tag-icon" />
										{tag(item.type)}
									</div>
								</div>
							</div>
						</div>
					)) : (
						<div className="detail-container-noData">
							<div className="detail-container-noData-img" />
							<span className="detail-container-noData-text">暂无重要数据提醒</span>
							<div>
								<Button onClick={this.handleNavigate} type="primary" style={{ width: 180, height: 34, marginTop: '40px' }}>查看全部匹配信息概览</Button>
							</div>
						</div>
					)
				}
				{/** 排污权Modal */}
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
