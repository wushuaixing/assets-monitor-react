import React from 'react';

const Icon = (props) => {
	const { type, className, style } = props;
	console.log(className);
	return (
		<i
			className={`iconfont ${type}${className ? ` ${className}` : ''}`}
			style={style || ''}
		/>
	);
};

export default Icon;
