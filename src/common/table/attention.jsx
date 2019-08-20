import React from 'react';
import { message } from 'antd';


const modalPro = (props) => {
	const {
		row: { id, isAttention }, onClick, api, index,
	} = props;
	const _isAttention = !isAttention;
	// console.log(props);
	api({ idList: [id] }, _isAttention).then((res) => {
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
			className={`yc-list-attention ${isAttention ? 'yc-list-attention-ed' : 'yc-list-attention-un'}`}
			onClick={() => (onClick ? modalPro(props) : null)}
		/>
	);
};
export default Attentions;
