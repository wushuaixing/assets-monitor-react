import React from 'react';
import Form from 'antd/lib/form';
import Table from 'antd/lib/table';
import Tooltip from 'antd/lib/tooltip';


class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		const { showConfirm } = props;
		this.state = {
			columns: [{
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
				dataIndex: 'orgName',
				key: 'orgName',
				width: 134,
			},
			{
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
						<a onClick={showConfirm}>删除</a>
					</span>
				),
			}],
		};
	}


	render() {
		const { stateObj, rowSelection } = this.props;
		const { columns } = this.state;
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
export default Form.create()(BusinessView);
