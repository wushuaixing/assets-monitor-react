import React from 'react';
import Form from 'antd/lib/form';
import Table from 'antd/lib/table';
import Tooltip from 'antd/lib/tooltip';

const columns = [{
	title: '业务编号',
	dataIndex: 'a',
	key: 'a',
	width: 120,
	render: text => <a href="#">{text}</a>,
}, {
	title: '借款人',
	dataIndex: 'b',
	key: 'b',
	width: 240,
	render(text, row) {
		return (
			<div className="table-column">
				<div style={{ display: 'inline-block', float: 'left' }}>
					<div>
						<span style={{ marginRight: '4px' }}>借款人:</span>
						<p className="click-p" style={{ display: 'inline-block' }}>
							{
								text && text.length > 12
									? (
										<Tooltip placement="topLeft" title={text}>
											<p>{`${text.substr(0, 12)}...`}</p>
										</Tooltip>
									)
									: <p>{text || '--'}</p>
							}
						</p>
					</div>
					<div>
						<span style={{ marginRight: '4px' }}>证件号:</span>
						<p style={{ display: 'inline-block' }}>
							{row.obligorNumber || '--'}
						</p>
					</div>
				</div>
			</div>
		);
	},
}, {
	title: '机构名称',
	dataIndex: 'c',
	key: 'c',
	width: 134,
},
{
	title: '担保人',
	dataIndex: 'd',
	key: 'd',
	width: 68,
	render(text) {
		if (text === '0' || !text) {
			return <div>0</div>;
		}
		return <a>{text}</a>;
	},
}, {
	title: '相关推送',
	dataIndex: 'e',
	key: 'e',
	width: 80,
	render(text) {
		if (text === '0' || !text) {
			return <div>0</div>;
		}
		return <a>{text}</a>;
	},
}, {
	title: '上传人员',
	dataIndex: 'f',
	key: 'f',
	width: 80,
}, {
	title: '上传时间',
	dataIndex: 'g',
	key: 'g',
	width: 100,
},	{
	title: '推送状态',
	dataIndex: 'i',
	key: 'i',
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
const dataList = [{
	id: 1,
	a: '1',
	b: '胡彦斌杭州分行滨江支行杭州分行滨江支行杭州分行滨江支行',
	c: '杭州分行滨江支行',
	d: '0',
	e: '1',
	f: '崔九九',
	g: '2019-04-28 21:42:21',
	h: '开启',
}, {
	id: 2,
	a: '1',
	b: '胡彦斌',
	c: '杭州分行滨江支行',
	d: '0',
	e: '1',
	f: '崔九九',
	g: '2019-04-28 1:42:21',
	h: '开启',
}, {
	id: 3,
	a: '1',
	b: '胡彦斌',
	c: '杭州分行滨江支行',
	d: '0',
	e: '1',
	f: '崔九九',
	g: '2019-04-28 1:42:21',
	h: '开启',
}];
class BusinessView extends React.Component {
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
					dataSource={dataList}
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
