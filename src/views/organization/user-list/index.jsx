import React from 'react';
import { navigate } from '@reach/router';

export default () => (
	<div>
		<span>账户列表</span>
		<hr />
		<span onClick={() => navigate('/organization/operate/log')}>{'=>操作历史'}</span>
	</div>
);
