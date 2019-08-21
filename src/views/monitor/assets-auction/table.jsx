import React from 'react';
import { Table, Pagination } from 'antd';
import { Attentions } from '@/common/table';
import { attention } from '@/utils/api/monitor-info/assets';


// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh } = props;

	// 含操作等...
	const defaultColumns = [
		{
			title: '资产信息',
			dataIndex: 'larq',
			width: 274,
			// render: (text, record) => ReadStatus(text ? new Date(text * 1000).format('yyyy-MM-dd') : '--', record),
		}, {
			title: '匹配原因',
			dataIndex: 'reason',
			width: 367,
		}, {
			title: '拍卖信息',
			dataIndex: 'bg',
			width: 392,
		}, {
			title: '操作',
			width: 127,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<React.Fragment>
					<Attentions text={text} row={row} onClick={onRefresh} api={attention} index={index} />
				</React.Fragment>
			),
		}];
	// 单纯展示
	const normalColumns = [
		{
			title: '立案日期',
			dataIndex: 'larq',
		}, {
			title: '原告',
			dataIndex: 'yg',
		}, {
			title: '被告',
			dataIndex: 'bg',
		}, {
			title: '法院',
			dataIndex: 'court',
		}, {
			title: '案号',
			dataIndex: 'ah',
		}, {
			title: '关联信息',
			dataIndex: 'associateInfo',
		}, {
			title: '更新日期',
			dataIndex: 'updateTime',
		}];
	return normal ? normalColumns : defaultColumns;
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

	// // 行点击操作
	// toRowClick = (record, index) => {
	// 	const { id, isRead } = record;
	// 	const { onRefresh } = this.props;
	// 	if (!isRead) {
	// 		readStatus({ idList: [id] }).then((res) => {
	// 			if (res.code === 200) {
	// 				onRefresh({ id, isRead: !isRead, index }, 'isRead');
	// 			}
	// 		});
	// 	}
	// };

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
		const { selectedRowKeys } = this.state;
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
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold')}
					onRowClick={this.toRowClick}
				/>
				<div className="yc-table-pagination">
					<Pagination
						showQuickJumper
						current={current || 1}
						total={total || 0}
						onChange={onPageChange}
					/>
				</div>
			</React.Fragment>
		);
	}
}
