import React from 'react';
import { Pagination } from 'antd';
import riskDetail from 'api/detail/risk';
import {
	Spin, Table, Ellipsis, Icon,
} from '@/common';
import { getQueryByName, timeStandard, toEmpty } from '@/utils';
import manage from '@/utils/api/portrait-inquiry/enterprise/manage';

// removeSituation 移除情况
const removeSituation = (val, row) => {
	const { gmtRemoveDate, removeReason, removeDepartment } = row;
	if (!gmtRemoveDate) {
		return (
			<div className="assets-info-content">
				<li>
					<Icon
						type="icon-dot"
						style={{ fontSize: 12, color: '#3DBD7D', marginRight: 3 }}
					/>
					<span className="list list-content">未移除</span>
				</li>
			</div>
		);
	}
	return (
		<div className="assets-info-content">
			<li>
				<Icon
					type="icon-dot"
					style={{ fontSize: 12, color: '#7c7c7c', marginRight: 3 }}
				/>
				<span className="list list-content">已移除</span>
			</li>
			<li>
				<span className="list list-title align-justify list-title-50">移除日期</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{timeStandard(gmtRemoveDate)}</span>
			</li>
			<li>
				<span className="list list-title align-justify list-title-50">移除原因</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					<Ellipsis content={removeReason} tooltip line={1} width={180} />
				</span>
			</li>
			<li>
				<span className="list list-title align-justify list-title-50">移除机关</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content none-width">
					{toEmpty(removeDepartment) ? <Ellipsis content={removeDepartment} tooltip line={1} width={180} /> : '--'}
				</span>
			</li>
		</div>
	);
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

	toGetColumns=() => [
		{
			title: '主要信息',
			dataIndex: 'type',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2 }}>
						{ toEmpty(value) ? <Ellipsis content={value} tooltip width={600} font={15} /> : '--' }
					</li>
					<li>
						<span className="list list-title align-justify">列入日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 100 }}>{timeStandard(row.gmtPutDate)}</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title align-justify">决定机关</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ maxWidth: 300 }}>
							{row.putDepartment || '-'}
						</span>
					</li>
					<li>
						<span className="list list-title align-justify">列入原因</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 600 }}>
							{
								row.putReason.trim()
									? <Ellipsis content={row.putReason} tooltip width={600} /> : '--'
							}
						</span>
					</li>
					<li>

						<span className="list list-title align-justify">具体事实</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content none-width">
							{
								toEmpty(row.fact)
									? <Ellipsis content={row.fact} tooltip width={600} /> : '--'
							}
						</span>
					</li>
				</div>
			),
		}, {
			title: '辅助信息',
			width: 300,
			render: removeSituation,
		},
	];

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		const { portrait } = this.props;
		let api = '';
		const params = {};
		if (portrait === 'detail') {
			api = riskDetail['30401'];
		} else {
			api = manage.illegal;
			params.companyId = getQueryByName(window.location.href, 'id');
		}
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
