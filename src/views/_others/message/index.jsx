import React from 'react';
import {
	Pagination, Modal, message, Form,
} from 'antd';
import { Button } from '@/common';
import { navigate } from '@reach/router';
import {
	centerList, // 消息提醒
	getDelete, // 删除
	isRead as isReadApi, // 标记已读
} from 'api/inform';
import {
	userInfo, // 通知中心数据
} from 'api/user';
import { DownloadFile, generateUrlWithParams, parseQuery } from '@/utils';
import { Table, Spin, SelectedNum } from '@/common';
import { formatDateTime } from '@/utils/changeTime';
import baseUrl from 'api/config';
import { exportFile } from 'api/home';
import Cookies from 'universal-cookie';
import './style.scss';

const cookies = new Cookies();
const { confirm } = Modal;
const createForm = Form.create;
class InformCenter extends React.Component {
	constructor(props) {
		super(props);
		document.title = '消息中心';
		this.state = {
			columns: [
				{
					title: '消息种类',
					dataIndex: 'title',
					width: 200,
					className: 'message-type',
					render: (text, row) => (
						<div style={{ marginLeft: 10 }}>
							<span
								className={!row.isRead ? 'yc-table-read' : 'yc-table-unread'}
							/>
							<span className={`${row.isRead === false ? 'message-unRead' : 'message-normal'}`}>
								{text}
							</span>
						</div>
					),
				},
				{
					title: '内容详情',
					dataIndex: 'content',
					render: text => (
						<span className="yc-message-content">
							<span
								dangerouslySetInnerHTML={{ __html: text }}
							/>
						</span>
					),
				}, {
					title: '操作',
					width: 100,
					render: (text, row) => (
						<span
							className="yc-message-operation"
						>
							{
								row.operateType === 'businessReport' ? (
									JSON.parse(row.extend) && !JSON.parse(row.extend).disable ? <span onClick={() => this.download(row)}>下载报告</span> : <span className="yc-message-operation-text">文件下载失败</span>
								) : (
									<span onClick={() => {
										this.skip(row);
									}}
									>
										点击查看
									</span>
								)
							}
						</span>
					),
				},
				{
					title: '更新时间',
					dataIndex: 'createTime',
					width: 160,
					render: (text, row) => <span className={`${row.isRead === false ? 'message-unRead' : 'message-normal'}`}>{formatDateTime(text)}</span>,
				},
				// {
				// 	title: '操作',
				// 	width: 60,
				// 	dataIndex: 'address',
				// 	render: (text, row) => (
				// 		<div
				// 			onClick={(e) => {
				// 				e.stopPropagation();
				// 				this.handledDeleteBatch(row);
				// 			}}
				// 			className="yc-table-text-link"
				// 		>
				// 			删除
				// 		</div>
				// 	),
				// },
			],
			data: [],
			tabTotal: 0,
			pageSize: 10, // 默认页
			current: 1, // 当前页
			loading: false,
			selectedRowKeys: [], // 这里配置默认勾选列
			isInstitution: false, // 是否是本机构
			btnActivate: 'all',
		};
	}

	componentDidMount() {
		const { columns } = this.state;
		const { hash } = window.location;
		const params = parseQuery(hash);
		if (params.page) {
			this.getData(params);
			this.setState({
				current: Number(params.page),
			});
		} else {
			this.getData();
		}

		userInfo().then((res) => {
			if (res.code === 200) {
				const isInstitution = res.data.currentOrgId === res.data.masterOrgId;
				if (isInstitution === false && columns.length > 0) {
					columns.pop(); // 删掉最后一项
				}
				this.setState({
					isInstitution,
				});
			}
		});
	}

	// 跳转
	skip = (row) => {
		// const params = {
		// 	idList: [row.id],
		// };
		// const { isInstitution } = this.state;
		// if (isInstitution) {
		// 	isRead(params);
		// }
		if (row.obligorId) {
			// 资产跟进提醒
			if (row.operateType === 'newAuctionProcessAlert') {
				const { title } = JSON.parse(row.extend);
				const w = window.open('about:blank');
				w.location.href = `#/monitor?process=3&id=${row.obligorId}${title ? `&title=${title}` : ''}`;
			}
			// 失信状态移除 列入失信名单
			if (row.operateType === 'dishonestAdd' || row.operateType === 'dishonestRemove') {
				const w = window.open('about:blank');
				w.location.href = `#/business/debtor/detail?id=${
					row.obligorId
				}`;
			}
			// 拍卖状态变更
			if (row.operateType === 'auctionStatusChangeAlert') {
				const { title } = JSON.parse(row.extend);
				const w = window.open('about:blank');
				w.location.href = `#/monitor?process=3&id=${row.obligorId}${title ? `&title=${title}` : ''}`;
			}
		} else if (row.operateType === 'monitorReport') {
			if (JSON.parse(row.extend) && JSON.parse(row.extend).total > 200) {
				const w = window.open('about:blank');
				w.location.href = '#/info/monitor';
			} else {
				const w = window.open('about:blank');
				w.location.href = `#/messageDetail?stationId=${
					row.id
				}`;
			}
		} else {
			Modal.error({
				title: '该债务人已经被删除！',
				onOk: () => {
					window.location.reload(); // 实现页面重新加载/
				},
			});
		}
		window.location.reload();
	};

	// 行点击操作
	toRowClick = (record, index) => {
		const { isInstitution } = this.state;
		const { id, isRead } = record;
		if (!isRead && isInstitution) {
			this.onRefresh({ id, isRead: !isRead, index }, 'isRead');
		}
		const params = {
			idList: [record.id],
		};
		if (isInstitution) {
			isReadApi(params);
		}
		// this.skip(record);
	};

	// 表格发生变化
	onRefresh=(val, type) => {
		const { data } = this.state;
		const { index } = val;
		const _dataSource = data;
		_dataSource[index][type] = val[type];
		this.setState({
			data: _dataSource,
		});
	};

	// page翻页
	handleChangePage = (val) => {
		const { pageSize } = this.state;
		this.setState({
			current: val,
		});
		const params = {
			num: pageSize,
			page: val,
		};
		navigate(generateUrlWithParams('/message', params));

		this.getData(params);
	};


	getData = (data) => {
		const params = {
			...data,
			num: 10,
		};
		this.setState({
			loading: true,
		});
		centerList(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					data: res.data.list,
					tabTotal: res.data.total,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 批量删除
	handledDeleteBatch = (row) => {
		const { selectedRowKeys, tabTotal, current } = this.state;
		const that = this;
		if (selectedRowKeys.length === 0 && !row.id) {
			message.warning('未选中消息');
			return;
		}
		confirm({
			title: '确认删除消息吗？',
			content: '点击确定，将删除信息。',
			iconType: 'exclamation-circle-o',
			onOk() {
				const params = {
					idList: row.id ? [row.id] : selectedRowKeys,
				};

				if (selectedRowKeys.length === 0) {
					const urlValue = {
						num: 10,
						page: tabTotal % 10 === 1 ? current - 1 : current,
					};
					navigate(generateUrlWithParams('/message', urlValue));
				} else {
					// 判断最后一页批量删除
					let currentLength;
					if (Math.ceil(tabTotal / 10) === current && tabTotal % 10 === selectedRowKeys.length) {
						currentLength = current - 1;
					}
					if (Math.ceil(tabTotal / 10) === current && selectedRowKeys.length === 10) {
						currentLength = current - 1;
					}
					const urlValue = {
						num: 10,
						page: currentLength || current,
					};
					navigate(generateUrlWithParams('/message', urlValue));
				}

				getDelete(params).then((res) => {
					if (res.code === 200) {
						message.loading('删除成功,2秒后为您刷新页面', 2000);
						setTimeout(() => {
							window.location.reload(); // 实现页面重新加载/
						}, 2000);
						// 异步手动移除
						if (row && selectedRowKeys && selectedRowKeys.length > 0) {
							selectedRowKeys.forEach((i, index) => {
								if (i === row.id) {
									selectedRowKeys.splice(index, 1);
								}
							});
							that.setState({
								selectedRowKeys,
							});
						}
					} else {
						message.error(res.message);
					}
				});
			},
			onCancel() {},
		});
	};

	// 全部标记为已读
	handleAllRead = () => {
		// const that = this;
		const { current } = this.state;
		// if (selectedRowKeys.length === 0) {
		// 	message.warning('未选中消息');
		// 	return;
		// }
		const params = {};
		Modal.confirm({
			title: '确认将消息标记为已读？',
			content: '点击确定，将为您标记为已读。',
			iconType: 'exclamation-circle',
			onOk() {
				isReadApi(params).then((res) => {
					if (res.code === 200) {
						// message.success('操作成功,2秒后为您刷新页面');
						message.loading('操作成功,2秒后为您刷新页面', 2000);
						setTimeout(() => {
							window.location.reload(); // 实现页面重新加载/
						}, 2000);
						const urlValue = {
							num: 10,
							page: current,
						};
						navigate(generateUrlWithParams('/message', urlValue));
						// 异步手动移除
					} else {
						message.warning(res.message);
					}
				});
			},
			onCancel() {},
		});
	};

	onSelectChange = (selectedRowKeys, selectedRows) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
		this.setState({
			selectedRowKeys,
		});
	};

	handleReadChange = (val) => {
		const params = (val === 'all' ? '' : { isRead: false });
		this.getData(params);
		this.setState({
			btnActivate: val,
		});
	};

	download = (item) => {
		const { total } = JSON.parse(item.extend);
		const token = cookies.get('token');
		DownloadFile(`${baseUrl}${exportFile(total)}?token=${token}`);
	}

	render() {
		const {
			columns,
			data,
			tabTotal,
			current,
			loading,
			selectedRowKeys,
			isInstitution,
			btnActivate,
		} = this.state;
		// 通过 rowSelection 对象表明需要行选择
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		return (
			<div className="yc-inform-center">
				<div className="yc-content-wapper">
					<div className="yc-page-title">消息中心</div>
					<div className="yc-page-line" />
					<div className="yc-table-box">
						<div className="yc-con-item-wrapper">
							{isInstitution && (
								<div>
									<Button
										onClick={() => this.handleReadChange('all')}
										title="全部"
										active={btnActivate === 'all'}
										className="btn-default"
									/>
									<Button
										onClick={() => this.handleReadChange('else')}
										title="只显示未读数据"
										className="btn-default"
										active={btnActivate === 'else'}
									/>
									<div className="yc-con-item-wrapper-btn">
										<i className="iconfont icon-quanbubiaoweiyidu yc-con-item-wrapper-btn-icon" />
										<span onClick={() => this.handleAllRead}>全部标记已读数据</span>
									</div>
								</div>
							)}
						</div>
						{/* <div className="yc-table-check"> */}
						{/*	{selectedRowKeys && selectedRowKeys.length > 0 ? <SelectedNum num={selectedRowKeys.length} /> : null} */}
						{/* </div> */}
						<Spin visible={loading}>
							<Table
								// rowSelection={isInstitution && rowSelection}
								columns={columns}
								dataSource={data}
								pagination={false}
								rowClassName={record => (record.isRead ? 'yc-row-bold cursor-pointer' : 'yc-row-bold cursor-pointer')}
								rowKey={record => record.id}
								onRowClick={this.toRowClick}
							/>
							{data && data.length > 0 && (
								<div className="yc-table-pagination">
									<Pagination
										total={tabTotal}
										current={current}
										defaultPageSize={10} // 默认条数
										showQuickJumper
										showTotal={total => `共 ${total} 条记录`}
										onChange={(val) => {
											this.handleChangePage(val);
										}}
									/>
								</div>
							)}
						</Spin>
					</div>
				</div>
			</div>
		);
	}
}
export default createForm()(InformCenter);
