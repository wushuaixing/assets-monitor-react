import React from 'react';
import { toGetNumber } from '@/utils/promise';

export default class Dishonest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 30801),
		};
	}

	render() {
		const { id } = this.props;
		const { count } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`失信记录 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">default text</div>
			</div>
		);
	}
}
