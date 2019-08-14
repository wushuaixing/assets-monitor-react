import React from 'react';
import { navigate } from '@reach/router';

import Router from '@/utils/Router';
import Tabs from '@/common/tabs';

import PushManage from './push-manage';
import UserList from './user-list';
import OperateLog from './operate-log';

const source = [
	{
		id: 1,
		name: '推送设置',
		url: '/organization',
		number: 0,
		dot: false,
		components: PushManage,
	},
	{
		id: 2,
		name: '账号列表',
		url: '/organization/user',
		number: 0,
		dot: false,
		components: UserList,
	},
];
const BusinessBase = () => (
	<React.Fragment>
		<Tabs
			onChange={res => navigate(res.url)}
			source={source}
		/>
		<div className="yc-business yc-page-content">
			<Router>
				{
					source.map(Item => <Item.components path={`${Item.url}/*`} />)
				}
			</Router>
		</div>
	</React.Fragment>

);
const BusinessRouter = () => (
	<Router>
		<BusinessBase path="/*" />
		<OperateLog path="/organization/operate/log/*" />
	</Router>
);
export default BusinessRouter;
