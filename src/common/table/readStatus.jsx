import React from 'react';

const readStatus = (text, record) => {
	const { isRead } = record;
	return (
		<div>
			<span className={isRead ? 'yc-table-read' : 'yc-table-unread'} />
			<span>{text}</span>
		</div>
	);
};
export default readStatus;
