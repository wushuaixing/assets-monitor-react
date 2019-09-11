import React from 'react';
import {
	DatePicker, Button, Form, message, Select,
} from 'antd';
import { navigate } from '@reach/router';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import { Input, timeRule } from '@/common';
import './style.scss';

const createForm = Form.create;
const _style3 = { width: 120 };
const { Option } = Select;
class WRIT extends React.Component {
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
			this.search();
			document.activeElement.blur();
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
		resetFields('');
	}

	render() {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		return (
			<div className="yc-tabs-data">
				<div className="yc-tabs-items">
					<div className="item" style={{ width: 742 }}>
						<Input
							title="全文"
							placeholder="姓名、公司名称、关键字"
							{...getFieldProps('content', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
				</div>
				<div className="yc-tabs-items">
					<div className="item" style={{ marginRight: 26 }}>
						<Input
							title="案号"
							placeholder="案件编号"
							{...getFieldProps('ah', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ marginRight: 26 }}>
						<Input
							title="案由"
							placeholder="案件内容提要"
							{...getFieldProps('reason', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item">
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
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('publishEnd'))
	}
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
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('publishStart'))
	}
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
				<div className="other">
					<span>案件类型：</span>
					<Select
						size="large"
						allowClear
						style={_style3}
						placeholder="请选择案件类型"
						{...getFieldProps('caseType', {})}
					>
						<Option value="刑事案件">刑事案件</Option>
						<Option value="民事案件">民事案件</Option>
						<Option value="行政案件">行政案件</Option>
						<Option value="赔偿案件">赔偿案件</Option>
						<Option value="执行案件">执行案件</Option>
						<Option value="知识产权">知识产权</Option>
						<Option value="商事">商事</Option>
						<Option value="海事海商">海事海商</Option>
						<Option value="申诉">申诉</Option>
						<Option value="其他">其他</Option>
					</Select>
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
export default createForm()(WRIT);
