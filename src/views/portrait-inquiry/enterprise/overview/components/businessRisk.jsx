import React from 'react';
import ColumnarEcharts from '../../../common/columnarEcharts';
import { getRisk } from '@/utils/api/portrait-inquiry/enterprise/overview';
import { Spin } from '@/common';
import getCount from '../../../common/getCount';
import NoContent from '@/common/noContent';

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
					const columnarData = res.data.businessRiskInfos;
					const columnarNum = getCount(columnarData);
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
				<Spin visible={loading}>
					{columnarData && getCount(columnarData) === 0 ? (
						<div>
							{loading ? '' : <NoContent style={{ paddingBottom: 40 }} font="暂未匹配到经营风险信息" />}
						</div>
					) : (
						<div>
							{
								columnarNum > 0 && (
								<div>
									<div className="overview-container-title">
										<div className="overview-left-item" />
										<span className="container-title-num">
											{`${getCount(columnarData)} 条`}
										</span>
										<span className="container-title-name">经营风险信息</span>
									</div>
									<div className="overview-container-content">
										<ColumnarEcharts title="" Data={columnarData} id="BusinessRisk" />
									</div>
								</div>
								)
							}
						</div>
					)}
				</Spin>

			</div>
		);
	}
}
