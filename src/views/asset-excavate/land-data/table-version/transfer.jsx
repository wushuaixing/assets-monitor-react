import React from 'react';
import { Pagination, Tooltip } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import { Spin, Table } from '@/common';
import { w, timeStandard } from '@/utils';
import { PartyCrosswise } from '@/views/_common';

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
			title: '信息',
			dataIndex: 'projectName',
			render: (text, row) => (
				<React.Fragment>
					<div className="assets-info-content">
						<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
							<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>
								{
									row.landAddress && row.landAddress.length > 20
										? (
											<Tooltip placement="topLeft" title={row.landAddress}>
												<a href={row.url.length > 1 && row.url} target="_blank" rel="noopener noreferrer" className={row.url.length > 1 ? 'yc-table-text-link' : ''}>
													{`${row.landAddress.substr(0, 20)}...`}
												</a>
											</Tooltip>
										)
										: (
											<a href={row.url.length > 1 && row.url} target="_blank" rel="noopener noreferrer" className={row.url.length > 1 ? 'yc-table-text-link' : ''}>
												{row.landAddress || '-'}
											</a>
										)
								}
							</span>
							{ row.landUse ? <span className="yc-case-reason text-ellipsis">{row.landUse || '-'}</span> : ''}
						</li>
						<li>
							<span className="list">
								<span>
									{row.administrativeRegion || '-'}
								</span>
							</span>
						</li>
						<PartyCrosswise value={row.parties} land row={row} name="土地转让" type="transfer" />
						<div className="yc-table-content">
							<span className="list list-title align-justify">成交日期</span>
							<span className="list list-title-colon">：</span>
							<span className="list list-content">{timeStandard(row.dealingTime)}</span>
							<div className="yc-table-line" />
							<span className="list list-title align-justify">面积</span>
							<span className="list list-title-colon">：</span>
							<span className="list list-content">
								{w(row.landArea, { suffix: '公顷' })}
							</span>
							<div className="yc-table-line" />
							<span className="list list-title align-justify">使用年限</span>
							<span className="list list-title-colon">：</span>
							<span className="list list-content">
								{w(row.landUsageTerm, { suffix: '年' })}
							</span>
						</div>

					</div>
				</React.Fragment>
			),
		}, {
			title: '关联信息',
			width: 360,
			render: (text, row) => (
				<React.Fragment>
					<div className="assets-info-content">
						<li>
							<span className="list list-content">
								<span className="yc-purchasePrice-icon" />
								{w(row.transferPrice, { prefix: '转让价格：', suffix: '万元' })}
							</span>
						</li>
						<li>
							<span className="list list-title align-justify">转让方式</span>
							<span className="list list-title-colon">：</span>
							<span className="list list-content">{row.transferMode || '-'}</span>
						</li>
					</div>
				</React.Fragment>
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
			b: 10302,
			e: 'transfer',
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
