import React from 'react';
import Table from '@/views/asset-excavate/assets-auction/table-version';
import { toGetNumber } from '@/utils/promise';

const fakeData = [{ id: 10701, data: 20 }];

export default class Auction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(fakeData, 10701),
		};
	}

	render() {
		const { count } = this.state;
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`招投标 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Table />
				</div>
			</div>
		);
	}
}
