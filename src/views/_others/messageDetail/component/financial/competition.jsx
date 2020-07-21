import React, { Component } from 'react';
import { Pagination } from 'antd';
import { Attentions } from '@/common/table';
import { Table } from '@/common';
import { competitonRes } from '../../test';
import { AssetsInfo, AuctionInfo, MatchingReason } from '@/views/asset-excavate/assets-auction/tableComponents';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

// 获取表格配置
const columns = onRefresh => [
	{
		title: '业务信息',
		width: 274,
		render: (text, row) => AssetsInfo(text, row, true, true),
	}, {
		title: '匹配原因',
		dataIndex: 'reason',
		width: 367,
		render: MatchingReason,
	}, {
		title: '拍卖信息',
		width: 392,
		render: AuctionInfo,
	}, {
		title: '操作',
		width: 80,
		unNormal: true,
		className: 'tAlignCenter_important yc-assets-auction-action',
		render: (text, row, index) => (
			<Attentions
				text={text}
				row={row}
				onClick={onRefresh}
				index={index}
				api={row.isAttention ? unFollowSingle : followSingle}
			/>
		),
	}];

class Competition extends Component {
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
			dataSource: competitonRes.data.list,
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

export default Competition;
