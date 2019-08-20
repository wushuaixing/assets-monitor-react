import React from 'react';
import {
	Button, Table, Pagination,
} from 'antd';
import {
	centerList, // 消息提醒
	// exportExcel, // 导出
} from '@/utils/api/inform';
import imgUnread from '../../assets/img/inform/icon_message_unread.png';
import imgReade from '../../assets/img/inform/icon_message_read.png';
import './style.scss';

export default class InformCenter extends React.Component {
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
				}, {
					title: '操作',
					dataIndex: 'address',
					render: () => <div>删除</div>,
				}],
			data: [],
			tabTotal: 0,
			pageSize: 10, // 默认页
			current: 1, // 当前页
			loading: false,
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

		console.log(data);

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

	render() {
		const {
			columns, data, tabTotal, current, pageSize, loading,
		} = this.state;
		// 通过 rowSelection 对象表明需要行选择
		const rowSelection = {
			onChange(selectedRowKeys, selectedRows) {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			},
			onSelect(record, selected, selectedRows) {
				console.log(record, selected, selectedRows);
			},
			onSelectAll(selected, selectedRows, changeRows) {
				console.log(selected, selectedRows, changeRows);
			},
		};
		return (
			<div className="yc-inform-center">
				<div className="yc-content-wapper">
					<div className="yc-page-title">消息中心</div>
					<div className="yc-con-item-wrapper">
						<Button type="ghost" className="btn-default">标记为已读</Button>
						<Button type="ghost" className="btn-default">删除</Button>
					</div>
					<Table
						rowSelection={rowSelection}
						columns={columns}
						dataSource={data}
						pagination={false}
					/>
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
