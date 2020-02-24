import React from 'react';
import { navigate } from '@reach/router';

import Router from '@/utils/Router';
import Tabs from '@/common/tabs';

import Business from './business-views';
import BusinessDetail from './business-detail';
import Debtor from './debtor';
import DebtorDetail from './debtor-detail';
import ChangeList from './business-detail/changeList';
// import Asset from './asset-information';
import Detail from '../business-detail';

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
			<BusinessBase rule={children} path="/*" />
			<BusinessDetail rule={children} path="/business/detail/*" />
			<Detail rule={children} path="/business/detail/info/*" />
			<DebtorDetail rule={children} path="/business/debtor/detail/*" />
			<ChangeList rule={children} path="/business/detail/changeList/*" />
		</Router>
	);
};
export default BusinessRouter;
