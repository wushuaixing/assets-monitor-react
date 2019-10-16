import React from 'react';
import { Modal } from 'antd';
import { getByteLength } from '@/utils';
import PartyInfoDetail from './party-info';
import './style.scss';

/* // 案号 - 弹窗 */
export const caseInfo = (content, row) => {
	const { isDelete, ygList } = row;
	const ygListLength = window._.isArray(ygList) ? ygList.length : 0;
	if (isDelete || !ygListLength) return content || '--';
	const toClick =	() => Modal.info({
		title: '当事人详情',
		okText: '确定',
		iconType: 'null',
		className: 'assets-an-info',
		content: (
			<div style={{ marginLeft: -28, maxHeight: 400, overflow: 'auto' }}>
				{
					row.ygList && row.ygList.map(item => (
						<p style={{ margin: 5, fontSize: 14 }}>
							<strong>{`${item.ssdw}：`}</strong>
							<span>{item.mc}</span>
						</p>
					))
				}
			</div>
		),
		onOk() {},
	});
	return <span className="click-link" onClick={toClick}>{content}</span>;
};

/**
 * 数据列表 - 当事人
 * */
export const partyInfo = (value, row) => {
	// 处理 当事人数据列表，分类
	const handleParties = (data) => {
		const source = [];
		data.forEach((i) => {
			if (source.length === 0) {
				source.push({
					index: source.length,
					role: i.role,
					child: [i],
				});
			} else {
				const _result = source.filter(item => item.role === i.role)[0];
				if (_result) {
					source[_result.index].child.push(i);
				} else {
					source.push({
						index: source.length,
						role: i.role,
						child: [i],
					});
				}
			}
		});
		return source;
	};
	// 获取 字符最大长度
	const toGetStrWidth = (list) => {
		let maxRoleName = '';
		list.forEach((item) => {
			const { role } = item;
			const _site = role.indexOf('（') > -1 ? role.indexOf('（') : '';
			const _role = _site ? role.slice(0, _site) : role;
			maxRoleName = _role.length > maxRoleName.length ? _role : maxRoleName;
		});
		return getByteLength(maxRoleName) * 6 * 1.05;
	};
	if (typeof value === 'object') {
		if (value.length) {
			const source = handleParties(value);
			const maxWidth = toGetStrWidth(source);
			return source.map(item => (
				<PartyInfoDetail {...item} id={row.id} key={row.id} width={maxWidth} />
			));
		}
	}
	return '--';
};
