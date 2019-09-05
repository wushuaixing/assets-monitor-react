import React from 'react';
import { Button } from '@/common';
import Table0010 from '../assets-auction/table-intact';
import Table0020 from '../subrogation/table-intact';
import Table0031 from '../financial-assets/table/table-biding';
import Table0032 from '../financial-assets/table/table-publicity';
import Table0040 from '../lawsuits-monitor/table-intact';
import Table0050 from '../bankruptcy/table-intact';

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
					31: <Table0031 />,
					32: <Table0032 />,
					41: <Table0040 sourceType={1} />,
					42: <Table0040 sourceType={2} />,
					5: <Table0050 />,
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
