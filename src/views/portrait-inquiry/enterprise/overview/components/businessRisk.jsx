import React from 'react';
import ColumnarEcharts from '../../../common/columnarEcharts';
import { getRisk } from '@/utils/api/portrait-inquiry/enterprise/overview';
import { Spin } from '@/common';
import getCount from '../../../common/getCount';

export default class BusinessRisk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			columnarData: [],
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
		getRisk(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						columnarData: res.data.businessRiskInfos,
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

	render() {
		const { columnarData, loading } = this.state;
		return (
			<div>
				{getCount(columnarData) > 0 && (
				<Spin visible={loading}>
					<div className="overview-container-title">
						<div className="overview-left-item" />
						<span className="container-title-num">
							{`${getCount(columnarData)} 条`}
						</span>
						<span className="container-title-name">经营风险信息</span>
					</div>
					<div className="overview-container-content">
						<ColumnarEcharts title="案由分布" Data={columnarData} id="BusinessRisk" />
					</div>
				</Spin>
				)}
			</div>
		);
	}
}
