import React from 'react';
import Construct from './table-construct'; // 建设单位
import Winbid from './table-winbid'; // 中标单位
import Underway from './table-underway'; // 施工单位

const TableIntact = (props) => {
	const { sourceType } = props;
	if (sourceType === 1) return <Construct {...props} />;
	if (sourceType === 2) return <Winbid {...props} />;
	if (sourceType === 3) return <Underway {...props} />;
	return <Construct {...props} />;
};
export default TableIntact;
