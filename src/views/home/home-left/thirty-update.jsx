import React, { PureComponent } from 'react';
import DynamicTab from '../components/tab-checked';
import './style.scss';

class thirtyUpdate extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		return (
			<div>
				<DynamicTab />
			</div>
		);
	}
}

export default thirtyUpdate;
