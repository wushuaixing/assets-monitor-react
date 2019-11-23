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
		const { visible } = propsObj;
		console.log(propsObj, visible);

		return (
			<Table
				{...propsObj}
				locale={visible === false ? { emptyText: <NoContent /> } : { emptyText: '' }}
			/>
		);
	}
}

export default commonTable;
