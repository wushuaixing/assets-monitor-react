import React from 'react';
import { Button } from 'antd';
import Auction from './auction';
import Lawsuits from './lawsuits';
import Writ from './writ';
import SelectSearch from './selectSearch';

const Datas = (props) => {
	const { active, highSearch } = props;
	const renderDom = () => {
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
					<div className="btn">
						<Button
							type="primary"
							size="large"
							style={{ 'margin-right': 10, 'background-color': '#FB5A5C', 'border-color': '#FB5A5C' }}
						>
							搜索
						</Button>
						<Button type="ghost" size="large">充值搜索条件</Button>
					</div>
				</div>
			);
		}
		return (
			<React.Fragment>
				{
					active.id === 1 ? (<SelectSearch options={active.types} />) : null
				}
				{
					active.id === 2 ? (<SelectSearch options={active.types} />) : null
				}
				{
					active.id === 3 ? (<SelectSearch options={active.types} />) : null
				}
				{
					active.id === 4 ? (<SelectSearch />) : null
				}
			</React.Fragment>
		);
	};
	return renderDom();
	/* (
		<React.Fragment>
			{
				highSearch ? (
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
						<div className="btn">
							<Button
								type="primary"
								size="large"
								style={{ 'margin-right': 10, 'background-color': '#FB5A5C', 'border-color': '#FB5A5C' }}
							>
								搜索
							</Button>
							<Button type="ghost" size="large">充值搜索条件</Button>
						</div>
					</div>

				) : (
					<SelectSearch options={active.types}/>
				)
			}
		</React.Fragment>
	); */
};
export default Datas;
