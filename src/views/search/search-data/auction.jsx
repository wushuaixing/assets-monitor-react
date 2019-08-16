import React, { useState } from 'react';
import './style.scss';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
import Input from '@/common/input';

const Datas = props => (
	<div className="yc-tabs-data">
		<div className="yc-tabs-items">
			<div className="item">
				<Input title="债务人" placeholder="姓名/公司名称" />
			</div>
			<div className="item">
				<Input title="证件号" placeholder="身份证号/统一社会信用代码" />
			</div>
			<div className="item">
				<Input title="产权证" placeholder="房产证/土地证号" />
			</div>
			<div className="item">
				<Input title="处置机关" placeholder="处置法院/单位" />
			</div>
			<div className="item">
				<Input title="评估价" placeholder="身份证号/统一社会信用代码" />
			</div>
			<div className="item">
				<Input title="地址" placeholder="地址信息" />
			</div>
		</div>
		<div className="other">
			<span>开拍时间：</span>
			<DatePicker placeholder="开始日期" size="large" allowClear />
			<span style={{ margin: '0 2px ' }}>至</span>
			<DatePicker placeholder="结束日期" size="large" allowClear />
		</div>
		<div className="other">
			<span>拍卖状态：</span>
			<Select defaultValue="lucy" style={{ width: 100 }} size="large" allowClear>
				<Select.Option value="jack">Jack</Select.Option>
				<Select.Option value="lucy">Lucy</Select.Option>
				<Select.Option value="disabled" disabled>Disabled</Select.Option>
				<Select.Option value="yiminghe">yiminghe</Select.Option>
			</Select>
		</div>
	</div>
);
export default Datas;
