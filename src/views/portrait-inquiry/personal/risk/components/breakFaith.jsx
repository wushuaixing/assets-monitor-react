import React from 'react';
import { Pagination } from 'antd';
import { Spin, Table } from '@/common';
import risk from '@/utils/api/portrait-inquiry/personal/risk';
import { breakFaith } from './common';
import { getQueryByName } from '@/utils';

const { dishonest } = risk;


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
			dataIndex: 'caseNumber',
			render: breakFaith.breakFaithDetail,
		}, {
			dataIndex: 'caseNumber',
			width: 180,
			render: breakFaith.breakFaithTrialCourt,
		},
	];

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		const params = {
			obligorName: getQueryByName(window.location.href, 'name'),
			obligorNumber: getQueryByName(window.location.href, 'num'),
		};
		this.setState({ loading: true });
		dishonest.list({
			page: page || 1,
			num: 5,
			...params,
		}).then((res) => {
			console.log(res);
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
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">
              失信记录
						<span className="yc-table-num">{total}</span>
					</div>
				</div>
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
			</div>
		);
	}
}
