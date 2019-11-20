import React from 'react';
import { Table } from 'antd';
import { DishonestInfo, JudgmentInfo, ExecuteInfo } from '@/views/asset-excavate/assets-auction/tableComponents';
// Pagination

// 获取表格配置
const columns = (props) => {
	const {
		normal,
	} = props;
	// onRefresh, onSortChange, sortField, sortOrder, noSort,
	// 含操作等...
	const defaultColumns = [
		{
			title: '判决信息',
			width: 274,
			render: JudgmentInfo,
		}, {
			title: '执行情况',
			dataIndex: 'reason',
			width: 480,
			render: ExecuteInfo,
		}, {
			title: '生效法律文书确定的义务',
			width: 430,
			render: DishonestInfo,
		}];

	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
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
		if ((manage === false && nextProps.manage) || !(nextProps.selectRow || []).length) {
			this.setState({ selectedRowKeys: [] });
		}
	}

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		const _selectedRowKeys = record.map(item => item.id);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(_selectedRowKeys);
	};

	// 跟进点击效果
	// toFollowClick=(source, index) => {
	// 	const _source = source;
	// 	_source.index = index;
	// 	this.setState({
	// 		visible: true,
	// 		source: _source,
	// 	});
	// };

	render() {
		// const { total, current, onPageChange } = this.props;
		const { dataSource, manage } = this.props;
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
					rowClassName={() => 'yc-assets-auction-table-row'}
					columns={columns(this.props, this.toFollowClick)}
					dataSource={dataSource}
					pagination={false}
					onRowClick={this.toRowClick}
					// rowClassName="yc-assets-auction-table-row"
				/>
				<div className="yc-table-pagination">
					{/* <Pagination */}
					{/* showQuickJumper */}
					{/* current={current || 1} */}
					{/* total={total || 0} */}
					{/* onChange={onPageChange} */}
					{/* showTotal={totalCount => `共 ${totalCount} 条信息`} */}
					{/* /> */}
				</div>
			</React.Fragment>
		);
	}
}
