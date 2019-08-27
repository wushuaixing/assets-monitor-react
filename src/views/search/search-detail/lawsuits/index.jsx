import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { Form } from 'antd';
import './style.scss';

const createForm = Form.create;

class LAWSUITS extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		return (
			<div>
				涉诉
			</div>
		);
	}
}

export default createForm()(LAWSUITS);
