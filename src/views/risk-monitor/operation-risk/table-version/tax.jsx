import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import {
	Ellipsis, Icon, Spin, Table,
} from '@/common';
import { toEmpty } from '@/utils';


const toGetIdentityType = (value) => {
	/* 1：违法人 2：法人 3：财务 */
	if (value === 1) return '作为违法人';
	if (value === 2) return '作为法人';
	if (value === 3) return '作为财务';
	return '';
};
export default class TableIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	toGetColumns=() => {
		const { portrait } = this.props;
		return ([
			{
				title: '主要信息',
				dataIndex: 'property',
				render: (value, row) => {
					const { caseNature: ca, illegalFacts: ill, punish } = row;
					return (
						<div className="assets-info-content">
							<li className="yc-public-normal-bold" style={{ marginBottom: 2 }}>
								{ toEmpty(ca || value)
									? <Ellipsis content={ca || value} tooltip url={row.url} width={600} font={15} /> : '--' }
								{ toGetIdentityType(row.identityType) && portrait === 'personal'
									? <span className="yc-case-reason text-ellipsis">{toGetIdentityType(row.identityType)}</span> : ''}
							</li>
							<li>
								<span className="list list-title align-justify">违法事实</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">
									{ toEmpty(ill) ? <Ellipsis content={ill} width={600} tooltip /> : '--' }
								</span>
							</li>
							<li>
								<span className="list list-title align-justify">处罚情况</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">
									{ toEmpty(punish) ? <Ellipsis content={punish} width={600} tooltip /> : '--' }
								</span>
							</li>
						</div>
					);
				},
			}, {
				title: '辅助信息',
				width: 300,
				render: (value, row) => (
					<div className="assets-info-content">
						{
							portrait === 'personal' ? (
								<li style={{ height: 24 }}>
									<Icon type="icon-dot" style={{ fontSize: 12, color: '#3DBD7D', marginRight: 5 }} />
									{/* eslint-disable-next-line no-irregular-whitespace */}
									<Ellipsis content={`纳税人　${row.offender || '--'}`} tooltip width={240} />
								</li>
							) : <li style={{ height: 24 }} />
						}
						<li>
							<span className="list list-title align-justify">发布日期</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{row.gmtPublish || '--'}</span>
						</li>
					</div>
				),
			},
		]);
	};

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		const { portrait } = this.props;
		const { api, params } = getDynamicRisk(portrait, {
			b: 30501,
			e: 'tax',
			p: 'personalTax',
		});
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
			...params,
		}).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { dataSource, current, total } = this.state;
		const { loading } = this.state;

		return (
			<div className="yc-assets-auction">
				<Spin visible={loading}>
					<Table
						rowClassName={() => 'yc-assets-auction-table-row'}
						columns={this.toGetColumns()}
						dataSource={dataSource}
						showHeader={false}
						pagination={false}
					/>
					{dataSource && dataSource.length > 0 && (
						<div className="yc-table-pagination">
							<Pagination
								showQuickJumper
								current={current || 1}
								total={total || 0}
								pageSize={5}
								onChange={this.onPageChange}
								showTotal={totalCount => `共 ${totalCount} 条信息`}
							/>
						</div>
					)}
				</Spin>
			</div>
		);
	}
}
