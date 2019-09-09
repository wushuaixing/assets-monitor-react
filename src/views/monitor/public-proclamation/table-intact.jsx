import React from 'react';
import TableBid from './table/bid';
import TableIllegal from './table/illegal';
import TablePunish from './table/punish';
import { Spin } from '@/common';
import { clearEmpty } from '@/utils';
import Api from '@/utils/api/monitor-info/public';

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
			field: '',
			order: '',
			page: 1,
			num: 10,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	componentWillReceiveProps(nextProps) {
		const { sourceType } = this.props;
		if (sourceType !== nextProps.sourceType) {
			this.condition.field = '';
			this.condition.order = '';
			this.condition.sourceType = nextProps.sourceType;
			this.setState({
				dataSource: '',
				current: 1,
				total: 0,
			});
			this.toGetData(nextProps.sourceType);
		}
	}

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.field = field;
		this.condition.order = order;
		this.toGetData();
	};

	// 当前页数变化
	onPageChange=(val) => {
		this.condition.page = val;
		this.toGetData();
	};

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

	// 查询数据methods
	toGetData=(_sourceType) => {
		this.setState({ loading: true });
		const { sourceType, reqUrl } = this.props;
		const type = _sourceType || sourceType;
		let toApi = '';
		if (type === 1)toApi = Api.focusListBid;
		if (type === 2)toApi = Api.focusListIllegal;
		if (type === 3)toApi = Api.focusListPunish;
		toApi = reqUrl || Api.focusListBid;
		toApi(clearEmpty(this.condition)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: [],
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

	// 获取DOM
	toGetDOM=(type) => {
		if (type === 1) return TableBid;
		if (type === 2) return TableIllegal;
		if (type === 3) return TablePunish;
		return TableBid;
	};

	render() {
		const {
			dataSource, current, total, loading,
		} = this.state;
		const { sourceType, normal } = this.props;
		const tableProps = {
			normal,
			manage: false,
			dataSource,
			current,
			total,
			onRefresh: this.onRefresh,
			onSelect: () => {},
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sourceType: this.condition.sourceType,
			sortField: this.condition.field,
			sortOrder: this.condition.field,
		};
		const DOM = this.toGetDOM(sourceType);
		return (
			<div className="yc-assets-auction">
				<Spin visible={loading}>
					<DOM {...tableProps} key={sourceType} />
				</Spin>
			</div>

		);
	}
}
