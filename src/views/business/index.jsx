import React from 'react';
import { navigate } from '@reach/router';

import Router from '@/utils/Router';
import Tabs from '@/common/tabs';

import Business from './business-views';
import Debtor from './debtor';
import NewDetailDebtor from '@/views/business/business-detail/debtor';
import NewDetailBusiness from '@/views/business/business-detail/business';
import NewDetailEdit from '@/views/business/business-detail/edit-info';

const source = rule => ([
	{
		id: 1,
		name: '业务视图',
		url: '/business',
		number: 0,
		dot: false,
		display: !!(rule && rule.ywglywst),
		components: Business,
	},
	{
		id: 2,
		name: '债务人',
		url: '/business/debtor',
		number: 0,
		dot: false,
		display: !!(rule && rule.ywglzwr),
		components: Debtor,
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
			navigate('/business/debtor');
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
			{/* <BusinessBase rule={children} path="/*" remark="业务（债务人）视图列表" />
			<BusinessDetail rule={children} path="/business/detail/*" remark="业务详情" />
			<ChangeList rule={children} path="/business/detail/changeList/*" remark="业务详情-变更记录" />
			<DebtorDetail rule={children} path="/business/debtor/detail/*" remark="债务人详情" /> */}
			{/* 新路由 */}
			<BusinessBase rule={children} path="/*" remark="业务（债务人）视图列表" />
			<NewDetailBusiness rule={children} path="/business/detail/*" remark="业务详情（新）" />
			<NewDetailEdit rule={children} path="/business/detail/edit/info/*" remark="业务详情-编辑（新）" />
			<NewDetailDebtor rule={children} path="/business/debtor/detail/*" remark="债务人详情（新）" />
		</Router>
	);
};
export default BusinessRouter;
