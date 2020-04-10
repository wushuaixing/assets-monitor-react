import React from 'react';
import { Pagination } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import { Ellipsis, Spin, Table } from '@/common';
import { w } from '@/utils';

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

	toShowExtraField=(row = {}) => {
		const { portrait } = this.props;
		return portrait === 'business' && (
			<li>
				<span className="list list-title align-justify">土地使用权人</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					<Ellipsis
						content={row.obligorName}
						url={row.obligorId ? `#/business/debtor/detail?id=${row.obligorId}` : ''}
						tooltip
						width={500}
					/>
				</span>
				{/* <span className="list-split" style={{ height: 16 }} /> */}
			</li>
		);
	};

	toGetColumns=() => [
		{
			title: '信息',
			dataIndex: 'projectName',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
						<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>
							<Ellipsis content={row.projectName} url={row.url} tooltip width={300} />
						</span>
						{ row.landUse && <span className="yc-case-reason text-ellipsis">{row.landUse}</span>}
					</li>
					<li>
						<span className="list">
							<span>
								{row.administrativeRegion || '-'}
							</span>
							<span style={{ marginLeft: 20 }}>{row.landAddress || '-'}</span>
						</span>
					</li>
					{this.toShowExtraField(row)}
					<li>
						<span className="list list-title align-justify">签订日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.singedTime || '-'}</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title align-justify">面积</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{w(row.landArea, { unix: '公顷' })}</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title align-justify">使用年限</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{w(row.transferTerm, { unix: '年' })}</span>
					</li>
				</div>
			),
		}, {
			title: '关联信息',
			width: 360,
			render: (value, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-content">
							<span className="yc-purchasePrice-icon" />
							{w(row.finalPrice, { unix: '万元', suffix: '成交价格：' })}
						</span>
					</li>
					<li>
						<span className="list list-title align-justify">批准单位</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.approver || '-'}</span>
					</li>
					<li>
						<span className="list list-title align-justify">供地方式</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.supplyWay || '-'}</span>
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
		const { portrait } = this.props;
		const { api, params } = getDynamicAsset(portrait, {
			b: 10301,
			e: 'result',
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
								pageSize={5}
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
