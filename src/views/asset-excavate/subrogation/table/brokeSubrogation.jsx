import React from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { timeStandard } from '@/utils';
import {
	Table, SelectedNum, Ellipsis, ClueModal,
} from '@/common';
import { Court } from '@/utils/api/monitor-info/subrogation';

// 获取表格配置
const columns = (props, toOpenHistory) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = {
		sortField,
		sortOrder,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发布日期</span>
				: <SortVessel field="GMT_TRIAL" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>开庭日期</SortVessel>),
			dataIndex: 'gmtTrial',
			width: 172,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '当事人',
			dataIndex: 'parties',
			width: 314,
			render: (text, rowContent) => (
				<React.Fragment>
					<div className="assets-info-content yc-space-nowrap">
						<li>
							<span className="list list-title align-justify">申请人：</span>
							<span className="list list-content" style={{ color: '#186fc7' }}>
								<Ellipsis content={rowContent.projectName} url={rowContent.url} tooltip width={200} isSourceLink />
							</span>
						</li>
						<li>
							<span className="list list-title align-justify">被申请人：</span>
							<span className="list list-content">
								<Ellipsis content={rowContent.administrativeRegion || '-'} tooltip width={200} />
							</span>
						</li>
					</div>
				</React.Fragment>
			),
		}, {
			title: '案件信息',
			dataIndex: 'court',
			width: 291,
			render: (text, rowContent) => (
				<React.Fragment>
					<div className="assets-info-content">
						<li>
							<span className="list list-title align-justify" style={{ width: 60 }}>案号</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{rowContent.regNumber || '-'}</span>
						</li>
						<li>
							<span className="list list-title align-justify" style={{ width: 60 }}>受理法院</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{rowContent.equityAmount || '-'}</span>
						</li>
					</div>
				</React.Fragment>
			),
		}, {
			title: '关联公告',
			dataIndex: 'caseNumber',
			render: rowContent => (
				<React.Fragment>
					<span
						onClick={() => toOpenHistory(rowContent)}
						style={{
							color: '#186fc7', minWidth: '24px', display: 'inline-block', cursor: 'pointer',
						}}
					>
						1
					</span>
				</React.Fragment>
			),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 164,
			render: val => timeStandard(val),
		}, {
			title: '操作',
			unNormal: true,
			className: 'tAlignCenter_important',
			width: 60,
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? Court.unAttention : Court.attention}
					index={index}
				/>
			),
		}];
	// <a href={url} className="click-link">{text || '-'}</a>
	// const base = defaultColumns.filter(item => item.sourceType !== sourceType);
	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

export default class TableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			historyInfoModalVisible: false,
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
			Court.read({ idList: [id] }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		const _selectedRowKeys = record.map(item => item.id);
		console.log(_selectedRowKeys);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	// 点击历史拍卖信息
	toOpenHistory=(source) => {
		const { historyInfoModalVisible } = this.state;
		console.log(historyInfoModalVisible);
		this.setState({
			historyInfoModalVisible: !historyInfoModalVisible,
		});
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, pageSize, isShowPagination = true,
		} = this.props;
		const {
			selectedRowKeys, historyInfoModalVisible,
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
					columns={columns(this.props, this.toOpenHistory)}
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
				{/* 线索弹框 */}
				{
					historyInfoModalVisible && (
					<ClueModal
						onCancel={this.toOpenHistory}
						data={dataSource}
						historyInfoModalVisible={historyInfoModalVisible}
					/>
					)
				}
			</React.Fragment>
		);
	}
}
