import React, { Component } from 'react';
// import { instrumentRes } from '../../test';
import { markRead } from '@/utils/api/message';
import TableJudgment from '@/views/asset-excavate/subrogation/table/judgment';

class Instrument extends Component {
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
			dataSource: [],
		});
	}

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
				<TableJudgment {...tableProps} />
			</React.Fragment>
		);
	}
}

export default Instrument;