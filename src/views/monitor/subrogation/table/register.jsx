import React from 'react';
import { Table, Pagination, Modal } from 'antd';
import {
	ReadStatus, Attentions, TitleIcon, SortVessel,
} from '@/common/table';
import { attention, readStatus } from '@/utils/api/monitor-info/monitor';

// 关联连接 组件
const aboutLink = (value, row) => {
	const toShow = (source) => {
		Modal.info({
			title: '本案号关联多个立案链接，如下：',
			okText: '确定',
			iconType: 'null',
			width: 600,
			content: (
				<div style={{ marginLeft: -28 }}>
					{
						source.map(item => (
							<p style={{ margin: 5 }}>
								<a href={item} className="click-link" target="_blank" rel="noopener noreferrer">{item}</a>
							</p>
						))
					}
				</div>
			),
			onOk() {},
		});
	};
	if (row.isDeleted) return null;

	const La = (value.filter(item => item.sourceType === 1))[0];
	const Kt = (value.filter(item => item.sourceType === 2))[0];
	const Ws = (value.filter(item => item.sourceType === 3))[0];
	// console.log(La, Kt, Ws);
	const resContent = [];
	if (La && La.url.length) {
		if (La.url.length > 1) {
			resContent.push(<span className="click-link" onClick={() => toShow(La.url)}>立案</span>);
		}
		resContent.push(<a href={La.url[0]} className="click-link" target="_blank" rel="noopener noreferrer">立案</a>);
	}
	if (Kt && Kt.url.length) {
		if (resContent.length)resContent.push(<span className="info-line">|</span>);
		if (Kt.url.length > 1) {
			resContent.push(<span className="click-link" onClick={() => toShow(Kt.url)}>开庭</span>);
		}
		resContent.push(<a href={Kt.url[0]} className="click-link" target="_blank" rel="noopener noreferrer">开庭</a>);
	}
	if (Ws && Ws.url.length) {
		if (resContent.length)resContent.push(<span className="info-line">|</span>);
		if (Ws.url.length > 1) {
			resContent.push(<span className="click-link" onClick={() => toShow(Ws.url)}>文书</span>);
		}
		resContent.push(<a href={Ws.url[0]} className="click-link" target="_blank" rel="noopener noreferrer">文书</a>);
	}
	return resContent;
};

// 获取表格配置
const columns = (props) => {
	const {
		normal, onRefresh, sourceType, onSortChange, sortField, sortOrder,
	} = props;
	const sort = {
		sortField,
		sortOrder,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: <SortVessel field="larq" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>立案日期</SortVessel>,
			dataIndex: 'larq',
			width: 111,
			render: (text, record) => ReadStatus(text ? new Date(text * 1000).format('yyyy-MM-dd') : '--', record),
		}, {
			title: <SortVessel field="yg" onClick={onSortChange} {...sort}>原告</SortVessel>,
			dataIndex: 'yg',
			render: text => text || '--',
		}, {
			title: <TitleIcon title="被告" tooltip="我行债务人" />,
			dataIndex: 'bg',
			render: (text, row) => (
				row.isDeleted ? text : <a href={`/#/monitor/business/detail?id=${row.obligorId}`} className="click-link" target="_blank" rel="noopener noreferrer">{text}</a>),
		}, {
			title: '法院',
			dataIndex: 'court',
			render: text => text || '--',
		}, {
			title: '案号',
			dataIndex: 'ah',
			render: (content, row) => (
				row.isDeleted ? content : (
					<span
						className="click-link"
						onClick={() => {
							Modal.info({
								title: '当事人详情',
								okText: '确定',
								iconType: 't',
								content: (
									<div style={{ marginLeft: -28 }}>
										{
										row.ygList && row.ygList.map(item => (
											<p style={{ margin: 5, fontSize: 14 }}>
												<strong>原告：</strong>
												<span>{item}</span>
											</p>
										))
									}
										{
										row.bgList && row.bgList.map(item => (
											<p style={{ margin: 5, fontSize: 14 }}>
												<strong>被告：</strong>
												<span>{item}</span>
											</p>
										))
									}
									</div>
								),
								onOk() {},
							});
						}}
					>
						{content}
					</span>
				)
			),
		}, {
			title: '案由',
			dataIndex: 'anyou',
			sourceType: 1,
			render: text => text || '--',
			// render: content => <span>{content}</span>,
		}, {
			title: '关联信息',
			dataIndex: 'associatedInfo',
			className: 'tAlignCenter_important',
			render: aboutLink,
		}, {
			title: '更新日期',
			dataIndex: 'updateTime',
			width: 111,
			render: value => <span>{value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'}</span>,
		}, {
			title: '操作',
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => <Attentions text={text} row={row} onClick={onRefresh} api={attention} index={index} />,
		}];
	// <a href={url} className="click-link">{text || '--'}</a>
	const base = defaultColumns.filter(item => item.sourceType !== sourceType);
	return normal ? base.filter(item => !item.unNormal) : base;
};

export default class TableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		const { manage } = this.props;
		if (manage === false && nextProps.manage) {
			this.setState({ selectedRowKeys: [] });
		}
	}

	// 行点击操作
	toRowClick = (record, index) => {
		const { id, isRead } = record;
		const { onRefresh } = this.props;
		if (!isRead) {
			readStatus({ idList: [id] }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		// console.log(selectedRowKeys, record);
		const _selectedRowKeys = record.map(item => item.id);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(_selectedRowKeys);
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange,
		} = this.props;
		const {
			selectedRowKeys,
		} = this.state;
		const rowSelection = manage ? {
			rowSelection: {
				selectedRowKeys,
				onChange: this.onSelectChange,
			},
		} : null;
		return (
			<React.Fragment>
				<Table
					{...rowSelection}
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
				/>
				<div className="yc-table-pagination">
					<Pagination
						showQuickJumper
						current={current || 1}
						total={total || 0}
						onChange={onPageChange}
						showTotal={totalCount => `共 ${totalCount} 条`}
					/>
				</div>
			</React.Fragment>
		);
	}
}
