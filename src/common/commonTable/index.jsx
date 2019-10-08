import React from 'react';
import { Table } from 'antd';
import NoContent from '@/common/noContent';

class commonTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const propsObj = this.props;

		return (
			<Table
				{...propsObj}
				locale={{ emptyText: <NoContent /> }}
			/>
		);
	}
}

export default commonTable;
