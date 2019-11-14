import React from 'react';
import { Pagination } from 'antd';
import { Ellipsis, Spin, Table } from '@/common';
import manage from '@/utils/api/portrait-inquiry/enterprise/manage';
import { getQueryByName, toEmpty } from '@/utils';

const api = manage.tax;

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

	toGetColumns=() => [
		{
			title: '主要信息',
			dataIndex: 'property',
			render: (value, row) => {
				const { caseNature: ca, illegalFact: ill, punish } = row;
				return (
					<div className="assets-info-content">
						<li className="yc-public-normal-bold" style={{ marginBottom: 2 }}>
							{ toEmpty(ca || value) ? <Ellipsis content={ca || value} width={600} font={15} /> : '--' }
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
					<li style={{ height: 24 }} />
					<li>
						<span className="list list-title align-justify">检查机关</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.court || '-'}</span>
					</li>
					<li>
						<span className="list list-title align-justify">发布日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.publishTime || '--'}</span>
					</li>
				</div>
			),
		},
	];

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		const companyId = getQueryByName(window.location.href, 'id');
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
			companyId,
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
