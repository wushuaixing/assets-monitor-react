import React from 'react';
import { message } from 'antd';
import { Icon } from '@/common';

const modalPro = (props) => {
	const {
		row: { id, isAttention }, onClick, api, index, single,
	} = props;
	console.log(single);
	const _isAttention = !isAttention;
	const params = single ? { id } : { idList: [id] };
	api(params, _isAttention).then((res) => {
		if (res.code === 200) {
			if (isAttention) {
				message.success('已取消收藏');
			} else {
				message.success('收藏成功');
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
						type="icon-follow-ed"
						className="yc-isAttention"
						// type="icon-follow"
						// className="yc-normal-isAttention"
					/>
				) : (
					<Icon
						type="icon-follow"
						className="yc-normal-isAttention"
					/>
				)
			}
		</div>
	);
};
export default Attentions;
