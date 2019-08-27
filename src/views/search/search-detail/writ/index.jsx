import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { Form } from 'antd';
import './style.scss';

const createForm = Form.create;

class WRIT extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		return (
			<div>
				文书
			</div>
		);
	}
}

export default createForm()(WRIT);
