import React from 'react';
// import Router from '@/utils/Router';
import Tabs from '@/common/tabs';

const source = [
	{
		id: 1, name: '业务视图', url: '', number: 0, dot: false,
	},
	{
		id: 2, name: '债务人', url: '', number: 0, dot: true,
	},
	{
		id: 3, name: '资产信息', url: '', number: 0, dot: false,
	},

];
const BusinessBase = () => (
	<React.Fragment>
		<Tabs rightRender={() => <span>eeee</span>} onChange={res => console.log(res)} source={source} />
		<div>这是业务管理模块</div>
	</React.Fragment>

);
export default BusinessBase;
