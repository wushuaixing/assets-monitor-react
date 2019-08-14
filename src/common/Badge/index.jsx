import React from 'react';
import './style.scss';


const Badge = (props) => {
	const { children, dot } = props;
	return (
		<span className="yc-badge">
			{children}
			{
				dot ?	<sup className="yc-badge-tab yc-badge-img" /> : ''
			}
		</span>
	);
};

export default Badge;
