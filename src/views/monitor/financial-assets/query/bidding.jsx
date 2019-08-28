import React from 'react';
import { Input, Button, timeRule } from '@/common';
import InputPrice from '@/common/input/input-price';
import {
	DatePicker, Select, Form,
} from 'antd';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			moreOption: false,
		};
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
		if (onQueryChange)onQueryChange(condition);
	};

	handleReset=() => {
		const { form, onQueryChange } = this.props;
		form.resetFields();
		const condition = form.getFieldsValue();
		if (onQueryChange)onQueryChange(condition);
		// console.log('reset:', form.getFieldsValue());
	};

	render() {
		const { form: { getFieldProps, getFieldValue } } = this.props;
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		const _style3 = { width: 80 };
		const { moreOption } = this.state;
		const timeOption = {
			normalize(n) {
				return n && new Date(n).format('yyyy-MM-dd');
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} size="large" placeholder="姓名/公司名称" {...getFieldProps('obligorName')} />
				</div>
				<div className="yc-query-item">
					<Input
						title="证件号"
						style={_style1}
						size="large"
						placeholder="身份证号/统一社会信用代码"
						{...getFieldProps('obligorNumber')}
					/>
				</div>
				<div className="yc-more-option inline-block cursor-pointer">
					{ moreOption
						? <span onClick={() => this.setState({ moreOption: false })}>收起选项 ▲</span>
						: <span onClick={() => this.setState({ moreOption: true })}>更多选项 ▼</span>
					}
				</div>
				<br />
				<div className={`${moreOption ? '' : 'displayNoneImportant'}`}>
					<div className="yc-query-item">
						<Input title="机构名称" style={_style1} size="large" placeholder="机构名称" {...getFieldProps('orgName')} />
					</div>
					<div className="yc-query-item">
						<InputPrice
							title="评估价"
							style={_style1}
							size="large"
							suffix="万元"
							inputFirstProps={getFieldProps('consultPriceStart')}
							inputSecondProps={getFieldProps('consultPriceEnd')}
						/>
					</div>
					<div className="yc-query-item">
						<Input title="信息标题" style={_style1} size="large" placeholder="拍卖信息标题" {...getFieldProps('title')} />
					</div>
					<div className="yc-query-item">
						<Input title="处置机关" style={_style1} size="large" placeholder="处置法院/单位" {...getFieldProps('court')} />
					</div>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">拍卖状态：</span>
					<Select size="large" defaultValue="all" style={_style3} {...getFieldProps('status', { initialValue: '' })}>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value="9">中止</Select.Option>
						<Select.Option value="11">撤回</Select.Option>
						<Select.Option value="5">已成交</Select.Option>
						<Select.Option value="7">已流拍</Select.Option>
						<Select.Option value="1">即将开始</Select.Option>
						<Select.Option value="3">正在进行</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">开拍时间：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('startEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('startEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startStart'))}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">更新时间：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('updateTimeStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('updateTimeEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('updateTimeEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('updateTimeStart'))}
					/>
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
