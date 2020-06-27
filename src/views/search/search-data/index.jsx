import React from 'react';
import Auction from './auction';
import Lawsuits from './lawsuits';
import Writ from './writ';
import Finance from './finance';
import Bankruptcy from './bankruptcy';
import Land from './land';
import './style.scss';

const View = {
	1: Auction,
	2: Lawsuits,
	3: Writ,
	4: Finance,
	5: Bankruptcy,
	11: Land,
};
const QueryView = (props) => {
	const { active } = props;
	const ViewPage = View[active.id];
	return (
		<div className="yc-query-data">
			<ViewPage />
		</div>
	);
};
export default QueryView;
