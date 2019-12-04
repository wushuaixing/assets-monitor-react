import React from 'react';
import { DatePicker } from 'antd';
import './style.scss';

class commonDatePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openModal: false,
		};
	}

	onPlaceholder=() => {
		const { openModal } = this.state;

		if (global.GLOBAL_MEIE_BROWSER) {
			this.setState({
				openModal: !openModal,
			});
		}
	};

	onHandle =() => {
		const { openModal } = this.state;
		this.setState({
			openModal: !openModal,
		});
	};

	render() {
		const propsObj = this.props;
		const { openModal } = this.state;
		return (
			<div
				className="yc-datePicker-container"
				onClick={() => this.onPlaceholder}
			>
				<DatePicker
					{...propsObj}
					toggleOpen={this.onHandle}
					open={openModal}
				/>
				<span
					className={`yc-datePicker-placeholder ${!propsObj.value && global.GLOBAL_MEIE_BROWSER ? '' : 'yc-datePicker-none'}`}
					style={propsObj.placeholder ? { width: propsObj.placeholder.length * 15 } : ''}
				>
					{propsObj.placeholder || '请输入日期'}
				</span>
			</div>
		);
	}
}

export default commonDatePicker;
