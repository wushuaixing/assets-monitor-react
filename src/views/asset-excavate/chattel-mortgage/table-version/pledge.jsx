import React from 'react';
import { Pagination } from 'antd';
import {
	Ellipsis, Icon, Spin, Table,
} from '@/common';
import assets from '@/utils/api/portrait-inquiry/enterprise/assets';
import { getQueryByName, timeStandard, toEmpty } from '@/utils';

const api = assets.pledgeD;

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
			dataIndex: 'pledgeeList',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-title-normal-bold" style={{ lineHeight: '20px' }}>
						{ toEmpty(row.pawnName) ? <Ellipsis content={row.pawnName} tooltip width={600} font={15} /> : '--' }
					</li>
					<li>
						<span className="list list-title align-justify">登记日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(row.regDate)}</span>
					</li>
					<li>
						<span className="list list-title align-justify">抵押权人</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 200 }}>
							{ toEmpty(row.people) ? <Ellipsis content={row.people} tooltip width={200} /> : '--'}
						</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title align-justify">担保债权数额</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content " style={{ width: 120 }}>{row.amount ? `${row.amount}元` : '--'}</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title align-justify">债务人履行债务的期限</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content " style={{ maxWidth: 'none' }}>{row.term || '--'}</span>
					</li>
				</div>
			),
		},
		{
			title: '关联信息',
			width: 240,
			render: (value, row) => (
				<div className="assets-info-content">
					<li style={{ lineHeight: '20px' }}>
						<Icon type="icon-dot" style={{ fontSize: 12, color: row.status === '有效' ? '#3DBD7D' : '#7D8699', marginRight: 2 }} />
						<span className="list list-content ">{row.status}</span>
					</li>
					{
						row.status === '无效' ? [
							<li>
								<span className="list list-title align-justify">注销时间</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.cancelDate || '-'}</span>
							</li>,
							<li>
								<span className="list list-title align-justify">注销原因</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.cancelReason || '-'}</span>
							</li>,
						] : null
					}
					<li>
						<span className="list list-title align-justify">登记编号</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{ toEmpty(row.regNum) ? <Ellipsis content={row.regNum} tooltip width={130} /> : '--'}
						</span>
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
			companyId,
			num: 5,
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
