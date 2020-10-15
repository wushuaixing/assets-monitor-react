import React, { Component } from 'react';
import { markRead } from '@/utils/api/message';
import TableUnBlock from '@/views/asset-excavate/seized-unblock/table/table-intact';
import message from '@/utils/api/message/message';
import { Spin } from '@/common';


class UnBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: false,
			obligorId: props.obligorId,
			page: 1,
			num: 5,
			total: props.total,
			current: 1,
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
		const reg = new RegExp(11301);
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

	onPageChange = (val) => {
		this.setState({
			page: val,
		}, () => {
			this.toGetData();
		});
	};

	// 表格变化，刷新表格
	onRefresh=(data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		console.log('_dataSource === ', _dataSource);
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

	render() {
		const { id, title } = this.props;
		const {
			dataSource, total, loading, current,
		} = this.state;
		const tableProps = {
			current,
			total,
			noSort: true,
			dataSource,
			onRefresh: this.onRefresh,
			onPageChange: this.onPageChange,
			isShowPagination: total > 5,
			pageSize: 5,
		};
		return (
			<React.Fragment>
				<div className="messageDetail-table-title" id={id}>
					{title}
					<span className="messageDetail-table-total">{total}</span>
				</div>
				<div className="messageDetail-table-container">
					<Spin visible={loading}>
						<TableUnBlock {...tableProps} />
					</Spin>
				</div>
			</React.Fragment>
		);
	}
}
export default UnBlock;