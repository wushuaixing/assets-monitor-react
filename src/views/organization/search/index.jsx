import React from 'react';

import {
	Icon, Input, Button, Form,
} from 'antd';
import './style.scss';

const createForm = Form.create;
class BasicTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
		};
	}

	onChange=(val) => {
		this.setState({ data: val.target.value });
		val.target.value.replace(/\s+/g, '');
	}

	onClear=() => {
		const { getTableData, clearInput, role } = this.props;
		this.setState({ data: '' });

		const params = {
			role,
		};
		getTableData(params);
		clearInput();
	}

	onSearch=() => {
		const { getTableData, role, form } = this.props;
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		console.log(fields);

		const params = {
			keyword: fields.obligorName,
			role,
			groupId: role,
		};
		getTableData(params);
	}

	renderIcon=() => {
		const { data } = this.state;
		if (data) {
			return (
				<div className="search-icon" onClick={() => this.onClear()}>
					<Icon type="cross-circle" />
				</div>
			);
		}
		return null;
	}

	render() {
		const { data } = this.state;
		const { placeholder, form } = this.props;
		const { getFieldProps } = form;
		return (
			<div className="search-input">
				<Input
					size="large"
					value={data}
					placeholder={placeholder}
					onChange={event => this.onChange(event)}
					{...this.props}
					{...getFieldProps('obligorName', {
						// initialValue: true,
						// rules: [
						// 	{ required: true, whitespace: true, message: '请填写密码' },
						// ],
						getValueFromEvent: e => e.target.value.replace(/\s+/g, ''),
					})}
				/>
				{
					this.renderIcon()
				}
				<Button type="ghost" className="search-click" onClick={() => this.onSearch()}>搜索</Button>
			</div>
		);
	}
}
export default createForm()(BasicTable);
