import React from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import {
	readStatus, unFollowSingle, followSingle, relationNotice,
} from '@/utils/api/monitor-info/bankruptcy';
import { linkDom, timeStandard } from '@/utils';
import { Table, SelectedNum } from '@/common';
import RelationNoticeModal from './relation-notice-modal';
import message from '../../../utils/api/message/message';

// 获取表格配置
const columns = (props, openModal) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = {
		sortField,
		sortOrder,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? '最新发布日期'
				: <SortVessel field="GMT_PUBLISH" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>最新发布日期</SortVessel>),
			dataIndex: 'gmtPublish',
			className: 'yc-publish-date',
			width: 115,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '企业 (被申请人)',
			dataIndex: 'obligorName',
			width: 200,
			render: (text, row) => (text ? linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, text) : '-'),
		}, {
			title: '案件信息',
			dataIndex: 'title',
			width: 200,
			render: (text, record) => {
				const { caseNumber = '', court } = record;
				const caseNumberList = caseNumber.split('、');
				const courtList = court.split('、');
				return (
					<ul>
						<li style={{ display: 'flex' }}>
							<div>案号：</div>
							<div>
								{
									caseNumberList.map(i => <p>{i}</p>)
								}
							</div>
						</li>
						<li style={{ display: 'flex' }}>
							<div>受理法院：</div>
							<div>
								{
									courtList.map(i => <p>{i}</p>)
								}
							</div>
						</li>
					</ul>
				);
			},
		},
		{
			title: '公告信息',
			dataIndex: 'title',
			width: 200,
			render: (text, record = {}) => {
				const {
					relateNoticeCount, isShowNotice, title, id, url,
				} = record;
				return (
					<div>
						<div>
							<span>相关公告：</span>
							<span className="cursor-pointer" onClick={() => openModal(id, relateNoticeCount)}>{relateNoticeCount || '-'}</span>
							{
								isShowNotice && <span style={{ background: 'pink' }} className="cursor-pointer">新增公告</span>
							}
						</div>
						<div>
							<span>最新公告：</span>
							<span><a href={url} target="_blank" rel="noreferrer">{title || '-'}</a></span>
						</div>
					</div>
				);
			},
		},
		{
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_MODIFIED" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
			width: 90,
			render: value => <span>{timeStandard(value) || '-'}</span>,
		}, {
			title: '操作',
			width: 55,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					single
					onClick={onRefresh}
					api={row.isAttention ? unFollowSingle : followSingle}
					index={index}
				/>
			),
		}];
	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

export default class TableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			relationNoticeModalVisible: false,
			modalData: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		const { manage } = this.props;
		if ((manage === false && nextProps.manage) || !(nextProps.selectRow || []).length) {
			this.setState({ selectedRowKeys: [] });
		}
	}

	// 行点击操作
	toRowClick = (record, index) => {
		const { id, isRead } = record;
		const { onRefresh, manage } = this.props;
		if (!isRead && !manage) {
			readStatus({ idList: [id] }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys) => {
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	// 打开立案弹框
	openModal = (id, count) => {
		if (count) {
			relationNotice({ id }).then((res) => {
				const { code, data = [] } = res || {};
				if (code === 200) {
					this.setState({ modalData: data }, () => {
						this.setState({	relationNoticeModalVisible: true });
					});
				} else {
					message.error('请求出错');
				}
			});
		}
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			relationNoticeModalVisible: false,
		});
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, pageSize, isShowPagination = true,
		} = this.props;
		const {
			selectedRowKeys, relationNoticeModalVisible, modalData,
		} = this.state;
		const rowSelection = manage ? {
			rowSelection: {
				selectedRowKeys,
				onChange: this.onSelectChange,
			},
		} : null;
		return (
			<React.Fragment>
				{selectedRowKeys && selectedRowKeys.length > 0 ? <SelectedNum num={selectedRowKeys.length} /> : null}
				<Table
					{...rowSelection}
					rowKey={record => record.id}
					columns={columns(this.props, this.openModal)}
					dataSource={dataSource}
					pagination={false}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
				/>
				{dataSource && dataSource.length > 0 && isShowPagination && (
					<div className="yc-table-pagination">
						<Pagination
							showQuickJumper
							pageSize={pageSize || 10}
							current={current || 1}
							total={total || 0}
							onChange={onPageChange}
							showTotal={totalCount => `共 ${totalCount} 条信息`}
						/>
					</div>
				)}
				{relationNoticeModalVisible && (
					<RelationNoticeModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						visible={relationNoticeModalVisible}
						list={modalData}
					/>
				)}
			</React.Fragment>
		);
	}
}
