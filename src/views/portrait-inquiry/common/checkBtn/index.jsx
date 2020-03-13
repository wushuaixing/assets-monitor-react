import React from 'react';
import './style.scss';

const TagSide = params => (
	<div
		className={`${params.num === 0 ? 'yc-label-disabled' : (params.tag || 'yc-label-tag')}`}
		{...params}
	>
		<div className="yc-label-tag-content">
			{params.content}
			<span style={{ marginLeft: 10 }}>{`${params.num} 条`}</span>
		</div>
	</div>
);
// const TagTwoSide = params => (
// 	<div className={`${params.num === 0 ? 'yc-label-disabled' : (params.tag || 'yc-label-tag')}`} {...params}>
// 		<div className="yc-label-tag-content">
// 			{params.content}
// 			<span style={{ marginLeft: 10 }}>{`${params.num} 条`}</span>
// 		</div>
// 	</div>
// );

export default TagSide;
