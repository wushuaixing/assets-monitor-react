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

const formatMoney = (str, number) => {
	const n = number > 0 && number <= 20 ? number : 2;
	const s = `${parseFloat((`${str}`).replace(/[^\d.-]/g, '')).toFixed(n)}`;
	const l = s.split('.')[0].split('').reverse();
	const r = s.split('.')[1];
	let t = '';
	for (let i = 0; i < l.length; i += 1) {
		t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
	}
	return `${t.split('').reverse().join('')}.${r}`;
};

class comInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			oldValue: '',
		};
	}

	componentDidMount() {
		if (global.GLOBAL_MEIE_BROWSER) {
			window._addEventListener(this.ref, 'keyup', this.onChange);
		}
	}

	componentWillUnmount() {
		if (global.GLOBAL_MEIE_BROWSER) {
			window._removeEventListener(this.ref, 'keyup', this.onChange);
		}
	}

	onChange=() => {
		const str = this.ref.value;
		this.setState({
			inputValue: str,
		});
		const { onChange } = this.props;
		onChange(str);
	};

	onFocus=() => {
		const { money } = this.props;
		const str = this.ref.value;
		const value = money ? str.replace(/$s?|(,*)/g, '') : str;
		if (money) {
			this.ref.value = value;
		}
		this.setState({
			oldValue: str,
		});
	};

	onBlur=() => {
		// console.log('onBlur');
		const { money, onChange, decimal } = this.props;
		// 上次的结果
		const { oldValue } = this.state;

		const __oldValue = oldValue.replace(/$s?|(,*)/g, '');
		const oldValueObj = {
			val: oldValue,
			isEmpty: oldValue === '',
			number: Number(Number(__oldValue).toFixed(decimal || 0)),
			isNaN: Number.isNaN(Number(__oldValue)),
		};

		if (money) {
			const str = this.ref.value;
			const __str = str.replace(/$s?|(,*)/g, '');
			const valueObj = {
				val: str,
				isEmpty: !str,
				number: Number(Number(__str).toFixed(decimal || 0)),
				isNaN: Number.isNaN(Number(__str)),
			};
			// console.log(oldValueObj, valueObj);

			const result = {
				output: '',
				input: '',
			};
			if (valueObj.isEmpty) {
				result.output = undefined;
				result.input = '';
			} else if (valueObj.isNaN) {
				result.output = oldValueObj.number;
				result.input = formatMoney(oldValueObj.number, decimal || 0);
			} else {
				result.output = valueObj.number;
				result.input = formatMoney(valueObj.number, decimal || 0);
			}

			onChange(result.output);
			this.setState({
				inputValue: result.input,
			});
			// return false;
		}
	};

	render() {
		const {
			style, className, placeholder, defaultValue, value, money, decimal, onChange, onKeyDown, titleWidth,
		} = this.props;
		// console.log(this.props);
		const {
			size, disabled, suffix, title,
		} = this.props;
		const { inputValue } = this.state;
		const classList = ['yc-input'];
		if (size) classList.push(size ? `yc-input-${size}` : '');
		if (className)classList.push(className);
		if (disabled)classList.push('yc-input-disabled');

		/* 当为IE时绑定onChange方法，非IE时绑定onInput */
		// const inputChange = { onChange: this.onInputChange };
		const inputChange = global.GLOBAL_MEIE_BROWSER ? {
		} : {
			onInput: this.onChange,
		};
		/*	:formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
	:parser="value => value.replace(/$s?|(,*)/g, '')" */
		if (suffix) { classList.push('yc-input-right'); }
		if (title) { classList.push('yc-input-left'); }
		// console.log(inputValue, 1, value, 2, defaultValue);
		let __value = value;
		if (money) {
			__value = value || value === 0 ? formatMoney(value, decimal || 0) : value;
		}
		const	_value = (onChange ? __value : inputValue) || defaultValue || '';
		// if (money) {
		// 	if (value && !inputValue) {
		// 		_value = !Number.isNaN(_value) ? formatMoney(_value, decimal) : formatMoney(_value, decimal)
		// 	}
		// }
		// console.log(this.ref ? this.ref.value : '');
		return (
			<div className="yc-input-wrapper" style={style}>
				{
					title ? (
						<div className="yc-input-group-left" style={titleWidth ? { width: titleWidth } : ''}>
							<span style={titleWidth ? { width: titleWidth - 2 } : ''}>{title}</span>
							<div className="yc-split-line" />
						</div>
					) : ''
				}
				{
					!_value && global.GLOBAL_MEIE_BROWSER
						? <div className="yc-placeholder" style={{ paddingLeft: titleWidth ? { paddingLeft: titleWidth + 7 } : 78 }}>{placeholder || '请输入'}</div> : null
				}
				<input
					style={titleWidth ? { paddingLeft: titleWidth + 7 } : ''}
					type="text"
					ref={e => this.ref = e}
					className={classList.join(' ')}
					autoComplete="off"
					value={_value}
					disabled={disabled || false}
					placeholder={placeholder || '请输入'}
					{...inputChange}
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					onKeyDown={onKeyDown}
				/>
				{
					suffix ? (
						<div className="yc-input-group-right">
							<div className="yc-split-line" />
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
