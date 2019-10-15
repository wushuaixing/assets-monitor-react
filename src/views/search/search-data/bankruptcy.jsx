import React from 'react';
import {
	DatePicker, Button, Form, message,
} from 'antd';
import { navigate } from '@reach/router';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import { Input, timeRule } from '@/common';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 116 };
class BANKRUPTCY extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: '',
			endTime: '',
		};
	}

	componentDidMount() {
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/yc-input-wrapper/.test(className)) {
				this.search();
				document.activeElement.blur();
			}
		}
	};

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const { startTime, endTime } = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.publishStart = startTime;
		fildes.publishEnd = endTime;

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/writ', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		this.setState({
			startTime: undefined,
			endTime: undefined,
		});
		resetFields('');
	}

	render() {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		return (
			<div className="yc-tabs-data">
				<div className="yc-tabs-items">
					<div className="item" style={{ marginRight: 16, width: 243 }}>
						<Input
							title="案号"
							placeholder="案件编号"
							{...getFieldProps('ah', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ marginRight: 16, width: 243 }}>
						<Input
							title="案由"
							placeholder="案件内容提要"
							{...getFieldProps('reason', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ width: 243 }}>
						<Input
							title="起诉法院"
							placeholder="法院名称"
							{...getFieldProps('court', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
				</div>
				<div className="other">
					<span>发布日期：</span>
					<DatePicker
						placeholder="开始日期"
						size="large"
						style={_style1}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('publishEnd'))}
						{...getFieldProps('publishStart', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									startTime: dateString,
								});
							},
						})}
						allowClear
					/>
					<span style={{ margin: '0 2px ' }}>至</span>
					<DatePicker
						placeholder="结束日期"
						size="large"
						style={_style1}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('publishStart'))}
						{...getFieldProps('publishEnd', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									endTime: dateString,
								});
							},
						})}
						allowClear
					/>
				</div>
				<div className="btn">
					<Button
						type="primary"
						size="large"
						className="yc-high-search"
						onClick={this.search}
					>
						搜索
					</Button>
					<Button onClick={this.queryReset} type="ghost" size="large">
						重置搜索条件
					</Button>
				</div>
			</div>
		);
	}
}
export default createForm()(BANKRUPTCY);
