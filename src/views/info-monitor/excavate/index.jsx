import React from 'react';

export default class Excavate extends React.Component {
	constructor(props) {
		super(props);
		document.title = '资产挖掘';
		this.state = {};
	}

	render() {
		return (
			<div className="monitor-excavate-wrapper info-wrapper">
				Excavate:default Text
			</div>
		);
	}
}
