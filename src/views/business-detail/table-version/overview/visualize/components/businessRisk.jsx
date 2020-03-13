import React from 'react';
import { overviewRisk } from 'api/detail/overview';
import ColumnarEcharts from '@/views/portrait-inquiry/common/columnarEcharts';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
import NoContent from '@/common/noContent';

export default class BusinessRisk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			columnarData: [],
			columnarNum: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { obligorId } = this.props;
		this.setState({
			loading: true,
		});
		const params = {
			obligorId,
			type: 2,
		};
		overviewRisk(params).then((res) => {
			if (res.code === 200) {
				console.log(res);
				const columnarData = [];
				columnarData.push({ count: res.data.abnormal, typeName: '经营异常' });
				columnarData.push({ count: res.data.tax, typeName: '税收违法' });
				columnarData.push({ count: res.data.punishment, typeName: '行政处罚' });
				columnarData.push({ count: res.data.change, typeName: '工商变更' });
				columnarData.push({ count: res.data.illegal, typeName: '严重违法' });
				columnarData.push({ count: res.data.epb, typeName: '环保处罚' });
				// const columnarData = res.data.businessRiskInfos;
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
		console.log(columnarData, columnarData && getCount(columnarData) === 0);
		return (
			<div>
				<Spin visible={loading}>
					{columnarData && getCount(columnarData) === 0 ? (
						<div>
							{loading ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到经营风险信息" />}
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
