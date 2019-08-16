/*!
 * input v1.1.2
 * 公共组件input
 *
 * @author async
 * 2019.06.24
 */
import React from 'react';
import PropTypes from 'reactPropTypes';
import './index.scss';

class comInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value1: '',
			value2: '',
			focus: false,
		};
	}

	onChange=(event, field) => {
		// const { value1 } = this.state;
		this.setState({
			[field]: event.target.value,
		});
	};

	onFocus=() => {
		this.setState({
			focus: true,
		});
	};

	onBlur=() => {
		// console.log('onBlur');
		this.setState({
			focus: false,
		});
	};

	render() {
		const {
			size, disabled, suffix, title, style, inputFirstProps, inputSecondProps,
		} = this.props;
		const f = inputFirstProps;
		const s = inputSecondProps;
		console.log(inputFirstProps);
		const { focus, value1, value2 } = this.state;
		const classList = ['yc-price'];
		if (size) classList.push(size ? `yc-input-${size}` : '');
		if (disabled)classList.push('yc-input-disabled');
		/* 当为IE时绑定onChange方法，非IE时绑定onInput */
		// const inputChange = { onChange: this.onInputChange };
		return (
			<div className={`yc-input-price ${focus ? 'yc-input-price-focus' : 'yc-input-price-normal'}`} style={style}>
				{
					title ? (
						<div className="yc-input-price-text">
							<span style={{ width: 70 }}>{title}</span>
						</div>
					) : ''
				}
				<div className="yc-split-line" style={{ height: 20, marginTop: 6 }} />
				<input
					type="text"
					className={classList.join(' ')}
					autoComplete="off"
					disabled={disabled || false}
					placeholder="最低价"
					value={(f.onChange ? f.value : value1) || f.defaultValue || ''}
					onChange={e => this.onChange(e, 'value1')}
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					{...inputFirstProps}
				/>
				{
					suffix ? (
						<div className="yc-input-price-text">
							<span>{`${suffix} -`}</span>
						</div>
					) : ''
				}
				<input
					type="text"
					className={classList.join(' ')}
					autoComplete="off"
					disabled={disabled || false}
					value={(s.onChange ? s.value : value2) || s.defaultValue || ''}
					placeholder="最高价"
					onChange={e => this.onChange(e, 'value2')}
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					{...inputSecondProps}
				/>
				{
					suffix ? (
						<div className="yc-input-price-text">
							<span>{suffix}</span>
						</div>
					) : ''
				}
			</div>
		);
	}
}
comInput.propTypes = {
	inputFirstProps: PropTypes.obj,
	inputSecondProps: PropTypes.obj,
	onChange: PropTypes.func,
	onSelect: PropTypes.func,
	placeholder: PropTypes.string,
};

comInput.defaultProps = {
	inputFirstProps: {},
	inputSecondProps: {},
	onChange: () => {},
	onSelect: () => {},
	placeholder: '请选择',
};

export default comInput;
