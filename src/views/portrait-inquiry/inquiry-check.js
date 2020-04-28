import React from 'react';
import { Modal, message } from 'antd';
import { navigate } from '@reach/router';
import { inquiryLimit } from 'api/portrait-inquiry';

const contentStr = num => React.createElement('p', { style: { fontSize: 14 } },
	React.createElement('span', { style: { marginBottom: 6 } }, '点击确认，将消耗1次查询次数，返回债务人相关资产、风险等各维度信息的综合查询结果。'),
	React.createElement('br', null),
	React.createElement('br', null),
	React.createElement('span', {}, '当前查询剩余次数：'),
	React.createElement('b', { color: '#4E5566' }, ` ${num || 5555} 次`));

export const inquiryCheck = (url, type, remind = true) => {
	if (global.PORTRAIT_INQUIRY_ALLOW && type === 2) {
		return inquiryLimit().then((res) => {
			const { portraitLimitCount, portraitLimitUseCount } = res.data;
			const degree = portraitLimitCount - portraitLimitUseCount;
			if (degree > 0 && remind) {
				Modal.confirm({
					title: '确定查询此债务人画像？',
					content: contentStr(degree),
					iconType: 'exclamation-circle',
					className: 'message-confirm-icon',
					onOk() {
						if (url)navigate(url);
					},
					onCancel() {},
				});
			} else {
				message.warning('画像查询次数已用完，若需获取更多查询次数请联系销售或客服！', 50);
			}
		});
	}
	return new Promise(resolve => resolve()).then(() => {
		if (url)navigate(url);
	});
};

export const noneRemind = affirm => inquiryLimit().then((res) => {
	const { portraitLimitCount, portraitLimitUseCount } = res.data;
	const degree = portraitLimitCount - portraitLimitUseCount;
	// eslint-disable-next-line no-shadow
	return new Promise((resolve, reject) => {
		if (affirm) {
			Modal.confirm({
				title: '确定查询此债务人画像？',
				content: contentStr(degree),
				iconType: 'exclamation-circle',
				className: 'message-confirm-icon',
				onOk() {
					resolve();
				},
				onCancel() {
					navigate('/inquiry');
					// eslint-disable-next-line prefer-promise-reject-errors
					return reject('出错了');
				},
			});
		} else {
			resolve();
		}
	});
});
