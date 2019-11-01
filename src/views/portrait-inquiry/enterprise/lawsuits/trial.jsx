import React from 'react';
import { Trial } from '@/views/risk-monitor/lawsuits-monitor/table-version';

export default class TrialIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">立案</div>
				</div>
				<div className="inquiry-public-table">
					<Trial />
				</div>
			</div>
		);
	}
}
