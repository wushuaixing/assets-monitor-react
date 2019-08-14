import React from 'react';
import { navigate } from '@reach/router';

import Router from '@/utils/Router';
import Tabs from '@/common/tabs';

import Business from './business-views';
import BusinessDetail from './business-detail';
import Debtor from './debtor';
import DebtorDetail from './debtor-detail';
import Asset from './asset-information';

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
		dot: true,
		components: Debtor,
	},
	{
		id: 3,
		name: '资产信息',
		url: '/business/asset',
		number: 0,
		dot: false,
		components: Asset,
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
	</Router>
);
export default BusinessRouter;
