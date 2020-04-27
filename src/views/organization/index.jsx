import React from 'react';
import { NavTab } from '@/common';
import Router from '@/utils/Router';
import PushManage from './push-manage';
import UserList from './user-list';
import OrganizationStatistics from './organization-statistics';
import OperateLog from './operate-log';
import {
	setting, settingEd, orgCount, orgCountEd, userList, userListEd,
} from '@/assets/img/nav-tab';

const source = rule => ([
	{
		id: 1,
		title: '推送设置',
		url: '/organization/setting/*',
		number: 0,
		img: setting,
		selectImg: settingEd,
		display: !!(rule && rule.jggltssz),
		status: !!(rule && rule.jggltssz),
		components: PushManage,
	},
	{
		id: 3,
		title: '机构统计',
		url: '/organization/*',
		img: userList,
		selectImg: userListEd,
		root: true,
		status: true,
		components: OrganizationStatistics,
	},
	{
		id: 2,
		title: '帐号列表',
		url: '/organization/user/*',
		img: orgCount,
		selectImg: orgCountEd,
		number: 0,
		display: !!(rule && rule.jgglzhlb),
		status: !!(rule && rule.jgglzhlb),
		components: UserList,
	},
]);
class BusinessBase extends React.Component {
	constructor(props) {
		super(props);
		document.title = '机构管理';
		this.state = {};
	}

	render() {
		const { rule } = this.props;
		const _source = source(rule).filter(item => item.status); // 过滤权限

		return (
			<React.Fragment>
				<NavTab source={_source} line />
				<div className="yc-business">
					<Router>
						{ _source.map(Item => <Item.components path={Item.url} root={Item.root} />) }
					</Router>
				</div>
			</React.Fragment>
		);
	}
}

const BusinessRouter = (props) => {
	const { rule: { children } } = props;
	return (
		<Router>
			<BusinessBase rule={children} path="/*" />
			<OperateLog rule={children} path="/organization/user/log/*" />
		</Router>
	);
};
export default BusinessRouter;
