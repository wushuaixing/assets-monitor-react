import React, { Component } from 'react';
import { Spin } from '@/common';
import { markRead } from '@/utils/api/message';
import '../../style.scss';
import TableAssets from '@/views/asset-excavate/assets-auction/table';

class Assets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: false,
			maxLength: 5,
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: [],
		});
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, 3000);
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
		const {
			title, id, total,
		} = this.props;
		const {
			dataSource, loading, maxLength,
		} = this.state;

		const tableProps = {
			noSort: true,
			dataSource,
			onPageChange: this.onPageChange,
			onRefresh: this.onRefresh,
			maxLength,
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
