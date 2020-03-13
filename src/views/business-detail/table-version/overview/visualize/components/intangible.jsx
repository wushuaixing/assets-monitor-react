import React from 'react';
import { overviewIntangible } from 'api/detail/overview';
import ColumnarEcharts from '@/views/portrait-inquiry/common/columnarEcharts';
import getCount from '@/views/portrait-inquiry/common/getCount';
import { Spin } from '@/common';

export default class BusinessRisk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			columnarData: [],
			columnarNum: null,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { obligorId, getAssetProfile } = this.props;
		this.setState({
			loading: true,
		});
		const params = {
			obligorId,
			type: 2,
		};
		overviewIntangible(params).then((res) => {
			if (res.code === 200) {
				const columnarData = [];
				columnarData.push({ count: res.data.construct, typeName: '建筑建造资质' });
				columnarData.push({ count: res.data.emission, typeName: '排污权' });
				columnarData.push({ count: res.data.mining, typeName: '矿业权' });
				columnarData.push({ count: res.data.trademark, typeName: '商标专利' });

				const columnarNum = getCount(columnarData);
				getAssetProfile(columnarNum, 'Intangible');
				this.setState({
					columnarNum,
					columnarData,
					loading: false,
				});
			} else {
				this.setState({ loading: false });
			}
		})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	render() {
		const { columnarData, loading, columnarNum } = this.state;

		return (
			<div>
				{
					columnarNum > 0 ? (
						<Spin visible={loading}>
							<div>
								<div className="overview-container-title">
									<div className="overview-left-item" />
									<span className="container-title-num">
										{`${getCount(columnarData)} 条`}
									</span>
									<span className="container-title-name">无形资产信息</span>
								</div>
								<div style={{ marginLeft: '-12px' }}>
									<ColumnarEcharts title="" Data={columnarData} id="intangible" />
								</div>
							</div>
						</Spin>
					) : null
				}
			</div>
		);
	}
}
