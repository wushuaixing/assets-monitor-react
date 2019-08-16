import React from 'react';
// import Router from '@/utils/Router';
import { Input } from '@/common';
import InputPrice from '@/common/input/input-price';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';

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
		<input type="text" onChange={e => console.log(e)} />
	</div>
);
export default HomeRouter;
