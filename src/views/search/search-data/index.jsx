import React from 'react';
import Auction from './auction';
import Lawsuits from './lawsuits';
import Writ from './writ';
import Finance from './finance';
import Bankruptcy from './bankruptcy';

const Datas = (props) => {
	const { active } = props;

	return (
		<React.Fragment>
			<div className="yc-datas">
				{
					active.id === 1 ? (<Auction />) : null
				}
				{
					active.id === 2 ? (<Lawsuits />) : null
				}
				{
					active.id === 3 ? (<Writ />) : null
				}
				{
					active.id === 4 ? (<Finance />) : null
				}
				{
					active.id === 5 ? (<Bankruptcy />) : null
				}
			</div>
			{/* {
				active.id === 4 ? (<Finance router={active.router} />) : null
			} */}
		</React.Fragment>
	);
};
export default Datas;
