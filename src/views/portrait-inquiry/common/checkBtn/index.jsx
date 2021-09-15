import React from 'react';
import './style.scss';

const TagSide = (params = {}) => {
	const { style, paddingNumber, ...attribute } = params;
	return (
		<div
			className={`${params.num === 0 ? 'yc-label-disabled' : (params.tag || 'yc-label-tag')}`}
			{...attribute}
		>
			<div className="yc-label-tag-content" style={style}>
				{params.content}
				<span style={{ marginLeft: paddingNumber ? 8 : 10 }}>{`${params.num} 条`}</span>
			</div>
		</div>
	);
};

export default TagSide;
