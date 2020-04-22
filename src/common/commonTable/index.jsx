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
		const { dataSource } = propsObj;
		const isDataSource = propsObj && Array.isArray(dataSource) && dataSource.length > 0;
		return (
			<React.Fragment>
				{isDataSource ? (
					<Table
						{...propsObj}
						locale={{ emptyText: <NoContent /> }}
					/>
				) : null}
			</React.Fragment>
		);
	}
}

export default commonTable;
