import React from 'react';
import { navigate } from '@reach/router';
import {
	Breadcrumb, Button, Table, Pagination,
} from 'antd';

import './style.scss';

const columns = [{
	title: '资产信息',
	dataIndex: 'name',
	width: 375,
	render(text) {
		return <a href="#">{text}</a>;
	},
}, {
	title: '匹配原因',
	dataIndex: 'age',
	width: 375,
}, {
	title: '拍卖信息',
	dataIndex: 'address',
}];
const data = [];
for (let i = 0; i < 12; i += 1) {
	data.push({
		key: i,
		name: `李大嘴${i}`,
		age: 32,
		address: `西湖区湖底公园${i}号`,
	});
}

export default class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totals: 0,
			current: 1, // 当前页
			pageSize: 10, // 默认展示条数
		};
	}

	// page翻页
	handleChangePage = (val) => {
		const { pageSize, searchValue } = this.state;
		console.log(val, pageSize, searchValue);

		// const params = {
		// 	...searchValue,
		// 	current: val,
		// 	page: {
		// 		num: pageSize,
		// 		page: val,
		// 	},
		// };

		// this.getData(params);
	}

	render() {
		const {
			totals, current,
		} = this.state;
		return (
			<div className="yc-debtor-wrapper">
				<div className="yc-content-breadcrumb">
					<Breadcrumb>
						<Breadcrumb.Item><p style={{ fontSize: 14 }} className="click-p" onClick={() => navigate('/business/debtor')}>债务人</p></Breadcrumb.Item>
						<Breadcrumb.Item><span style={{ 'font-weight': 100 }}>债务人详情</span></Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="yc-item-ob">
					<div className="yc-item-icon" />
					<div className="yc-search-content">
						<span className="yc-item-title">p</span>
						<div className="search-item-text">
							<span className="search-item-text-header">身份证号/统一社会信用代码：</span>
							<span className="search-item-text-msg">2222</span>
						</div>
						<div className="search-item-text">
							<span className="search-item-text-header">曾用名：</span>
							<span className="search-item-text-msg">－</span>
						</div>
					</div>
					<div className="yc-search-right">
						<Button className="yc-btn">
							<span className="yc-icon-export" />
                            下载
						</Button>
					</div>
				</div>
				<div className="yc-debtor-table">
					<div className="yc-table-header">
						<div className="table-header-left">
							资产拍卖
						</div>
					</div>
					<Table
						columns={columns}
						dataSource={data}
						style={{ width: '100%' }}
						pagination={false}
						onRowClick={(record) => {
							if (!record.children) {
								const w = window.open('about:blank');
								w.location.href = '#/monitor';
							}
						}}
					/>
					<div className="yc-pagination">
						<Pagination
							// total={totals}
							total={12}
							current={current}
							defaultPageSize={10} // 默认条数
							showQuickJumper
							showTotal={total => `共 ${total} 条记录`}
							onChange={(val) => {
								console.log(val);

								this.handleChangePage(val);
							}}
						/>
						{/* <div className="yc-pagination-btn"><Button>跳转</Button></div> */}
					</div>
				</div>
			</div>
		);
	}
}
