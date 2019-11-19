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
			all: {},
			threeMonth: {},
			selectType: '',
			columnarData: [],
			RingData: [],
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { companyId, getAssetProfile } = this.props;
		this.setState({
			loading: true,
		});
		const params = {
			companyId,
		};
		getAuction(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						columnarData: res.data.auctionInfos[1].count > 0 ? res.data.auctionInfos[1].roleDistributions : res.data.auctionInfos[0].roleDistributions,
						RingData: res.data.auctionInfos[1].count > 0 ? res.data.auctionInfos[1].auctionResults : res.data.auctionInfos[0].auctionResults,
						all: res.data.auctionInfos[0],
						threeMonth: res.data.auctionInfos[1],
						selectType: res.data.auctionInfos[1].count > 0 ? 'threeMonth' : 'all',
						loading: false,
					});
					getAssetProfile(res.data.auctionInfos[0].count, 'AssetAuction');
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
							<span className="container-title-num">
								{`${all.count} 条`}
							</span>
							<span className="container-title-name">相关资产拍卖</span>
						</div>
						<div className="overview-container-content">
							<div style={{ marginBottom: 20 }}>
								<Button disabled={threeMonth && threeMonth.count === 0} type={selectType === 'threeMonth' ? 'warning' : 'select'} style={{ marginRight: 10 }} onClick={() => this.checkTime('threeMonth')}>
									{`三个月内 ${threeMonth.count}`}
								</Button>
								<Button disabled={all && all.count === 0} type={selectType === 'all' ? 'warning' : 'select'} onClick={() => this.checkTime('all')}>
									{`全部 ${all.count}`}
								</Button>
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
