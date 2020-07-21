import React, { Component } from 'react';
import { Pagination } from 'antd';
import { Attentions } from '@/common/table';
import { Table } from '@/common';
import { publicRes } from '../../test';
import { AssetsInfo, ListingInfo, ProjectInfo } from '@/views/asset-excavate/assets-auction/tableComponents';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

// 获取表格配置
const columns = onRefresh => [
	{
		title: '业务信息',
		width: 400,
		render: (text, row) => AssetsInfo(text, row, true, true),
	},
	{
		title: '项目信息 ',
		width: 300,
		render: (text, row) => ProjectInfo(text, row, true, true),
	},
	{
		title: '挂牌信息',
		width: 300,
		render: (text, row) => ListingInfo(text, row, true, true),
	},
	{
		title: '操作',
		width: 60,
		unNormal: true,
		className: 'tAlignCenter_important',
		render: (text, row, index) => (
			<Attentions
				text={text}
				row={row}
				onClick={onRefresh}
				api={row.isAttention ? unFollowSingle : followSingle}
				index={index}
			/>
		),
	}];

class PubilcProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			current: 1,
			total: 0,
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: publicRes.data.list,
		});
	}

	// 表格变化，刷新表格
	onRefresh = (data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	toRowClick = (record, index) => {
		const { id, isRead } = record;
		if (!isRead) {
			markRead({ id }).then((res) => {
				if (res.code === 200) {
					this.onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	onPageChange = () => {

	};

	render() {
		const { dataSource, current, total } = this.state;
		return (
			<React.Fragment>
				<Table
					rowKey={record => record.id}
					columns={columns(this.onRefresh)}
					dataSource={dataSource}
					pagination={false}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
				/>
				{dataSource && dataSource.length > 5 && (
					<div className="yc-table-pagination">
						<Pagination
							showQuickJumper
							current={current || 1}
							total={total || 0}
						/>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default PubilcProject;
