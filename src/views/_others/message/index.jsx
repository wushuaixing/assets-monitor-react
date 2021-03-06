import React from 'react';
import {
	Pagination, Modal, message, Form,
} from 'antd';
import { Button } from '@/common';
import { navigate } from '@reach/router';
import {
	centerList, // 消息提醒
	isRead as isReadApi, // 标记已读
} from 'api/inform';
import {
	userInfo, // 通知中心数据
} from 'api/user';
import {
	DownloadFile, generateUrlWithParams, parseQuery, isJsonString,
} from '@/utils';
import { Table, Spin } from '@/common';
import { formatDateTime } from '@/utils/changeTime';
import baseUrl from 'api/config';
import { businessFile } from 'api/home';
import Cookies from 'universal-cookie';
import './style.scss';

const cookies = new Cookies();
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
					width: 100,
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
					width: 500,
					render: (text, row) => (
						<span className="yc-message-content">
							<span
								className={`${row.isRead === false ? 'message-unRead' : 'message-normal'}`}
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
								row.operateType === 'monitorReport' && isJsonString(row.extend) && JSON.parse(row.extend).total <= 200 ? (
									<span
										className="cursor-pointer"
										onClick={() => {
											this.skip(row);
										}}
									>
										查看详情
									</span>
								) : row.operateType === 'monitorReport' && isJsonString(row.extend) && JSON.parse(row.extend).total > 200 && <span style={{ color: '#7D8699', cursor: 'default' }}>- -</span>
							}
							{
								row.operateType === 'businessReport' ? (
									isJsonString(row.extend) && !JSON.parse(row.extend).disabled ? <span className="cursor-pointer" onClick={() => this.download(row)}>下载报告</span> : <span className="yc-message-operation-text">文件已失效</span>
								) : null
							}
							{
								row.operateType !== 'monitorReport' && row.operateType !== 'businessReport' ? (
									<span
										className="cursor-pointer"
										onClick={() => {
											this.skip(row);
										}}
									>
										查看详情
									</span>
								) : null
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
			],
			data: [],
			tabTotal: 0,
			pageSize: 10, // 默认页
			current: 1, // 当前页
			loading: false,
			isInstitution: false, // 是否是本机构
			isRead: 'all',
		};
	}

	componentDidMount() {
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
				// if (isInstitution === false && columns.length > 0) {
				// 	columns.pop(); // 删掉最后一项
				// }
				this.setState({
					isInstitution,
				});
			}
		});
	}

	// 跳转
	skip = (row) => {
		if (row.obligorId) {
			// 资产跟进提醒
			if (row.operateType === 'newAuctionProcessAlert') {
				const { title } = JSON.parse(row.extend);
				const w = window.open('about:blank');
				w.location.href = `#/monitor?process=1&id=${row.obligorId}${title ? `&title=${title}` : ''}`;
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
				w.location.href = `#/monitor?process=1&id=${row.obligorId}${title ? `&title=${title}` : ''}`;
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
	};

	// 行点击操作
	toRowClick = async (record, index) => {
		const { isInstitution, isRead: isReadState } = this.state;
		const { id, isRead } = record;
		const params = {
			idList: [record.id],
		};
		if (!isRead && isInstitution) {
			this.onRefresh({ id, isRead: !isRead, index }, 'isRead');
			const res = await isReadApi(params);
			if (res.code === 200) {
				global.getNoticeNum();
			}
		}
		if (isInstitution && isReadState === 'else') {
			this.getData();
		}
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

		this.getData(params, '', val);
	};


	getData = (data, _isRead, _page) => {
		const { isRead, current } = this.state;
		const params = {
			...data,
			requestSourceType: 1,
			page: _page || current,
			num: 10,
		};
		const __isRead = _isRead || isRead;
		if (__isRead === 'all') { delete params.isRead; }
		if (__isRead === 'else') { params.isRead = false; }
		this.setState({
			loading: true,
		});
		centerList(params).then((res) => {
			const { list, total, page } = res.data;
			if (res.code === 200) {
				this.setState({
					data: list,
					tabTotal: total,
					current: page,
					loading: false,
				});
				if (list.length === 0 && page > 1) {
					this.setState({
						current: page - 1,
						loading: false,
					});
					this.getData('', 'else', page - 1);
				}
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};


	// 全部标记为已读
	handleAllRead = () => {
		const { current } = this.state;
		const params = {};
		centerList({ isRead: false, requestSourceType: 1 }).then((val) => {
			const { total } = val.data;
			if (val.code === 200 && total > 0) {
				Modal.confirm({
					title: '确认将消息标记为已读？',
					content: '点击确定，将为您标记为已读。',
					iconType: 'exclamation-circle',
					onOk() {
						isReadApi(params).then((res) => {
							if (res.code === 200) {
								// 改变首页头部未读数量
								global.getNoticeNum();
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
							} else {
								message.warning(res.message);
							}
						});
					},
					onCancel() {},
				});
			} else {
				message.warning('当前没有未读数据');
			}
		});
	};

	handleReadChange = (val) => {
		this.setState({ isRead: val, current: 1 });
		this.getData({ page: 1 }, val);
	};

	download = (item) => {
		const { total } = JSON.parse(item.extend);
		const token = cookies.get('token');
		DownloadFile(`${baseUrl}${businessFile(total)}?token=${token}`);
	}

	navigateTo = () => {
		if (global.UP_URL) {
			window.location.href = global.UP_URL;
		} else {
			navigate('/');
		}
	}

	render() {
		const {
			columns,
			data,
			tabTotal,
			current,
			loading,
			isInstitution,
			isRead,
		} = this.state;

		return (
			<div className="yc-inform-center">
				<div className="yc-content-wapper">
					<i className="iconfont icon-fanhui yc-page-return" onClick={() => this.navigateTo()} />
					<div className="yc-page-title">消息中心</div>
					<div className="yc-page-line" />
					<div className="yc-table-box">
						<div className="yc-con-item-wrapper">
							<div>
								<Button
									onClick={() => this.handleReadChange('all')}
									title="全部"
									active={isRead === 'all'}
									className="btn-default"
								/>
								<Button
									onClick={() => this.handleReadChange('else')}
									title="只显示未读"
									className="btn-default"
									active={isRead === 'else'}
								/>
								{isInstitution && (
									<div className="yc-con-item-wrapper-btn" onClick={() => this.handleAllRead()}>
										<i className="iconfont icon-quanbubiaoweiyidu yc-con-item-wrapper-btn-icon" />
										<span>全部标为已读</span>
									</div>
								)}
							</div>
						</div>
						<Spin visible={loading}>
							<Table
								// rowSelection={isInstitution && rowSelection}
								columns={columns}
								dataSource={data}
								pagination={false}
								rowKey={record => record.id}
								onRowClick={this.toRowClick}
								emptyType="bell"
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
