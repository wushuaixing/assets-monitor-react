import React from 'react';
import { Button } from '@/common';
import AssetsAuction from '../asset-excavate/assets-auction/table-intact';
import Subrogation from '../asset-excavate/subrogation/table-intact';
import LandData from '../asset-excavate/land-data/table-intact';
import TenderBid from '../asset-excavate/tender-bid/table-intact';
import FinancialAssets from '../asset-excavate/financial-assets/table';
import ChattelMortgage from '../asset-excavate/chattel-mortgage/table-intact';

const TableItem	= (props) => {
	const { source, childType, sourceType } = props;
	const ID = source.child ? childType : sourceType;
	return (
		<React.Fragment>
			{
				{
					YC0201: <AssetsAuction />,
					YC020201: <Subrogation sourceType={1} />,
					YC020202: <Subrogation sourceType={2} />,
					YC020203: <Subrogation sourceType={3} />,
					YC020301: <LandData sourceType={1} />,
					YC0204: <TenderBid />,
					YC020501: <FinancialAssets sourceType={1} />,
					YC020502: <FinancialAssets sourceType={2} />,
					YC020503: <FinancialAssets sourceType={3} />,
					YC0206: <ChattelMortgage />,
				}[ID] || <AssetsAuction />
			}
		</React.Fragment>
	);
};
const Item = (props) => {
	const { source, childType, onBtnChange } = props;

	return (
		<div className="yc-attention-item">
			{
				source.child ? (
					<div className="item-btn-list">
						{
							source.child.map(item => (item.status ? (
								<Button
									active={item.id === childType}
									onClick={() => onBtnChange(item)}
									style={{ marginRight: 12, minWidth: 85 }}
								>
									{item.name}
									<span style={{ marginLeft: 4, color: '#FB5A5C' }}>{item.number || 0}</span>
								</Button>
							) : null))
						}
					</div>
				) : null
			}
			<TableItem {...props} />
		</div>
	);
};


export default Item;
