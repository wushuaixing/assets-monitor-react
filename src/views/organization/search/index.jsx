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
		this.setState({ data: '' });
	}

	onSearch=() => {
		const { data } = this.state;
		const { onSearch } = this.props;
		onSearch(data);
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
				/>
				{
					this.renderIcon()
				}
				<Button type="ghost" className="search-click" onClick={() => this.onSearch()}>搜索</Button>
			</div>
		);
	}
}
