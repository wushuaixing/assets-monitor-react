import React from 'react';
import { Pagination } from 'antd';
import { Ellipsis, Spin, Table } from '@/common';
import manage from '@/utils/api/portrait-inquiry/enterprise/manage';
import { toEmpty } from '@/utils';

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
			dataIndex: 'caseNature',
			render: (value, row) => {
				const { caseNature: ca, illegalFact: ill, punish } = row;
				console.log(ca, ill, punish);
				return (
					<div className="assets-info-content">
						<li style={{ fontSize: 14 }}>
							{ toEmpty(ca) ? <Ellipsis content={ca} width={600} /> : '--' }
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
					<li><br /></li>
					<li>
						<span className="list list-title align-justify">受理法院</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.court || '-'}</span>
					</li>
					<li>
						<span className="list list-title align-justify">移除日期</span>
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
		this.setState({ loading: true });
		api.list({
			page: page || 1,
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
