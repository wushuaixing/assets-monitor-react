import React from 'react';
// import Router from '@/utils/Router';
import { Input } from '@/common';

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
	</div>
);
export default HomeRouter;
