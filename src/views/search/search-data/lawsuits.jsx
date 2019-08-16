import React, { useState } from 'react';
import './style.scss';
import DatePicker from 'antd/lib/date-picker';
import Button from 'antd/lib/button';
import Input from '@/common/input';

const Datas = props => (
	<div className="yc-tabs-data" style={{ padding: '16px 22px' }}>
		<div className="yc-tabs-items">
			<div className="item" style={{ 'margin-right': 10 }}>
				<Input title="原告" placeholder="姓名/公司名称" />
			</div>
		</div>
		<div className="yc-tabs-items">
			<div className="item" style={{ 'margin-right': 10 }}>
				<Input title="被告" placeholder="姓名/公司名称" />
			</div>
		</div>
		<div className="yc-tabs-items">
			<div className="item" style={{ 'margin-right': 10 }}>
				<Input title="起诉法院" placeholder="法院名称" />
			</div>
			<div className="item" style={{ 'margin-right': 10 }}>
				<Input title="案号" placeholder="案件编号" />
			</div>
			<div className="item" style={{ 'margin-right': 0, width: 303 }}>
				<span>日期选择：</span>
				<DatePicker placeholder="开始日期" style={{ width: 112 }} size="large" allowClear />
				<span style={{ margin: '0 2px ' }}>至</span>
				<DatePicker placeholder="结束日期" style={{ width: 112 }} size="large" allowClear />
			</div>
		</div>
		<div className="others">
			<span>信息类型：</span>
			<Button size="large" type="ghost" style={{ 'margin-right': 10 }}>立案信息</Button>
			<Button size="large" type="primary">开庭公告</Button>
		</div>
	</div>
);
export default Datas;
