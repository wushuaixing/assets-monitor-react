import React, { Component } from 'react';
import { markRead } from '@/utils/api/message';
import TableBankruptcy from '@/views/risk-monitor/bankruptcy/table';
import message from '@/utils/api/message/message';
import { Spin } from '@/common';

class Bankrupt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: false,
			obligorId: props.obligorId,
			page: 1,
			num: 5,
			current: 1,
			total: props.total,
		};
	}

	componentDidMount() {
		this.toGetData();
	}

	componentWillReceiveProps(nextProps) {
		const { obligorId } = this.props;
		if (nextProps.obligorId !== obligorId) {
			this.setState({
				obligorId: nextProps.obligorId,
			}, () => {
				this.toGetData();
			});
		}
	}

	toGetData = () => {
		const { stationId } = this.props;
		const { page, num, obligorId } = this.state;
		// 11001 是message映射的type
		const reg = new RegExp(11001);
		const api = message.filter(item => reg.test(item.dataType))[0].list;
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
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			}
		}).catch((err) => {
			this.setState({
				loading: false,
			});
			console.log('err === ', err);
		});
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

	// 当前页数变化
	onPageChange = (val) => {
		console.log('val === ', val);
		this.setState({
			page: val,
		});
		this.toGetData();
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

	render() {
		const { id, title } = this.props;
		const {
			dataSource, loading, total, current,
		} = this.state;
		const tableProps = {
			current,
			noSort: true,
			dataSource,
			onRefresh: this.onRefresh,
			onPageChange: this.onPageChange,
			maxLength: 5,
			total,
		};
		return (
			<React.Fragment>
				<div className="messageDetail-table-title" id={id}>
					{title}
					<span className="messageDetail-table-total">{total}</span>
				</div>
				<div className="messageDetail-table-headerLine" />
				<div className="messageDetail-table-container">
					<Spin visible={loading}>
						<TableBankruptcy {...tableProps} />
					</Spin>
				</div>
			</React.Fragment>

		);
	}
}
export default Bankrupt;
