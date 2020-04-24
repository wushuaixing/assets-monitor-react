import React from 'react';

export default class Risk extends React.Component {
	constructor(props) {
		super(props);
		document.title = '风险监控';
		this.state = {};
	}

	render() {
		return (
			<div className="monitor-risk-wrapper info-wrapper">
				Risk:default Text
			</div>
		);
	}
}
