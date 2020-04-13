import React from 'react';

const Split = <span className="list-split" style={{ height: 16 }} />;
const LiItem = (props) => {
	const {
		Li, title, children, noColon, cotStyle, style, className,
	} = props;
	const content = [
		title && <span className="list list-title align-justify">{title}</span>,
		title && <span className="list list-title-colon" style={noColon && { visibility: 'hidden' }}>:</span>,
		children && <span className="list list-content" style={cotStyle}>{children}</span>,
	];
	return Li ? <li className={className} style={style}>{content}</li> : content;
};

LiItem.Split = Split;

export default LiItem;
