import React from 'react';
import { overviewLitigation } from 'api/detail/overview';
import { getQueryByName } from '@/utils';
import getCount from '@/views/portrait-inquiry/common/getCount';
import involvedImg from '@/assets/img/business/InvolvedCard.png';
import Card from '../card';
import './style.scss';

export default class Involved extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			dataSourceNum: 0,
			gmtCreate: '',
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const obligorId = getQueryByName(window.location.href, 'id') || 326793;
		const params = {
			obligorId,
			type: 1,
		};
		// 业务列表信息
		overviewLitigation(params).then((res) => {
			if (res.code === 200) {
				const dataSource = [];
				dataSource.push({ count: res.data.trial, typeName: '立案' });
				dataSource.push({ count: res.data.courtNotice, typeName: '开庭' });
				dataSource.push({ count: res.data.judgment, typeName: '裁判文书' });

				const dataSourceNum = getCount(dataSource);
				this.setState({
					dataSource,
					dataSourceNum,
					gmtCreate: res.data.gmtCreate,
				});
			}
		}).catch(() => { this.setState({ dataSource: [] }); });
	};

	render() {
		const { dataSource, dataSourceNum, gmtCreate } = this.state;
		const { portrait } = this.props;
		const isBusiness = portrait && portrait === 'business';
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		return (
			<span>
				{dataSourceNum > 0 ? (
					<Card
						imgCard={involvedImg}
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						customStyle={isBusiness ? { width: '366px', height: '165px', marginBottom: '20px' } : { width: '366px', height: '140px', marginBottom: '20px' }}
						text="涉诉信息"
						styleName="Involved-card"
					>
						<div className="card-content" style={isBusiness ? { height: '20px' } : {}}>
							<div className="card-content-role">
								{
									isBusiness
										? (
											<div>
												<span style={{ fontSize: '12px', color: '#4E5566', paddingRight: '5px' }}>涉诉风险债务人：</span>
												{`${dataSourceNum} 名`}
											</div>
										) : newDataSource && newDataSource.map(item => (
											<div className="card-content-role-itemLeft" key={item.type}>
												<span className="card-content-role-text">{item.typeName}</span>
												<span className="card-content-role-info">：</span>
												<span className="card-content-role-num">
													{item.count}
												笔
												</span>
											</div>
										))
								}
							</div>
						</div>
					</Card>
				) : null}
			</span>
		);
	}
}
