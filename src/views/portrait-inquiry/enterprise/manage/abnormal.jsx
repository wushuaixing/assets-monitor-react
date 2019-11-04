import React from 'react';
import { Abnormal } from '@/views/risk-monitor/operation-risk/table-version';

export default class AbnormalIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">经营异常</div>
				</div>
				<div className="inquiry-public-table">
					<Abnormal />
				</div>
			</div>
		);
	}
}
