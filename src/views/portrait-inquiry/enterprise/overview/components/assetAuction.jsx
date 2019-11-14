import React from 'react';
import { Button } from '@/common';
import { getAuction } from '@/utils/api/portrait-inquiry/enterprise/overview';
import ColumnarEcharts from '../../../common/columnarEcharts';
import RingEcharts from '../../../common/ringEcharts';
import { Spin } from '@/common';

export default class AssetAuction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			selectType: 'threeMonth',
			columnarData: [
				{ value: 8, name: '资产所有人' },
				{ value: 12, name: '债权人' },
				{ value: 9, name: '竞买人' },
				{ value: 9, name: '资产线索' },
			],
			RingData: [
				{ value: 20, name: '已成交' },
				{ value: 14, name: '正在进行' },
				{ value: 10, name: '即将开始' },
				{ value: 5, name: '已流拍' },
			],
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { companyId } = this.props;
		this.setState({
			loading: true,
		});
		const params = {
			companyId,
		};
		getAuction(params)
			.then((res) => {
				if (res.code === 200) {
					console.log(res);
					this.setState({ loading: false });
				} else {
					this.setState({ loading: false });
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	}

	checkTime = (selectType) => {
		if (selectType === 'threeMonth') {
			this.setState({
				selectType,
				columnarData: [
					{ value: 1, name: '资产洒大地洒大地所有人' },
					{ value: 12, name: '债权人' },
					{ value: 9, name: '竞买人' },
					{ value: 9, name: '资产线索' },
				],
				RingData: [
					{ value: 20, name: '已成交' },
					{ value: 14, name: '正在进行' },
					{ value: 10, name: '即将开始' },
				],
			});
		} else if (selectType === 'all') {
			this.setState({
				selectType,
				columnarData: [
					{ value: 18, name: '资产所有人' },
					{ value: 12, name: '债权人' },
					{ value: 10, name: '竞买人' },
					{ value: 9, name: '资产线索' },
					{ value: 19, name: '股权分布' },
				],
				RingData: [
					{ value: 20, name: '已成交' },
					{ value: 14, name: '正在进行' },
				],
			});
		}
	};

	render() {
		const {
			columnarData, RingData, selectType, loading,
		} = this.state;
		return (
			<div>
				<Spin visible={loading}>
					<div className="overview-container-title">
						<div className="overview-left-item" />
						<span className="container-title-num">12条</span>
						<span className="container-title-name">相关资产拍卖</span>
					</div>
					<div className="overview-container-content">
						<div style={{ marginBottom: 20 }}>
							<Button type={selectType === 'threeMonth' ? 'warning' : 'select'} style={{ marginRight: 10 }} onClick={() => this.checkTime('threeMonth')}>三个月内 8</Button>
							<Button type={selectType === 'all' ? 'warning' : 'select'} onClick={() => this.checkTime('all')}>全部 12</Button>
						</div>
						<ColumnarEcharts title="角色分布" Data={columnarData} id="assetAuction" />
						<RingEcharts title="拍卖结果分布" Data={RingData} id="assetAuction" />
					</div>
				</Spin>
			</div>
		);
	}
}
