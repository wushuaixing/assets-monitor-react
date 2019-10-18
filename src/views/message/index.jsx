import React from 'react';
import {
	Button, Pagination, Modal, message, Form,
} from 'antd';
import { navigate } from '@reach/router';
import {
	centerList, // 消息提醒
	getDelete, // 删除
	isRead, // 标记已读
} from '@/utils/api/inform';
import {
	userInfo, // 通知中心数据
} from '@/utils/api/user';
import { generateUrlWithParams, parseQuery } from '@/utils';
import { Table, Spin, SelectedNum } from '@/common';
import { formatDateTime } from '@/utils/changeTime';
import imgUnread from '../../assets/img/inform/icon_message_unread.png';
import imgReade from '../../assets/img/inform/icon_message_read.png';
import './style.scss';

const { confirm } = Modal;
const createForm = Form.create;
class InformCenter extends React.Component {
	constructor(props) {
		super(props);
		document.title = '消息中心';
		this.state = {
			columns: [
				{
					title: '标题',
					dataIndex: 'title',
					width: 850,
					render: (text, row) => (
						<div>
							<img
								style={{ width: 16, verticalAlign: 'sub', marginRight: 10 }}
								src={row.isRead === false ? imgUnread : imgReade}
								alt=""
							/>
							<span
								onClick={() => {
									this.skip(row);
								}}
								className="yc-message-content"
							>
							[
								{text}
							]
								{row.content}
							</span>
						</div>
					),
				},
				{
					title: '时间',
					dataIndex: 'createTime',
					width: 160,
					render: text => <span>{formatDateTime(text)}</span>,
				},
				{
					title: '操作',
					dataIndex: 'address',
					render: (text, row) => (
						<div
							onClick={() => this.handledDeleteBatch(row)}
							className="yc-table-text-link"
						>
							删除
						</div>
					),
				},
			],
			data: [],
			tabTotal: 0,
			pageSize: 10, // 默认页
			current: 1, // 当前页
			loading: false,
			selectedRowKeys: [], // 这里配置默认勾选列
			isInstitution: false, // 是否是本机构
		};
	}

	componentDidMount() {
		const { columns } = this.state;
		const { hash } = window.location;
		const params = parseQuery(hash);
		if (params.page) {
			console.log(12);

			this.getData(params);
			this.setState({
				current: Number(params.page),
			});
		} else {
			console.log(123);

			this.getData();
		}

		userInfo().then((res) => {
			if (res.code === 200) {
				const isInstitution = res.data.currentOrgId === res.data.masterOrgId;
				console.log(isInstitution);

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
		if (row.operateType === 'auctionProcessAlert') {
			const w = window.open('about:blank');
			w.location.href = '#/monitor?process=1';
		}
		if (row.operateType === 'newAuctionProcessAlert') {
			const w = window.open('about:blank');
			w.location.href = '#/monitor?process=1';
		}
		if (row.operateType === 'dishonestAdd') {
			const w = window.open('about:blank');
			w.location.href = `#/business/debtor/detail?id=${
				row.obligorId
			}`;
		}
		if (row.operateType === 'dishonestRemove') {
			const w = window.open('about:blank');
			w.location.href = `#/business/debtor/detail?id=${
				row.obligorId
			}`;
		}
		const params = {
			idList: [row.id],
		};
		isRead(params);
		window.location.reload(); // 实现页面重新加载/
	}

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
	}


	getData = (data) => {
		const params = {
			...data,
			num: 10,
		};
		this.setState({
			loading: true,
		});
		centerList(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						data: res.data.list,
						tabTotal: res.data.total,
						loading: false,
					});
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	}

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
						// if (!row.id) {
						// 	that.setState({
						// 		selectedRowKeys: [],
						// 	});
						// }

						// that.getData();
						// message.success(res.message);
					} else {
						message.error(res.message);
					}
				});
			},
			onCancel() {},
		});
	}

	// 全部标记为已读
	handleAllRead = () => {
		// const that = this;
		const { selectedRowKeys, current } = this.state;
		if (selectedRowKeys.length === 0) {
			message.warning('未选中消息');
			return;
		}
		const params = {
			idList: selectedRowKeys,
		};
		// const page = {
		// 	page: current,
		// };
		Modal.confirm({
			title: '确认将消息标记为已读？',
			content: '点击确定，将为您标记为已读。',
			iconType: 'exclamation-circle',
			onOk() {
				isRead(params).then((res) => {
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
						// that.getData(page);
						// that.setState({
						// 	selectedRowKeys: [],
						// });
					} else {
						message.warning(res.message);
					}
				});
			},
			onCancel() {},
		});
	}

	onSelectChange = (selectedRowKeys, selectedRows) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
		this.setState({
			selectedRowKeys,
		});
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
					<div className="yc-con-item-wrapper">
						{isInstitution && (
							<div>
								<Button
									onClick={this.handleAllRead}
									type="ghost"
									className="btn-default"
								>
								标记为已读
								</Button>
								<Button
									onClick={this.handledDeleteBatch}
									type="ghost"
									className="btn-default"
								>
								删除
								</Button>
							</div>
						)}
					</div>
					{selectedRowKeys && selectedRowKeys.length > 0 ? <SelectedNum num={selectedRowKeys.length} /> : null}
					<Spin visible={loading}>
						<Table
							rowSelection={isInstitution && rowSelection}
							columns={columns}
							dataSource={data}
							pagination={false}
							rowKey={record => record.id}
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
		);
	}
}
export default createForm()(InformCenter);
