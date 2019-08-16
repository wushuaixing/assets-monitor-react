import React, { useState } from 'react';
import './style.scss';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
import Input from '@/common/input';

const Datas = props => (
	<div className="yc-tabs-data">
		<div className="yc-tabs-items">
			<div className="item" style={{ width: 742 }}>
				<Input title="全文" placeholder="姓名、公司名称、关键字" />
			</div>
		</div>
		<div className="yc-tabs-items">
			<div className="item">
				<Input title="案号" placeholder="案件编号" />
			</div>
			<div className="item">
				<Input title="案由" placeholder="案件内容提要" />
			</div>
			<div className="item">
				<Input title="起诉法院" placeholder="法院名称" />
			</div>
		</div>
		<div className="other">
			<span>发布日期：</span>
			<DatePicker placeholder="开始日期" size="large" allowClear />
			<span style={{ margin: '0 2px ' }}>至</span>
			<DatePicker placeholder="结束日期" size="large" allowClear />
		</div>
		<div className="other">
			<span>案件类型：</span>
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
