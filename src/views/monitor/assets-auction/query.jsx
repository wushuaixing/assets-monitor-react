import React from 'react';
import { Input, Button } from '@/common';
import InputPrice from '@/common/input/input-price';
import { DatePicker, Select, Form } from 'antd';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit=() => {
		const { form: { getFieldsValue } } = this.props;
		console.log(111, getFieldsValue());
	};

	handleReset=() => {
		const { form } = this.props;
		form.resetFields();
		console.log('reset:', form.getFieldsValue());
	};

	render() {
		const { form: { getFieldProps } } = this.props;
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		const _style3 = { width: 80 };
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} size="large" placeholder="姓名/公司名称" {...getFieldProps('zwr')} />
				</div>
				<div className="yc-query-item">
					<Input title="证件号" style={_style1} size="large" placeholder="身份证号/统一社会信用代码" {...getFieldProps('zjh')} />
				</div>
				<br />
				<div className="yc-query-item">
					<Input title="机构名称" style={_style1} size="large" placeholder="机构名称" {...getFieldProps('jgmc')} />
				</div>
				<div className="yc-query-item">
					<InputPrice
						title="评估价"
						style={_style1}
						size="large"
						suffix="万元"
						inputFirstProps={getFieldProps('pgj1')}
						inputSecondProps={getFieldProps('pgj2')}
					/>
				</div>
				<div className="yc-query-item">
					<Input title="信息标题" style={_style1} size="large" placeholder="拍卖信息标题" {...getFieldProps('title')} />
				</div>
				<div className="yc-query-item">
					<Input title="处置机关" style={_style1} size="large" placeholder="处置法院/单位" {...getFieldProps('dw')} />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">匹配类型：</span>
					<Select size="large" defaultValue="all" style={_style3} {...getFieldProps('type', { initialValue: 'all' })}>
						<Select.Option value="all">全部</Select.Option>
						<Select.Option value="exact">精准匹配</Select.Option>
						<Select.Option value="obscure">模糊匹配</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">拍卖状态：</span>
					<Select size="large" defaultValue="all" style={_style3} {...getFieldProps('status', { initialValue: 'all' })}>
						<Select.Option value="all">全部</Select.Option>
						<Select.Option value="exact">中止</Select.Option>
						<Select.Option value="exact">撤回</Select.Option>
						<Select.Option value="exact">已成交</Select.Option>
						<Select.Option value="exact">已流拍</Select.Option>
						<Select.Option value="obscure">即将开始</Select.Option>
						<Select.Option value="obscure">正在进行</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">开拍时间：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" {...getFieldProps('kpStart')} />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" {...getFieldProps('kpEnd')} />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">更新时间：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" {...getFieldProps('gxStart')} />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" {...getFieldProps('gxEnd')} />
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
