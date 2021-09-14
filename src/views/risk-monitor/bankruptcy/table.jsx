import React from 'react';
import { Pagination, Icon } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import {
	readStatus, unFollow, follow, relationNotice, markReadNotice,
} from '@/utils/api/monitor-info/bankruptcy';
import { linkDom, timeStandard } from '@/utils';
import { Table, SelectedNum } from '@/common';
import RelationNoticeModal from './relation-notice-modal';
import CaseInfo from './table-column/case-info';
import message from '../../../utils/api/message/message';
import { Ellipsis } from '@/common';
// 获取表格配置
const columns = (props, openModal, handleAddNotice) => {
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
			width: 140,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '企业 (被申请人)',
			dataIndex: 'obligorName',
			width: 260,
			render: (text, row) => (text
				? <Ellipsis content={text || '-'} url={`/#/business/debtor/detail?id=${row.obligorId}`} width={200} tooltip />
				: '-'),
		}, {
			title: '案件信息',
			dataIndex: 'title',
			width: 280,
			render: (text, record) => {
				const { caseNumber = '', court = '' } = record;
				return <CaseInfo caseNumber={caseNumber} court={court} />;
			},
		},
		{
			title: '公告信息',
			dataIndex: 'title',
			width: 300,
			render: (text, record = {}, index) => {
				const {
					relateNoticeCount, isShowNotice, title, id, url,
				} = record;
				return (
					<div className="notice-info-content">
						<div className="notice-info-content-item">
							<span className="notice-info-content-item-label">相关公告：</span>
							<span className={`notice-info-content-item-num ${relateNoticeCount ? 'cursor-pointer' : ''}`} onClick={() => openModal(id, relateNoticeCount, index, isShowNotice)}>{relateNoticeCount || '无'}</span>
							{
								isShowNotice ? <span className="notice-info-content-item-add">新增公告</span> : null
							}
						</div>
						{
							title ? (
								<div className="notice-info-content-item">
									<span className="notice-info-content-item-label">最新公告：</span>
									<span className="notice-info-content-item-url" onClick={() => handleAddNotice(id, index, isShowNotice)}>
										<Ellipsis content={title} url={url} width="300px" isSourceLink />
									</span>
								</div>
							) : null
						}
					</div>
				);
			},
		},
		{
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_MODIFIED" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
			width: 120,
			render: value => <span>{timeStandard(value) || '-'}</span>,
		}, {
			title: '操作',
			width: 60,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					single={false}
					onClick={onRefresh}
					api={row.isAttention ? unFollow : follow}
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
		const { onRefresh } = this.props;
		if (!isRead) {
			readStatus({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({
						id, isRead: 1, index,
					}, 'isRead');
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

	handleAddNotice= (id, index, isShowNotice) => {
		const { onRefresh } = this.props;
		if (isShowNotice) {
			markReadNotice({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isShowNotice: 0, index }, 'isShowNotice');
				}
			});
		}
	}


	// 打开立案弹框
	openModal = (id, count, index, isShowNotice) => {
		if (count) {
			this.handleAddNotice(id, index, isShowNotice);
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
					columns={columns(this.props, this.openModal, this.handleAddNotice)}
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
