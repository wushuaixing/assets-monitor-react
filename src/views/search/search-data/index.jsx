import React from 'react';
import Auction from './auction';
import Lawsuits from './lawsuits';
import Writ from './writ';
import SelectSearch from './selectSearch';

const Datas = (props) => {
	const { active, highSearch } = props;
	if (highSearch && active.id !== 4) {
		return (
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
		);
	}
	return (
		<React.Fragment>
			{
				active.id === 1 ? (<SelectSearch options={active.types} router={active.router} />) : null
			}
			{
				active.id === 2 ? (<SelectSearch options={active.types} router={active.router} />) : null
			}
			{
				active.id === 3 ? (<SelectSearch options={active.types} router={active.router} />) : null
			}
			{
				active.id === 4 ? (<SelectSearch router={active.router} />) : null
			}
		</React.Fragment>
	);
};
export default Datas;
