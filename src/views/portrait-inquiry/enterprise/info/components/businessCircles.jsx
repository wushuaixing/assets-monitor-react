import React from 'react';
import './style.scss';

export default class BusinessCircles extends React.Component {
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
                    工商变更
					</div>
				</div>
			</div>
		);
	}
}
