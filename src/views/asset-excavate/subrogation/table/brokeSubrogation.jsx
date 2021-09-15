import React from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { timeStandard } from '@/utils';
import {
	Table, SelectedNum, Ellipsis, ClueModal,
} from '@/common';
import { Broke } from '@/utils/api/monitor-info/subrogation';

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
				: <SortVessel field="GMT_PUBLISH" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'gmtPublish',
			// width: 172,
			render: (text, record) => ReadStatus(timeStandard(text), record),
		}, {
			title: '当事人',
			dataIndex: 'parties',
			// width: 314,
			render: (text, row) => (
				<React.Fragment>
					<div className="assets-info-content yc-space-nowrap">
						<li>
							<span className="list list-title align-justify">申请人：</span>
							<div className="list list-content">
								{
									row.applicants && row.applicants.map(item => (
										<React.Fragment>
											<Ellipsis
												content={item.name}
												tooltip
												width={256}
												url={item.obligorId ? `/#/business/debtor/detail?id=${item.obligorId}` : ''}
											/>
											<br />
										</React.Fragment>
									))
								}
							</div>
						</li>
						<li>
							<span className="list list-title align-justify">被申请人：</span>
							<div className="list list-content">
								 {
									 row.respondents.length > 0 ? row.respondents.map(item => (
										 <React.Fragment>
											 <Ellipsis content={item.name} tooltip width={256} />
											 <br />
										 </React.Fragment>
									 )) : '--'
								 }
							</div>
						</li>
					</div>
				</React.Fragment>
			),
		}, {
			title: '案件信息',
			dataIndex: 'court',
			// width: 291,
			render: (text, row) => (
				<React.Fragment>
					<div className="assets-info-content">
						<li>
							<span className="list list-title align-justify" style={{ width: 60 }}>案号</span>
							<span className="list list-title-colon">：</span>
							<span className="list list-content">{row.caseNumber.replace('（', '(') || '--'}</span>
						</li>
						<li>
							<span className="list list-title align-justify" style={{ width: 60 }}>受理法院</span>
							<span className="list list-title-colon">：</span>
							<span className="list list-content">{row.court || '--'}</span>
						</li>
					</div>
				</React.Fragment>
			),
		}, {
			title: '关联公告',
			dataIndex: 'relateNoticeCount',
			width: 120,
			render: (text, row) => (
				<React.Fragment>
					{
						text > 0 ? (
							<span
								onClick={() => toOpenHistory(row)}
								style={{
									color: '#186fc7', minWidth: '24px', display: 'inline-block', cursor: 'pointer', textAlign: 'center',
								}}
							>
								{text}
							</span>
						) : <div style={{ width: '24px', textAlign: 'center' }}>--</div>
					}
				</React.Fragment>
			),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
			// width: 164,
			render: val => timeStandard(val),
		}, {
			title: '操作',
			unNormal: true,
			className: 'tAlignCenter_important',
			// width: 60,
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? Broke.unAttention : Broke.attention}
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
			dataNotice: '',
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
			Broke.read({ idList: [id] }).then((res) => {
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
		if (source) {
			this.setState({
				historyInfoModalVisible: true,
				dataNotice: source,
			});
		} else {
			this.setState({
				historyInfoModalVisible: !historyInfoModalVisible,
			});
		}
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, pageSize, isShowPagination = true,
		} = this.props;
		const {
			selectedRowKeys, historyInfoModalVisible, dataNotice,
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
						data={dataNotice}
						apiType="message"
						historyInfoModalVisible={historyInfoModalVisible}
					/>
					)
				}
			</React.Fragment>
		);
	}
}
