import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { Row, Col } from 'antd';
import { intangibleCard } from '@/utils/api/monitor-info/excavate/index';
import getCount from '@/views/portrait-inquiry/common/getCount';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Intangible extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			gmtUpdate: '',
			intangibleArray: [],
			totalCount: 0,
		};
	}

	componentDidMount() {
		this.getCardData();
	}

	// 获取消息列表
	getCardData = () => {
		this.setState({ loading: true });
		intangibleCard().then((res) => {
			if (res.code === 200) {
				const dataSource = [];
				dataSource.push({ count: res.data.emission || 0, typeName: '排污权发证' });
				dataSource.push({ count: res.data.trademark || 0, typeName: '商标专利' });
				dataSource.push({ count: res.data.mining || 0, typeName: '矿业权发证' });
				dataSource.push({ count: res.data.construct || 0, typeName: '建造资质' });
				const dataSourceNum = getCount(dataSource);
				this.setState({
					loading: false,
					intangibleArray: dataSource,
					totalCount: dataSourceNum,
					gmtUpdate: res.data.gmtUpdate,
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { url } = this.props;
		const {
			intangibleArray, totalCount, loading, gmtUpdate,
		} = this.state;
		return (
			<Card
				IconType="intangible"
				Loading={loading}
				onClick={() => navigate(url)}
				IconColor={{ color: '#FFC531' }}
				customStyle={hasCountStyle}
				text="无形资产"
				totalCount={totalCount}
				updateTime={gmtUpdate}
			>
				<Row gutter={24} className="risk-intangible-container">
					{
							intangibleArray.map((item, index) => (
								<div>
									{
										index > 2 ? (
											<Col className="gutter-row" span={12}>
												<div className="risk-intangible-container-card">
													{item.typeName}
													：
													<span className="risk-intangible-container-card-num">{item.count}</span>
													条
												</div>
											</Col>
										) : (
											<Col className="gutter-row" span={12}>
												<div className="risk-intangible-container-card">
													{item.typeName}
													：
													<span className="risk-intangible-container-card-num">{item.count}</span>
													条
												</div>
											</Col>
										)
									}
								</div>

							))
						}
				</Row>
			</Card>
		);
	}
}
