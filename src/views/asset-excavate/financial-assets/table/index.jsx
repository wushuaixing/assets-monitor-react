import React from 'react';
import Result from './table-reslut';
import Publicity from './table-publicity';
import Biding from './table-biding';

const TableIntact = (props) => {
	const { sourceType } = props;
	if (sourceType === 1) return <Biding {...props} />;
	if (sourceType === 2) return <Publicity {...props} />;
	if (sourceType === 3) return <Result {...props} />;
	return <Biding {...props} />;
};
export default TableIntact;
