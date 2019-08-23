import React from 'react';
import {
	Modal, message, Tooltip, Table, Form,
} from 'antd';
import {
	openPush, // 打开推送
	closePush, // 关闭推送
	postDelete, // 删除一条记录
} from '@/utils/api/business';
import { formatDateTime } from '@/utils/changeTime';

const { confirm } = Modal;

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		const { openPeopleModal } = props;

		this.state = {
			columns: [{
				title: '业务编号',
				dataIndex: 'caseNumber',
				key: 'caseNumber',
				width: 120,
				render: text => (
					<p>{text || '-'}</p>
				),
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
									<a
										onClick={() => {
											const w = window.open('about:blank');
											w.location.href = `#/business/debtor/detail?id=${row.obligorId}`;
										}}
										className="yc-click-obligorName"
										style={{ display: 'inline-block' }}
									>
										{
											text && text.length > 12
												? (
													<Tooltip placement="topLeft" title={text}>
														<p>{`${text.substr(0, 12)}...`}</p>
													</Tooltip>
												)
												: <p>{text || '-'}</p>
										}
									</a>
								</div>
								<div>
									<span style={{ marginRight: '4px' }}>证件号:</span>
									<p style={{ display: 'inline-block' }}>
										{row.obligorNumber || '-'}
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
				render: text => (
					<p>{text || '-'}</p>
				),
			},
			{
				title: '担保人',
				dataIndex: 'guarantorCount',
				key: 'guarantorCount',
				width: 68,
				render(text, row) {
					if (text === '0' || !text) {
						return <div>0</div>;
					}
					return <a onClick={() => openPeopleModal(row.id)}>{text}</a>;
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
				render: text => (
					<p>{text || '-'}</p>
				),
			}, {
				title: '上传时间',
				dataIndex: 'uploadTime',
				key: 'uploadTime',
				width: 100,
				render(text) {
					return <span>{formatDateTime(text) || '-'}</span>;
				},
			},	{
				title: '推送状态',
				dataIndex: 'pushState',
				key: 'pushState',
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
									<p className="no-attention">关闭</p>
								</React.Fragment>
							)
						}
					</React.Fragment>

				),
			}, {
				title: '操作',
				key: 'operation',
				render: (text, row) => (
					<span>
						<a onClick={() => this.detail(row)}>查看详情</a>
						<span className="ant-divider" />
						<a onClick={() => this.handlePut(row)}>{row.pushState === 1 ? '关闭推送' : '开启推送'}</a>
						<span className="ant-divider" />
						<a onClick={() => this.showDeleteConfirm(row)}>删除</a>
					</span>
				),
			}],
		};
	}

	// 跳转详情
	detail = (row) => {
		console.log(row.id);
		const w = window.open('about:blank');
		w.location.href = `#/business/detail?id=${row.id}`;
	}

	// 删除一条业务
	showDeleteConfirm = (row) => {
		const { getData, stateObj } = this.props; // 刷新列表
		const { selectedRowKeys } = stateObj;
		confirm({
			title: '确认删除选中业务吗?',
			content: '点击确认删除，业务相关债务人的所有数据(除已完成的数据外)将被清空，无法恢复，请确认是否存在仍需继续跟进的数据',
			iconType: 'exclamation-circle-o',
			onOk() {
				const params = {
					id: row.id,
				};
				postDelete(params).then((res) => {
					if (res.code === 200) {
						if (stateObj && selectedRowKeys && selectedRowKeys.length > 0) {
							selectedRowKeys.forEach((i, index) => {
								if (i === row.id) {
									selectedRowKeys.splice(index, 1);
								}
							});
						}
						message.success(res.message);
						getData();
					}
				});
			},
			onCancel() {},
		});
	}

	// 关闭, 开启推送
	handlePut = (row) => {
		const { getData } = this.props;// 刷新列表
		confirm({
			title: `确认${row.pushState === 1 ? '关闭' : '开启'}本条业务的推送功能吗?`,
			content: `点击确定，系统将${row.pushState === 1 ? '不再' : ''}为您推送本条业务相关的监控信息。`,
			iconType: 'exclamation-circle-o',
			onOk() {
				console.log('确定', row.id);
				const params = {
					id: row.id,
				};
				if (row.pushState === 1) {
					closePush(params).then((res) => {
						if (res.code === 200) {
							message.success('关闭成功');
							getData();
						}
					});
				} else {
					openPush(params).then((res) => {
						if (res.code === 200) {
							message.success('开启成功');
							getData();
						}
					});
				}
			},
			onCancel() {},
		});
	}

	render() {
		const { stateObj, rowSelection } = this.props;
		const { columns } = this.state;
		return (
			<React.Fragment>
				<Table
					rowSelection={stateObj.openRowSelection ? rowSelection : null}
					rowKey={record => record.id}
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
