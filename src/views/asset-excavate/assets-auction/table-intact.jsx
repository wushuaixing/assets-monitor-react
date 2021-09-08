import React from 'react';
import { attentionList } from '@/utils/api/monitor-info/assets';
import { Spin } from '@/common';
import { clearEmpty } from '@/utils';
import Table from './table';
import './style.scss';

export default class TableIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
		};
		this.condition = {
			// isAttention: 1,X
			requestSourceType: 1,
			sortColumn: '',
			sortOrder: '',
			page: 1,
			num: 10,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	// 表格发生变化
	onRefresh=(data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.condition.page = 1;
		this.toGetData();
	};

	// 当前页数变化
	onPageChange=(val) => {
		this.condition.page = val;
		this.toGetData();
		const { onPageChange } = this.props;
		if (onPageChange)onPageChange();
	};

	// 查询数据methods
	toGetData=() => {
		this.setState({ loading: true });
		const { reqUrl, id } = this.props;
		const toApi = reqUrl || attentionList;
		toApi(clearEmpty(this.condition), id).then((res) => {
			const { list, page, total } = res.data;
			if (res.code === 200) {
				this.setState({
					dataSource: list,
					current: page,
					total,
					loading: false,
				});
				// 处理收藏翻页同步问题
				if (list.length === 0 && page > 1) {
					this.condition.page = page - 1;
					this.toGetData();
				}
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({
				loading: false,
			});
		});
	};

	render() {
		const {
			dataSource, current, total, loading,
		} = this.state;
		const { normal, noSort } = this.props;
		const tableProps = {
			noSort,
			normal,
			dataSource,
			current,
			total,
			onRefresh: this.onRefresh,
			onSelect: () => {},
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
			refreshList: this.toGetData,
		};
		return (
			<div className="yc-assets-auction">
				<Spin visible={loading}>
					<Table {...tableProps} />
				</Spin>
			</div>

		);
	}
}
