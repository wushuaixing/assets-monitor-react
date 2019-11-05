import React from 'react';

const Icon = (props) => {
	const { type, className, style } = props;
	return (
		<i
			className={`iconfont ${type}${className ? ` ${type}` : ''}`}
			style={style || ''}
		/>
	);
};

export default Icon;
