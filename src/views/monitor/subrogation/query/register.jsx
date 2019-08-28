import React from 'react';
import { Input, Button } from '@/common';
import { DatePicker, Form } from 'antd';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		window._addEventListener(window, 'keyup', this.toKeyCode13);
	}

	componentWillUnmount() {
		window._removeEventListener(window, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const	key = e.keyCode || e.which || e.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			this.handleSubmit();
			document.activeElement.blur();
		}
	};

	handleSubmit=() => {
		const { form: { getFieldsValue }, onQueryChange } = this.props;
		const condition = getFieldsValue();
		if (onQueryChange)onQueryChange(condition, '', '', 1);
		// console.log('condition:', condition);
	};

	handleReset=() => {
		const { form, onQueryChange } = this.props;
		form.resetFields();
		const condition = 	form.getFieldsValue();
		if (onQueryChange)onQueryChange(condition, '', '', 1);
	};

	render() {
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		const { form: { getFieldProps } } = this.props;
		const timeOption = {
			normalize(n) {
				return n && new Date(n).format('yyyy-MM-dd');
			},
		};
		return (
			<div className="yc-content-query" ref={e => this.dom = e}>
				<div className="yc-query-item">
					<Input title="原告" style={_style1} size="large" placeholder="原告姓名/公司" {...getFieldProps('yg')} />
				</div>
				<div className="yc-query-item">
					<Input title="被告" style={_style1} size="large" placeholder="被告姓名/公司" {...getFieldProps('bg')} />
				</div>
				<div className="yc-query-item">
					<Input title="案号" style={_style1} size="large" placeholder="案号" {...getFieldProps('ah')} />
				</div>
				<div className="yc-query-item">
					<Input title="法院" style={_style1} size="large" placeholder="法院名称" {...getFieldProps('court')} />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">立案/开庭日期：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" {...getFieldProps('startLarq', timeOption)} />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" {...getFieldProps('endLarq', timeOption)} />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">更新日期：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" {...getFieldProps('startUpdateTime', timeOption)} />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" {...getFieldProps('endUpdateTime', timeOption)} />
				</div>

				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="warning" style={{ width: 84 }} onClick={this.handleSubmit}>查询</Button>
					<Button size="large" style={{ width: 120 }} onClick={this.handleReset}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(QueryCondition);
