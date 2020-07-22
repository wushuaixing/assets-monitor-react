import React, { Component } from 'react';
// import { subrogationRes } from '../../test';
import { markRead } from '@/utils/api/message';
import TableTrial from '@/views/asset-excavate/subrogation/table/trial';
import { Spin } from '@/common';

class SubrogationRights extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			current: 1,
			total: 0,
			loading: false,
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: [],
		});
	}

	// 当前页数变化
	onPageChange = (val) => {
		this.condition.page = val;
		this.toGetData();
		const { onPageChange } = this.props;
		if (onPageChange)onPageChange();
	};

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

	toGetData = () => {
	};


	render() {
		const {
			dataSource, current, total, loading,
		} = this.state;
		const tableProps = {
			noSort: true,
			dataSource,
			onRefresh: this.onRefresh,
			onPageChange: this.onPageChange,
			maxLength: 5,
			current,
			total,
		};
		return (
			<React.Fragment>
				<Spin visible={loading}>
					<TableTrial {...tableProps} />
				</Spin>
			</React.Fragment>
		);
	}
}

export default SubrogationRights;
