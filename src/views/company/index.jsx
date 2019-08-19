import React from 'react';
// import Router from '@/utils/Router';
import { Input } from '@/common';
import {
	InputNumber, InputPrice, DatePicker, Select,
} from '@antd';

const handleEnterKey = (e) => {
	if (e.nativeEvent.keyCode === 13) { // e.nativeEvent获取原生的事件对像
		console.log(e);
	}
};
const HomeRouter = () => (
	<div style={{ padding: 30 }}>
		<hr />
		<Input suffix="元" title="业务编号" />
		<hr />
		<DatePicker size="large" />
		<hr	 />
		<Select size="large" defaultValue="lucy" style={{ width: 200 }}>
			<Select.Option value="jack">Jack</Select.Option>
			<Select.Option value="lucy">Lucy</Select.Option>
			<Select.Option value="disabled" disabled>Disabled</Select.Option>
			<Select.Option value="yiminghe">yiminghe</Select.Option>
		</Select>
		<hr />
		<InputPrice suffix="万元" title="业务编号" style={{ width: 274 }} />
		<hr />
		<InputNumber
			min={1}
			max={10}
			onChange={e => console.log(e)}
			onKeyPress={e => handleEnterKey(e)}
		/>
	</div>
);
export default HomeRouter;
