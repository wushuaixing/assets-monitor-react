import React from 'react';

export default class EquityPenetration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
						股权穿透图
					</div>
				</div>
				<div style={{ height: 400, border: '1px solid #ccc' }} />
			</div>
		);
	}
}
