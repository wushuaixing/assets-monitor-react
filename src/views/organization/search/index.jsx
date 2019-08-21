import React from 'react';

import { Icon, Input, Button } from 'antd';
import './style.scss';

export default class BasicTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
		};
	}

	onChange=(val) => {
		this.setState({ data: val.target.value });
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
		const { getTableData, keyword, role } = this.props;
		const params = {
			keyword,
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
		const { placeholder } = this.props;
		return (
			<div className="search-input">
				<Input
					size="large"
					value={data}
					placeholder={placeholder}
					onChange={event => this.onChange(event)}
					{...this.props}
				/>
				{
					this.renderIcon()
				}
				<Button type="ghost" className="search-click" onClick={() => this.onSearch()}>搜索</Button>
			</div>
		);
	}
}
