import React from 'react';
import { Input, Button } from '@/common';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		const _style3 = { width: 80 };
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} size="large" placeholder="姓名/公司名称" />
				</div>
				<div className="yc-query-item">
					<Input title="证件号" style={_style1} size="large" placeholder="身份证号/统一社会信用代码" />
				</div>
				<br />
				<div className="yc-query-item">
					<Input title="机构名称" style={_style1} size="large" placeholder="机构名称" />
				</div>
				<div className="yc-query-item">
					<Input title="评估价" style={_style1} size="large" placeholder="未完善" />
				</div>
				<div className="yc-query-item">
					<Input title="信息标题" style={_style1} size="large" placeholder="拍卖信息标题" />
				</div>
				<div className="yc-query-item">
					<Input title="处置机关" style={_style1} size="large" placeholder="处置法院/单位" />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">匹配类型：</span>
					<Select size="large" defaultValue="all" style={_style3}>
						<Select.Option value="all">全部</Select.Option>
						<Select.Option value="exact">精准匹配</Select.Option>
						<Select.Option value="obscure">模糊匹配</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">开拍时间：</span>
					<Select size="large" defaultValue="all" style={_style3}>
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
					<span className="yc-query-item-title">更新时间：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">拍卖状态：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" />
				</div>
				<Button size="large" type="warning" style={{ width: 84 }}>查询</Button>
				<Button size="large" style={{ width: 120 }}>重置查询条件</Button>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(QueryCondition);
