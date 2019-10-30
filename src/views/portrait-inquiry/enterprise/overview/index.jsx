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
					<div style={{ height: 999 }} />
				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<span>涉诉情况</span>
					<hr />
					<div style={{ height: 333 }} />
					<div className="mark-line" />
					<span>经营风险</span>
					<hr />
					<div style={{ height: 444 }} />
					<div className="mark-line" />
					<span>工商基本信息</span>
					<hr />
					<div style={{ height: 555 }} />
				</div>
			</div>
		);
	}
}
