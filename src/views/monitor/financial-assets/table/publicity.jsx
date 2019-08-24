import React from 'react';
import { Table, Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { attention, readStatus } from '@/utils/api/monitor-info/monitor';

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh } = props;

	// 含操作等...
	const defaultColumns = [
		{
			title: <span style={{ paddingLeft: 11 }}>起始日期</span>,
			dataIndex: 'startTime',
			render: (text, record) => ReadStatus(text ? new Date(text * 1000).format('yyyy-MM-dd') : '--', record),
		}, {
			title: '相关单位',
			dataIndex: 'obligorName',
			width: 150,
		}, {
			title: '项目名称',
			dataIndex: 'title',
			width: 150,
		}, {
			title: '挂拍价格',
			dataIndex: 'price',
		}, {
			title: '期满日期',
			dataIndex: 'endTime',
			render: value => <span>{value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'}</span>,
		}, {
			title: '更新日期',
			dataIndex: 'updateTime',
			render: value => <span>{value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'}</span>,
		}, {
			title: '操作',
			className: 'tAlignCenter_important',
			render: (text, row, index) => <Attentions text={text} row={row} onClick={onRefresh} api={attention} index={index} />,
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
						showTotal={totalCount => `共 ${totalCount} 条`}
					/>
				</div>
			</React.Fragment>
		);
	}
}
