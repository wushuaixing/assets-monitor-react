import React, { Component } from 'react';
import { markRead } from '@/utils/api/message';
import '../../style.scss';
import TableAssets from '@/views/asset-excavate/assets-auction/table';
import { acutionRes } from '../../test';
import message from '@/utils/api/message/message';

class Assets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: false,
			maxLength: 5,
			current: 1,
			tableTotal: 22,
			page: 1,
			num: 5,
		};
	}

	componentDidMount() {
		this.toGetData();
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
  	const { obligorId, stationId } = this.props;
  	const { page, num } = this.state;
  	const params = {
  		obligorId,
  		stationId,
  		page,
  		num,
  	};
		 this.setState({
			 loading: true,
		 });
		 message[0].list(params).then().catch();
		 this.setState({
			 dataSource: [],
		 });
		 this.setState({
			 loading: false,
		 });
  };

	// 当前页数变化
	onPageChange = (val) => {
		console.log('val === ', val);
		this.setState({
			page: val,
		});
		this.toGetData();
		// const { onPageChange } = this.props;
		// if (onPageChange)onPageChange();
	};

	render() {
		const {
			title, id, total,
		} = this.props;
		const {
			dataSource, loading, maxLength, current, tableTotal,
		} = this.state;

		const tableProps = {
			maxLength,
			dataSource,
			current,
			noSort: true,
			onPageChange: this.onPageChange,
			onRefresh: this.onRefresh,
			total: tableTotal,
			loading,
		};

		return (
			<React.Fragment>
				{
					dataSource && dataSource.length > 0 && (
						<React.Fragment>
							<div className="messageDetail-table-title" id={id}>
								{title}
								<span className="messageDetail-table-total">{total}</span>
							</div>
							<div className="messageDetail-table-headerLine" />
							<div className="messageDetail-table-container">
								<TableAssets {...tableProps} />
							</div>
						</React.Fragment>
					)
				}
			</React.Fragment>
		);
	}
}

export default Assets;
