import React from 'react';
import { DatePicker, Form, Radio } from 'antd';
import { Input, Button, timeRule } from '@/common';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterCurrentOrg: '',
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
				this.handleSubmit();
				document.activeElement.blur();
			}
		}
	};

	handleSubmit=() => {
		const { form: { getFieldsValue }, onQueryChange } = this.props;
		const { filterCurrentOrg } = this.state;
		const condition = getFieldsValue();
		condition.filterCurrentOrg = Boolean(filterCurrentOrg);
		if (onQueryChange)onQueryChange(condition, '', '', 1);
		// console.log('condition:', condition);
	};

	handleReset=() => {
		const { form, onQueryChange } = this.props;
		form.resetFields();
		this.setState({
			filterCurrentOrg: '',
		});
		const condition = form.getFieldsValue();
		if (onQueryChange)onQueryChange(condition, '', '', 1);
	};

	radioChange=(e) => {
		// console.log('radio checked', e.target.value);
		this.setState({
			filterCurrentOrg: e.target.value,
		});
	};

	render() {
		const _style1 = { width: 278 };
		const _style2 = { width: 100 };
		const { form: { getFieldProps, getFieldValue } } = this.props;
		const { filterCurrentOrg } = this.state;
		const timeOption = {
			normalize(n) {
				return n && new Date(n).format('yyyy-MM-dd');
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="当事人" style={_style1} size="large" placeholder="姓名/公司" {...getFieldProps('partiesName')} />
				</div>
				<div className="yc-query-item">
					<Input title="原告" style={_style1} size="large" placeholder="原告姓名/公司" {...getFieldProps('accuser')} />
				</div>
				<div className="yc-query-item">
					<Input title="被告" style={_style1} size="large" placeholder="被告姓名/公司" {...getFieldProps('defendant')} />
				</div>
				<div className="yc-query-item">
					<Input title="案号" style={_style1} size="large" placeholder="案号" {...getFieldProps('caseNumber')} />
				</div>
				<div className="yc-query-item" style={{ marginRight: 0 }}>
					<Input title="法院" style={_style1} size="large" placeholder="法院名称" {...getFieldProps('court')} />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">立案/开庭/判决日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startGmt', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endGmt'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endGmt', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startGmt'))}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">{`${global.Table_CreateTime_Text}：`}</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startGmtCreate', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endGmtCreate'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endGmtCreate', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startGmtCreate'))}
					/>
				</div>

				<div className="yc-query-item" style={{ height: 34, paddingTop: 9 }}>
					<span className="yc-query-item-title">是否过滤本级机构：</span>
					<Radio.Group onChange={this.radioChange} value={filterCurrentOrg}>
						<Radio key="a" value={1}>是</Radio>
						<Radio key="b" value={0}>否</Radio>
					</Radio.Group>
				</div>
				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="common" style={{ width: 84 }} onClick={this.handleSubmit}>查询</Button>
					<Button size="large" style={{ width: 120 }} onClick={this.handleReset}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(QueryCondition);
