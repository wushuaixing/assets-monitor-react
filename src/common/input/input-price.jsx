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

// const formatMoney = (str, number) => {
// 	const n = number > 0 && number <= 20 ? number : 2;
// 	const s = `${parseFloat((`${str}`).replace(/[^\d.-]/g, '')).toFixed(n)}`;
// 	const l = s.split('.')[0].split('').reverse();
// 	const r = s.split('.')[1];
// 	let t = '';
// 	for (let i = 0; i < l.length; i += 1) {
// 		t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
// 	}
// 	return `${t.split('').reverse().join('')}.${r}`;
// };

class comInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			focus: false,
		};
	}

	onChange=() => {

	};

	onFocus=() => {
		this.setState({
			focus: true,
		});
	};

	onBlur=() => {
		console.log('onBlur');
		this.setState({
			focus: false,
		});
	};

	render() {
		const {
			style, className, defaultValue, value,
		} = this.props;
		const {
			size, disabled, suffix, title,
		} = this.props;
		const { inputValue, focus } = this.state;
		const classList = ['yc-price'];

		if (size) classList.push(size ? `yc-input-${size}` : '');
		if (className)classList.push(className);
		if (disabled)classList.push('yc-input-disabled');
		/* 当为IE时绑定onChange方法，非IE时绑定onInput */
		// const inputChange = { onChange: this.onInputChange };
		const inputChange = global.GLOBAL_MEIE_BROWSER ? {
		} : {
			onInput: this.onChange,
		};

		const _value = inputValue || value || defaultValue || '';
		// if (money) {
		// 	if (value && !inputValue) {
		// 		_value = !Number.isNaN(_value) ? formatMoney(_value, decimal) : formatMoney(_value, decimal)
		// 	}
		// }
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
					type="number"
					ref={e => this.ref1 = e}
					className={classList.join(' ')}
					autoComplete="off"
					disabled={disabled || false}
					value={_value}
					placeholder="最低价"
					onChange={e => this.onChange(e, 'input1')}
					onBlur={this.onBlur}
					onFocus={this.onFocus}
				/>
				{
					suffix ? (
						<div className="yc-input-price-text">
							<span>{`${suffix} -`}</span>
						</div>
					) : ''
				}
				<input
					type="number"
					ref={e => this.ref2 = e}
					className={classList.join(' ')}
					autoComplete="off"
					disabled={disabled || false}
					value={_value}
					placeholder="最高价"
					{...inputChange}
					onBlur={this.onBlur}
					onFocus={this.onFocus}
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
	clear: PropTypes.bool,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onSelect: PropTypes.func,
	getPopupContainerClassName: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.element,
	defaultValue: PropTypes.string,
};

comInput.defaultProps = {
	clear: false,
	onBlur: () => {},
	onChange: () => {},
	onSelect: () => {},
	getPopupContainerClassName: null,
	placeholder: '请选择',
	className: null,
	children: null,
	defaultValue: null,
};

export default comInput;
