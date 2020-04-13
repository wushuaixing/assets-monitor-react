import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import { Ellipsis, Spin, Table } from '@/common';
import { toEmpty } from '@/utils';

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

	shouldComponentUpdate(nextProps) {
		if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
			this.toGetData(1, nextProps);
		}
		return true;
	}

	toGetColumns=() => [
		{
			title: '信息',
			dataIndex: 'pledgeeList',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-title-normal-bold" style={{ lineHeight: '20px' }}>
						{ toEmpty(row.caseCode)
							? <Ellipsis content={row.caseCode} url={row.url} tooltip width={600} font={15} /> : '-' }
					</li>
					<li>
						<span className="list list-title align-justify">失信被执行人行为具体情形</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 300 }}>
							{ toEmpty(row.fact) ? <Ellipsis content={row.fact} tooltip width={300} /> : '-'}
						</span>
					</li>
					<li>
						<span className="list list-title align-justify">生效法律文书确定义务</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 300 }}>
							{ toEmpty(row.duty) ? <Ellipsis content={row.duty} tooltip width={300} /> : '-'}
						</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title align-justify">被执行人的履行情况</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content none-width">{row.performance}</span>
					</li>
				</div>
			),
		},
		{
			title: '关联信息',
			width: 360,
			render: (value, row) => (
				<div className="assets-info-content">
					<li style={{ height: '20px' }} />
					<li>
						<span className="list list-title align-justify">执行法院</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.court || '-'}</span>
					</li>
					<li>
						<span className="list list-title align-justify">发布日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.publishDate || '-'}</span>
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
	toGetData=(page, nextProps = {}) => {
		const { sourceType } = nextProps;
		const { sourceType: type, portrait } = this.props;
		const _sourceType = sourceType || type;
		const { api, params } = getDynamicRisk(portrait, {
			b: _sourceType,
		});
		console.log(params);
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
