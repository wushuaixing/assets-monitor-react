import React from 'react';
import { Judgment } from '@/views/risk-monitor/lawsuits-monitor/table-version';

export default class JudgmentIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">涉诉文书</div>
				</div>
				<div className="inquiry-public-table">
					<Judgment />
				</div>
			</div>
		);
	}
}
