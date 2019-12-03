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
		// const { visible } = propsObj;
		return (
			<span>
				<DatePicker
					ref={e => this.ref = e}
					open={openModal}
					toggleOpen={this.onHandle}
					{...propsObj}
				/>
				<div
					className={`yc-datePicker-placeholder ${!propsObj.value && global.GLOBAL_MEIE_BROWSER ? '' : 'yc-datePicker-none'}`}
					onClick={this.onPlaceholder}
				>
					<span className="yc-datePicker-name" style={{ width: 60 }}>
						{propsObj.placeholder || '请输入日期'}
					</span>
				</div>
			</span>
		);
	}
}

export default commonDatePicker;
