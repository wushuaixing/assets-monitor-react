import React from 'react';
import { Button } from '@/common';
import ColumnarEcharts from '../../../common/columnarEcharts';
import RingEcharts from '../../../common/ringEcharts';
import { getAuction } from '@/utils/api/portrait-inquiry/personal/overview';
import { Spin } from '@/common';
import { getQueryByName } from '@/utils';

export default class AssetAuction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			all: {},
			threeMonth: {},
			selectType: '',
			columnarData: [],
			RingData: [],
			// colorArray: ['#45A1FF', '#4DCAC9', '#59C874', '#FCD44A', '#F2657A', '#965EE3'],
		};
		this.info = {
			obligorName: getQueryByName(window.location.href, 'name'),
			obligorNumber: getQueryByName(window.location.href, 'num'),
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const params = this.info;
		const { getAssetProfile } = this.props;
		this.setState({
			loading: true,
		});
		getAuction(params)
			.then((res) => {
				if (res.code === 200) {
					getAssetProfile(res.data.auctionInfos[0].count, 'AssetAuction', false);
					this.setState({
						columnarData: res.data.auctionInfos[1].count > 0 ? res.data.auctionInfos[1].roleDistributions : res.data.auctionInfos[0].roleDistributions,
						RingData: res.data.auctionInfos[1].count > 0 ? res.data.auctionInfos[1].auctionResults : res.data.auctionInfos[0].auctionResults,
						all: res.data.auctionInfos[0],
						threeMonth: res.data.auctionInfos[1],
						selectType: res.data.auctionInfos[1].count > 0 ? 'threeMonth' : 'all',
						loading: false,
					});
				} else {
					this.setState({ loading: false });
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	}

	checkTime = (selectType) => {
		const { all, threeMonth } = this.state;
		if (selectType === 'threeMonth') {
			this.setState({
				selectType,
				columnarData: threeMonth.roleDistributions,
				RingData: threeMonth.auctionResults,
			});
		} else if (selectType === 'all') {
			this.setState({
				selectType,
				columnarData: all.roleDistributions,
				RingData: all.auctionResults,
			});
		}
	};

	render() {
		const {
			columnarData, RingData, selectType, loading, all, threeMonth,
		} = this.state;
		return (
			<div>
				{
					all.count > 0 && (
					<Spin visible={loading}>
						<div className="overview-container-title">
							<div className="overview-left-item" />
							<span className="container-title-num">12条</span>
							<span className="container-title-name">相关资产拍卖</span>
						</div>
						<div className="overview-container-content">
							<div style={{ marginBottom: 20 }}>
								<Button disabled={threeMonth && threeMonth.count === 0} type={selectType === 'threeMonth' ? 'warning' : 'select'} style={{ marginRight: 10 }} onClick={() => this.checkTime('threeMonth')}>三个月内 8</Button>
								<Button disabled={all && all.count === 0} type={selectType === 'all' ? 'warning' : 'select'} onClick={() => this.checkTime('all')}>全部 12</Button>
							</div>
							<ColumnarEcharts title="角色分布" Data={columnarData} id="assetAuction" />
							<RingEcharts title="拍卖结果分布" Data={RingData} id="assetAuction" />
						</div>
					</Spin>
					)
				}
			</div>
		);
	}
}
