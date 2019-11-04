import React from 'react';
import { Bankruptcy } from '@/views/risk-monitor/operation-risk/table-version';

export default class BankruptcyIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">破产重组</div>
				</div>
				<div className="inquiry-public-table">
					<Bankruptcy />
				</div>
			</div>
		);
	}
}
