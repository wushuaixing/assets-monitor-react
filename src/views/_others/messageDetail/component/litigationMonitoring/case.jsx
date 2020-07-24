import React, { Component } from 'react';
import { markRead } from '@/utils/api/message';
import TableTrial from '@/views/risk-monitor/lawsuits-monitor/table/trial';
import message from '@/utils/api/message/message';
import { Spin } from '@/common';

class Case extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			current: 1,
			total: 0,
			page: 1,
			num: 5,
			loading: false,
		};
	}

	componentDidMount() {
		this.toGetData();
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

	toGetData = () => {
		const { dataType, stationId, obligorId } = this.props;
		const { page, num } = this.state;
		const reg = new RegExp(dataType);
		const api = message.filter(item => reg.test(item.dataType))[0].list;
		console.log('datatype api === ', api);
		const params = {
			obligorId,
			stationId,
			page,
			num,
		};
		this.setState({
			loading: true,
		});
		api(params).then((res) => {
		}).catch((err) => {
		});
		this.setState({
			loading: false,
		});
		this.setState({
			dataSource: [],
		});
	};

	onPageChange = (val) => {
		this.setState({
			page: val,
		});
		this.toGetData();
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

export default Case;
