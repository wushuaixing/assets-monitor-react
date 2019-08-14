import React from 'react';
// import Router from '@/utils/Router';
import { Button } from '@/common';

console.log(Button);
const HomeRouter = () => (
	<div style={{ padding: 10 }}>
		<span>只是首页</span>
		<hr />
		<Button style={{ width: 100 }}>测试中...</Button>
		<Button style={{ width: 100 }} size="large" type="warning">测试...</Button>
	</div>
);
export default HomeRouter;
