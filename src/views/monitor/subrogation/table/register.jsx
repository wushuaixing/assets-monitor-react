import React from 'react';
import { Table } from 'antd';

const columns = [
	{
		title: '',
		dataIndex: 'read',
		key: 'read',
		width: 20,
	}, {
		title: '业务编号',
		dataIndex: 'caseNumber',
		key: 'caseNumber',
		width: 120,
		render: text => <a href="#">{text}</a>,
	}, {
		title: '借款人',
		dataIndex: 'obligorName',
		key: 'obligorName',
		width: 240,
	}, {
		title: '机构名称',
		dataIndex: 'orgName',
		key: 'orgName',
		width: 134,
	}, {
		title: '担保人',
		dataIndex: 'guarantorCount',
		key: 'guarantorCount',
		width: 68,
		render(text) {
			if (text === '0' || !text) {
				return <div>0</div>;
			}
			return <a>{text}</a>;
		},
	}, {
		title: '相关推送',
		dataIndex: 'pushCount',
		key: 'pushCount',
		width: 80,
		render(text) {
			if (text === '0' || !text) {
				return <div>0</div>;
			}
			return <a>{text}</a>;
		},
	}, {
		title: '上传人员',
		dataIndex: 'uploadName',
		key: 'uploadName',
		width: 80,
	}, {
		title: '上传时间',
		dataIndex: 'uploadTime',
		key: 'uploadTime',
		width: 100,
	},	{
		title: '推送状态',
		dataIndex: 'upPut',
		key: 'upPut',
		width: 110,
		render: text => (
			<React.Fragment>
				{
					text === 1 ? (
						<React.Fragment>
							<p className="circle-item">启用</p>
						</React.Fragment>

					) : (
						<React.Fragment>
							<p className="no-attention">禁用</p>
						</React.Fragment>
					)
				}
			</React.Fragment>

		),
	}, {
		title: '操作',
		key: 'operation',
		render: () => (
			<span>
				<a href="#">查看详情</a>
				<span className="ant-divider" />
				<a href="#">关闭推送</a>
				<span className="ant-divider" />
				<a href="#">删除</a>
			</span>
		),
	}];

export default class TableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const { stateObj, rowSelection } = this.props;
		return (
			<React.Fragment>
				<Table
					rowSelection={stateObj.openRowSelection ? rowSelection : null}
					rowKey={record => record.key}
					columns={columns}
					dataSource={stateObj.dataList}
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
