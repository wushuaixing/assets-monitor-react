import React from 'react';
import { Tooltip } from 'antd';
import './style.scss';
import { getByteLength } from '@/utils';
import { Modal } from '../../../../../patchs/antd';
import PartyCrosswiseDetail from '@/views/_common/party-crosswise';
import { partyInfo } from '@/views/_common';

export const PartyCrosswise = (props) => {
	const { value, row, name } = props;
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

	const toShowDetail =	() => Modal.info({
		title: `${name}`,
		okText: '确定',
		iconType: 'null',
		className: 'assets-an-info',
		content: (
			<div style={{ marginLeft: -28, maxHeight: 400, overflow: 'auto' }}>
				<div style={{ padding: 15 }}>
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
	return '-';
};

const Transfer = {
	transferDetail: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
					<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>
						{
							row.landAddress && row.landAddress.length > 20
								? (
									<Tooltip placement="topLeft" title={row.landAddress}>
										<a href={row.url.length > 1 && row.url} target="_blank" rel="noopener noreferrer" className={row.url.length > 1 ? 'yc-table-text-link' : ''}>
											{`${row.landAddress.substr(0, 20)}...`}
										</a>
									</Tooltip>
								)
								: (
									<a href={row.url.length > 1 && row.url} target="_blank" rel="noopener noreferrer" className={row.url.length > 1 ? 'yc-table-text-link' : ''}>
										{row.landAddress || '-'}
									</a>
								)
						}
					</span>
					{ row.landUse ? <span className="yc-case-reason text-ellipsis">{row.landUse || '-'}</span> : ''}
				</li>
				<li>
					<span className="list">
						<span>
							{row.administrativeRegion || '-'}
						</span>
					</span>
				</li>
				<PartyCrosswise value={row.parties} row={row} name="土地转让" type="transfer" />
				<div className="yc-table-content">
					<span className="list list-title align-justify">成交日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.dealingTime || '-'}</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">面积</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{row.landArea || '-'}
						公顷
					</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">使用年限</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{`${row.landUsageTerm} 年` || '-'}
					</span>
				</div>

			</div>
		</React.Fragment>
	),
	transferRelatedInfo: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-content">
						<span className="yc-purchasePrice-icon" />
						{row.transferPrice && row.transferPrice > 0 ? `转让价格 ${row.transferPrice}万元` : '转让价格 -'}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">转让方式</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.transferMode || '-'}</span>
				</li>
			</div>
		</React.Fragment>
	),
};

const Mortgage = {
	mortgageDetail: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
					<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>
						{
							row.landAddress && row.landAddress.length > 20
								? (
									<Tooltip placement="topLeft" title={row.landAddress}>
										<a href={row.url.length > 1 && row.url} target="_blank" rel="noopener noreferrer" className={row.url.length > 1 ? 'yc-table-text-link' : ''}>
											{`${row.landAddress.substr(0, 20)}...`}
										</a>
									</Tooltip>
								)
								: (
									<a href={row.url.length > 1 && row.url} target="_blank" rel="noopener noreferrer" className={row.url.length > 1 ? 'yc-table-text-link' : ''}>
										{row.landAddress || '-'}
									</a>
								)
						}
					</span>
					{ row.landUse ? <span className="yc-case-reason text-ellipsis">{row.landUse}</span> : ''}
				</li>
				<li>
					<span className="list">
						<span>
							{row.administrativeRegion || '-'}
						</span>
					</span>
				</li>
				<PartyCrosswise value={row.parties} row={row} name="土地抵押" type="mortgage" />
				<div className="yc-table-content">
					<span className="list list-title align-justify">登记日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.startTime || '-'}</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">面积</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{row.landArea || '-'}
						公顷
					</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">评估金额</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{`${row.consultPrice}万元`}
					</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">土地使用权证号</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.landUseCertificateNumber || '-'}</span>
				</div>

			</div>
		</React.Fragment>
	),
	mortgageRelatedInfo: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-content">
						<span className="yc-purchasePrice-icon" />
						{`抵押金额 ${row.mortgageAmount || '-'}万元`}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">抵押面积</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{row.mortgageArea || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">土地他项权证号</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.otherObligeeCertificateNumber || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">登记结束日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						<span className="list list-content">{row.endTime || '-'}</span>
					</span>
				</li>
			</div>
		</React.Fragment>
	),
};
export { Transfer, Mortgage };
