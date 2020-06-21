import React from 'react';

const style1 = {
	display: 'inline-block',
	padding: 2,
	borderRadius: 3,
	lineHeight: 1,
	color: '#fff',
	marginLeft: 4,
	backgroundColor: '#FB5A5C',
};
export const Borrower = () => <span style={style1}>借</span>;

const Icon = (props) => {
	const { type, className, style } = props;
	return (
		<i
			className={`iconfont ${type}${className ? ` ${className}` : ''}`}
			style={style || ''}
		/>
	);
};
Icon.B = Borrower;
export default Icon;
