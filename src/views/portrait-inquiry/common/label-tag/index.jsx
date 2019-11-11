import React from 'react';
import './style.scss';


const TagOneSide = params => (
	<div className="yc-label-tag yc-TagOneSide">
		<div className="yc-label-tag-content">{params.content}</div>
		<div className="line-triangle line-triangle-right">
			<div className="line-triangle-outside">
				<div className="line-triangle-inside" />
			</div>
		</div>
	</div>
);

const TagTwoSide = params => (
	<div className="yc-label-tag yc-TagTwoSide">
		<div className="line-triangle line-triangle-left">
			<div className="line-triangle-outside">
				<div className="line-triangle-inside" />
			</div>
		</div>
		<div className="yc-label-tag-content">{params.content}</div>
		<div className="line-triangle line-triangle-right">
			<div className="line-triangle-outside">
				<div className="line-triangle-inside" />
			</div>
		</div>
	</div>
);

export { TagOneSide, TagTwoSide };
