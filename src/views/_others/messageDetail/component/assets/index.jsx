import React, { Component } from 'react';
import '../../style.scss';
import TableAssets from '@/views/asset-excavate/assets-auction/table';
import message from '@/utils/api/message/message';
import { Spin } from '@/common';

class Assets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: false,
			current: 1,
			page: 1,
			num: 5,
			obligorId: props.obligorId,
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

	// 表格发生变化
	onRefresh = (data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	toGetData = () => {
		const { stationId } = this.props;
		const { page, num, obligorId } = this.state;
		const reg = new RegExp(11101);
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

	render() {
		const { title, id } = this.props;
		const {
			dataSource, loading, current, total,
		} = this.state;
		const tableProps = {
			dataSource,
			current,
			noSort: true,
			onPageChange: this.onPageChange,
			onRefresh: this.onRefresh,
			total,
			isShowPagination: total > 5,
			pageSize: 5,
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
						<TableAssets {...tableProps} />
					</Spin>
				</div>
			</React.Fragment>
		);
	}
}

export default Assets;
