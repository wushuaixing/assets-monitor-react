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

const source = [
	{
		id: 1,
		name: '业务视图',
		url: '/business',
		number: 0,
		dot: false,
		components: Business,
	},
	{
		id: 2,
		name: '债务人',
		url: '/business/debtor',
		number: 0,
		dot: false,
		components: Debtor,
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
		<BusinessDetail path="/business/detail/*" />
		<DebtorDetail path="/business/debtor/detail/*" />
		<ChangeList path="/business/detail/changeList/*" />
	</Router>
);
export default BusinessRouter;
