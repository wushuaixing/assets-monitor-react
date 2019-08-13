import React from 'react';

const tableRender = (params, className = []) => {
	const td = params.map(val => (
		<p>
			<span className={className[0]}>{val.label}</span>
			：
			<span className={className[1]}>{val.value || '--'}</span>
		</p>
	));
	return td;
};
export default tableRender;
