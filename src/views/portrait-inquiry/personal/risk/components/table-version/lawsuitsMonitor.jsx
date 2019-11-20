import React from 'react';
import { Pagination } from 'antd';
import { Spin, Table } from '@/common';
import risk from '@/utils/api/portrait-inquiry/personal/risk';
import { LawsuitsMonitor } from './common';
import { getQueryByName } from '@/utils';

const { judgment } = risk;


export default class lawsuitsMonitor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			current: 1,
			total: 0,
			loading: true,
		};
	}

	componentDidMount() {
		this.toGetData();
	}


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
		// this.setState({ loading: true });
		judgment.list({
			page: page || 1,
			num: 5,
			...params,
		}).then((res) => {
			if (res.code === 200) {
				this.setState({
					data: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				this.setState({
					data: '',
					current: 1,
					total: 0,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	toGetColumns=() => [
		{
			dataIndex: 'caseNumber',
			render: LawsuitsMonitor.LawsuitsDetail,
		}, {
			width: 360,
			render: LawsuitsMonitor.LawsuitsTrialCourt,
		},
	];

	render() {
		const {
			data, current, total, loading,
		} = this.state;
		console.log(loading);

		return (
			<div className="yc-assets-auction">
				<Spin visible={false}>
					<Table
						rowClassName={() => 'yc-assets-auction-table-row'}
						columns={this.toGetColumns()}
						dataSource={data}
						showHeader={false}
						pagination={false}
					/>
					{data && data.length > 0 && (
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
