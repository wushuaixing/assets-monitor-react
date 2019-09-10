import React from 'react';
import Auction from './auction';
import Lawsuits from './lawsuits';
import Writ from './writ';
import Finance from './finance';

const Datas = (props) => {
	const { active } = props;

	return (
		<React.Fragment>
			{active.id !== 4 && (
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
			</div>
			)}
			{
				active.id === 4 ? (<Finance router={active.router} />) : null
			}
		</React.Fragment>
	);
};
export default Datas;
