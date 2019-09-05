import React from 'react';
import { Table, Form } from 'antd';

const dataSource = [{
	key: '1',
	name: '胡彦斌',
	age: 32,
	address: 'GR2019SC1001238',
}, {
	key: '2',
	name: '胡彦祖',
	age: 42,
	address: '西湖区湖底公园1号',
}];

class BusinessView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{
					title: '立案日期',
					dataIndex: 'name',
					key: 'name',
					width: 760,
				}, {
					title: '原告',
					dataIndex: 'name',
					key: 'name',
					width: 760,
				}, {
					title: '被告',
					dataIndex: 'name',
					key: 'name',
					width: 760,
				}, {
					title: '起诉法院',
					dataIndex: 'name',
					key: 'name',
					width: 760,
				}, {
					title: '案号',
					dataIndex: 'name',
					key: 'name',
					width: 760,
				}, {
					title: '关联信息',
					dataIndex: 'name',
					key: 'name',
					width: 760,
				},
			],
		};
	}

	render() {
		const { columns } = this.state;
		return (
			<React.Fragment>
				<Table
					rowKey={record => record.id}
					dataSource={dataSource}
					columns={columns}
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
					onRowClick={() => {
						// if (!record.children) {
						// 	const w = window.open('about:blank');
						// 	w.location.href = '#/monitor';
						// }
					}}
				/>
			</React.Fragment>
		);
	}
}
export default Form.create()(BusinessView);
