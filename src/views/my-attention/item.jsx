import React from 'react';
import { Button } from '@/common';
import Table0010 from '../asset-excavate/assets-auction/table-intact';
import Table0020 from '../asset-excavate/subrogation/table-intact';
import Table0031 from '../asset-excavate/financial-assets/table/table-biding';
import Table0032 from '../asset-excavate/financial-assets/table/table-publicity';
import Table0040 from '../risk-monitor/lawsuits-monitor/table-intact';
import Table0050 from '../risk-monitor/bankruptcy/table-intact';
import Table0060 from '../asset-excavate/public-proclamation/table-intact';

const TableItem	= (props) => {
	const { source, childType, sourceType } = props;
	const ID = source.child ? childType : sourceType;
	return (
		<React.Fragment>
			{
				{
					1: <Table0010 />,
					21: <Table0020 sourceType={1} />,
					22: <Table0020 sourceType={2} />,
					23: <Table0020 sourceType={3} />,
					31: <Table0031 />,
					32: <Table0032 />,
					41: <Table0040 sourceType={1} />,
					42: <Table0040 sourceType={2} />,
					5: <Table0050 />,
					61: <Table0060 sourceType={1} />,
					62: <Table0060 sourceType={2} />,
					63: <Table0060 sourceType={3} />,
				}[ID] || <Table0010 />
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
							source.child.map(item => (
								<Button
									active={item.id === childType * 1}
									onClick={() => onBtnChange(item)}
									style={{ marginRight: 12, minWidth: 85 }}
								>
									{item.name}
									<span style={{ marginLeft: 4, color: '#FB5A5C' }}>{item.number || 0}</span>
								</Button>
							))
						}
					</div>
				) : null
			}
			<TableItem {...props} />
		</div>
	);
};


export default Item;
