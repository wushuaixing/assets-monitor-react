import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import associationLink from '@/views/_common/association-link';
import { timeStandard, toEmpty, getCaseType } from '@/utils';
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

	toGetPortrait =() => {
		const { portrait } = this.props;
		return portrait === 'business';
	};

	toGetColumns=() => [
		{
			title: '拍卖信息',
			dataIndex: 'caseNumber',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
						<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>
							<Ellipsis content={toEmpty(row.caseNumber)} url={row.url} tooltip width={300} font={14} />
						</span>
						{ row.caseType ? <span className="yc-case-type">{getCaseType(row.caseType)}</span> : ''}
					</li>
					<LiItem Li title="立案日期">{timeStandard(row.gmtRegister)}</LiItem>
					<PartyCrosswise value={row.parties} row={row} type="trial" linkDetail={this.toGetPortrait()} />
				</div>
			),
		}, {
			title: '关联信息',
			width: 270,
			render: (value, row) => (
				<div className="assets-info-content">
					<li style={{ height: 24 }} />
					<LiItem Li title="审理法院"><Ellipsis content={toEmpty(row.court)} tooltip width={160} /></LiItem>
					<LiItem Li title="关联信息">{associationLink(value, row, 'Court')}</LiItem>
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
		const { api, params } = getDynamicRisk(portrait, {
			b: 20601,
			e: 'trial',
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
		const { loadingHeight } = this.props;
		return (
			<div className="yc-assets-auction ">
				<Spin visible={loading} minHeight={loadingHeight}>
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
