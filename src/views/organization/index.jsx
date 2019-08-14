import React from 'react';
// import Router from '@/utils/Router';
import Tabs from '@/common/tabs';

const source = [
	{
		id: 1, name: '推送设置', url: '', number: 0, dot: false,
	},
	{
		id: 2, name: '机构管理', url: '', number: 0, dot: false,
	},
];
const monitorBase = () => (
	<React.Fragment>
		<Tabs rightRender={() => <span>eeee</span>} onChange={res => console.log(res)} source={source} />
		<div>这是监控信息模块</div>
	</React.Fragment>

);
export default monitorBase;
