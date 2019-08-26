import React from 'react';
import accurate from '@/assets/img/icon/icon-jinzhun.png';

const readStatus = (text, record) => {
	const { isRead, isDeleted } = record;
	return (
		<React.Fragment>
			{isDeleted ? <img src={accurate} alt="" className="yc-assets-info-img" /> : null}
			<span className={!isRead ? 'yc-table-read' : 'yc-table-unread'} />
			<span>{text}</span>
		</React.Fragment>
	);
};
export default readStatus;
