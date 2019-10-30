import React from 'react';

export default class OverView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="inquiry-overview">
				<div className="mark-line" />
				<div className="overview-left">
					<span>资产概况</span>
					<hr />
				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<span>风险情况</span>
					<hr />
				</div>
			</div>
		);
	}
}
