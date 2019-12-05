import React from 'react';
import { navigate } from '@reach/router';

import Router from '@/utils/Router';
import Tabs from '@/common/tabs';

import PushManage from './push-manage';
import UserList from './user-list';
import OperateLog from './operate-log';

const source = rule => ([
	{
		id: 1,
		name: '推送设置',
		url: '/organization',
		number: 0,
		dot: false,
		display: !!(rule && rule.jggltssz),
		components: PushManage,
	},
	{
		id: 2,
		name: '账号列表',
		url: '/organization/user',
		number: 0,
		dot: false,
		display: !!(rule && rule.jgglzhlb),
		components: UserList,
	},
]);
class BusinessBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { rule } = this.props;
		if (source(rule)[0].display === false) {
			navigate('/organization/user');
		}
	}

	render() {
		const { rule } = this.props;
		const displayArray = source(rule).filter(item => item.display === true); // 过滤权限
		return (
			<React.Fragment>
				<Tabs
					onChange={res => navigate(res.url)}
					source={displayArray}
				/>
				<div className="yc-business yc-page-content">
					<Router>
						{
							displayArray.map(Item => <Item.components path={`${Item.url}/*`} />)
						}
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
			<OperateLog rule={children} path="/organization/operate/log/*" />
		</Router>
	);
};
export default BusinessRouter;
