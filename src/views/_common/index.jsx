import React from 'react';
import { Modal } from 'antd';
import { getByteLength, timeStandard } from '@/utils';
import PartyInfoDetail from './party-info';
import PartyCrosswiseDetail from './party-crosswise';
import './style.scss';

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
export const partyInfo = (value, row, noLink, noStatus, detailWidth) => {
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
				<PartyInfoDetail {...item} id={row.id} key={row.id} width={maxWidth} noLink noStatus={noStatus} detailWidth={detailWidth} />
			));
		}
	}
	return '--';
};

/**
 * 数据列表 - 当事人 - 横向
 * */
export const PartyCrosswise = (props) => {
	const { value, row, type } = props;

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
	const toShowDetail =	() => Modal.info({
		title: '当事人详情',
		okText: '确定',
		iconType: 'null',
		className: 'assets-an-info',
		content: (
			<div style={{ marginLeft: -28, maxHeight: 400, overflow: 'auto' }}>
				<div style={{ padding: 15 }}>
					<div className="assets-info-content">
						<li className="yc-public-normal-bold" style={{ marginBottom: 2 }}>
							<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>{row.caseNumber || '--'}</span>
						</li>
						<li>
							{ type === 'trial' ? [
								<span className="list list-title align-justify" style={{ width: 'auto' }}>立案日期</span>,
								<span className="list list-title-colon">:</span>,
								<span className="list list-content">{timeStandard(row.gmtRegister)}</span>,
							] : '' }
							{ type === 'court' ? [
								<span className="list list-title align-justify" style={{ width: 'auto' }}>开庭日期</span>,
								<span className="list list-title-colon">:</span>,
								<span className="list list-content">{timeStandard(row.gmtTrial)}</span>,
							] : '' }
							{ type === 'judgment' ? [
								<span className="list list-title align-justify" style={{ width: 'auto' }}>判决日期</span>,
								<span className="list list-title-colon">:</span>,
								<span className="list list-content">{timeStandard(row.gmtJudgment)}</span>,
							] : '' }
							<span className="list-split" style={{ height: 16 }} />
							<span className="list list-title align-justify" style={{ width: 'auto' }}>处置单位</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content" style={{ maxWidth: 300 }}>{row.court || '-'}</span>
						</li>
					</div>
					<hr />
					<div style={{ maxHeight: 400, overflow: 'auto' }}>
						{partyInfo(value, row, true, true, 400)}

					</div>
				</div>
			</div>
		),
		onOk() {},
	});
	if (typeof value === 'object') {
		if (value.length) {
			const source = handleParties(value);
			const maxWidth = toGetStrWidth(source);
			const detailStatus = Boolean(source.filter(i => i.child.length > 1).length);
			return (
				<div className="yc-party-crosswise">
					{
						source.map((item, index) => [
							<PartyCrosswiseDetail {...item} id={item.id} key={item.id} width={maxWidth} items={value} max={9999} />,
							index !== source.length - 1 ? <span className="yc-split-line yc-split-line-info" /> : null,
						])
					}
					{
						detailStatus ? <span className="click-link detail-style" onClick={toShowDetail}>详情</span> : null
					}
				</div>
			);
		}
	}
	return '--';
};