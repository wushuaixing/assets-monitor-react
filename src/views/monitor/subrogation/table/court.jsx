import React from 'react';
import { Table, Pagination } from 'antd';
import { ReadStatus } from '@/common/table';

// 含操作等...
const defaultColumns = [
	{
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
// 单纯展示
const normalColumns = [
	{
		title: '立案信息',
		dataIndex: 'name',
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

const TableView = (props) => {
	const { normal } = props;
	return (
		<React.Fragment>
			<Table
				columns={normal ? normalColumns : defaultColumns}
				dataSource={data}
				pagination={false}
			/>
			<div className="yc-table-pagination">
				<Pagination defaultCurrent={1} total={500} />

			</div>
		</React.Fragment>
	);
};
export default TableView;
