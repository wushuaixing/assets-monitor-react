import React from 'react';
import { message } from 'antd';
import { Icon } from '@/common';

const modalPro = (props) => {
	const {
		row: { id, isAttention }, onClick, api, index, single,
	} = props;
	const _isAttention = !isAttention;
	// console.log(props);
	const params = single ? { id } : { idList: [id] };
	api(params, _isAttention).then((res) => {
		if (res.code === 200) {
			if (isAttention) {
				message.success('已取消关注本条信息');
			} else {
				message.success('已关注本条信息');
			}
			onClick({ id, isAttention: _isAttention, index }, 'isAttention');
		}
	});
};
const Attentions = (props) => {
	const { row: { isAttention }, onClick } = props;

	return (
		<div
			// className={`yc-list-attention ${isAttention ? 'yc-list-attention-ed' : 'yc-list-attention-un'}`}
			onClick={() => (onClick ? modalPro(props) : null)}
		>
			{
				isAttention ? (
					<Icon
						type="icon-follow"
						style={{ fontSize: 16, color: '#7D8699', cursor: 'pointer' }}
					/>
				) : (
					<Icon
						type="icon-follow-ed"
						style={{ fontSize: 16, color: '#FB8E3C', cursor: 'pointer' }}
					/>
				)
			}
		</div>
	);
};
export default Attentions;
