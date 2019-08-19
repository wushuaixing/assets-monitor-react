import React from 'react';

const attention = (props) => {
	const { row: { isAttention, id }, onClick } = props;
	return (
		<div
			className={`yc-list-attention ${isAttention ? 'yc-list-attention-ed' : 'yc-list-attention-un'}`}
			onClick={() => (onClick ? onClick(id, isAttention) : null)}
		/>
	);
};
export default attention;
