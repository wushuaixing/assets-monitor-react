/** tabletree * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================
import Form from 'antd/lib/form';
// import { Button } from '@/components';
import './style.scss';

const createForm = Form.create;

class tableTree extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		return (
			<div className="yc-login-header">
				1
			</div>
		);
	}
}

export default createForm()(tableTree);
