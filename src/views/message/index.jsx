import React from 'react';
import {
	Button, Table, Pagination, Modal, message, Spin, Form,
} from 'antd';
import {
	centerList, // 消息提醒
	getDelete, // 删除
	isRead, // 标记已读
} from '@/utils/api/inform';
import { formatDateTime } from '@/utils/changeTime';
import imgUnread from '../../assets/img/inform/icon_message_unread.png';
import imgReade from '../../assets/img/inform/icon_message_read.png';
import './style.scss';

const { confirm } = Modal;
const createForm = Form.create;
class InformCenter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: '标题',
					dataIndex: 'title',
					width: 850,
					render: (text, row) => (
						<div>
							<img style={{ width: 16, verticalAlign: 'sub', marginRight: 10 }} src={row.isRead === false ? imgUnread : imgReade} alt="" />
							<span>
							[
								{text}
							]
								{row.content}
							</span>
						</div>
					),
				}, {
					title: '时间',
					dataIndex: 'createTime',
					width: 160,
					render: text => <span>{formatDateTime(text)}</span>,
				}, {
					title: '操作',
					dataIndex: 'address',
					render: (text, row) => <div onClick={() => this.handledDeleteBatch(row)} className="yc-message-delete">删除</div>,
				}],
			data: [],
			tabTotal: 0,
			pageSize: 10, // 默认页
			current: 1, // 当前页
			loading: false,
			selectedRowKeys: [], // 这里配置默认勾选列
		};
	}

	componentDidMount() {
		this.getData();
	}

	// page翻页
	handleChangePage=(val) => {
		const { pageSize } = this.state;
		this.setState({
			current: val,
		});
		const params = {
			num: pageSize,
			page: val,
		};
		this.getData(params);
	}

	// sort
	handleChange = (pagination, filters, sorter) => {
		const params = {
			orderAscTime: sorter.order === 'ascend',
		};
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
	}

	// 批量删除
	handledDeleteBatch = (row) => {
		console.log(1, row.id);

		const { selectedRowKeys } = this.state;
		const that = this;
		if (selectedRowKeys.length === 0 && !row.id) {
			message.warning('未选中业务');
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
				getDelete(params).then((res) => {
					if (res.code === 200) {
						if (row && selectedRowKeys && selectedRowKeys.length > 0) {
							selectedRowKeys.forEach((i, index) => {
								if (i === row.id) {
									selectedRowKeys.splice(index, 1);
								}
							});
							this.setState({
								selectedRowKeys,
							});
						}
						that.getData();
					} else {
						message.error(res.message);
					}
				});
			},
			onCancel() {},
		});
	}

	// 标记已读
	getRead = () => {
		const { selectedRowKeys } = this.state;
		if (selectedRowKeys.length === 0) {
			message.warning('未选中业务');
			return;
		}
		console.log(selectedRowKeys);

		const params = {
			idList: selectedRowKeys,
		};
		isRead(params).then((res) => {
			if (res.code === 200) {
				message.success('操作成功');
				this.getData();
				this.setState({
					selectedRowKeys: [],
				});
			} else {
				message.warning(res.message);
			}
		});
	}

	onSelectChange = (selectedRowKeys, selectedRows) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
		this.setState({
			selectedRowKeys,
		});
	};

	render() {
		const {
			columns, data, tabTotal, current, pageSize, loading, selectedRowKeys,
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
						<Button onClick={this.getRead} type="ghost" className="btn-default">标记为已读</Button>
						<Button onClick={this.handledDeleteBatch} type="ghost" className="btn-default">删除</Button>
					</div>
					<Spin spinning={loading}>
						<Table
							rowSelection={rowSelection}
							columns={columns}
							dataSource={data}
							pagination={false}
							rowKey={record => record.id}
						/>
					</Spin>
					<div className="yc-pagination">
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
						{/* <div className="yc-pagination-btn"><Button>跳转</Button></div> */}
					</div>
				</div>
			</div>
		);
	}
}
export default createForm()(InformCenter);
