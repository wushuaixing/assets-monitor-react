import React from 'react';
import { Table } from '@antd';
import { ReadStatus } from '@/common/table';

const columns = [{
	title: <span style={{ paddingLeft: 11 }}>立案信息</span>,
	dataIndex: 'name',
	render: ReadStatus,
}, {
	title: '原告',
	dataIndex: 'age',
}, {
	title: '被告',
	dataIndex: 'address',
}, {
	title: '法院',
	dataIndex: 'address',
}, {
	title: '案号',
	dataIndex: 'address',
}, {
	title: '关联信息',
	dataIndex: 'address',
}, {
	title: '更新日期',
	dataIndex: 'address',
}, {
	title: '操作',
	dataIndex: 'address',
}];
const data = [{
	key: '1',
	name: '胡彦斌',
	age: 32,
	address: '西湖区湖底公园1号',
}, {
	key: '2',
	name: '胡彦祖',
	age: 42,
	address: '西湖区湖底公园1号',
}, {
	key: '3',
	name: '李大嘴',
	age: 32,
	address: '西湖区湖底公园1号',
}];

const TableView = () => (
	<Table columns={columns} dataSource={data} />
);
export default TableView;
