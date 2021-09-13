import React, { useState, useRef, useEffect } from 'react';
import { Icon as IconA } from 'antd';
import { Button, Ellipsis, Icon } from '@/common';
import '../../style.scss';

function BackruptcyItem(props) {
	const [status, setStatus] = useState('none');
	const vRef = useRef();
	const {
		applicants, respondents, title, gmtPublish, url, relateNoticeCount, caseNumber, id, notices, isPortraitInquiry, handleOpenModal,
	} = props || {};
	const ModalHtml = (
		<Button onClick={() => handleOpenModal(isPortraitInquiry, id, notices)} style={{ padding: '1px 9px' }} className="auction-history-btn">
			<Icon type="icon-guanliangonggao" style={{ fontSize: 13, marginRight: 4 }} />
			查看关联公告
		</Button>
	);
	const obj = isPortraitInquiry ? {
		lableA: '申  请  人：', valA: applicants, lableB: '被申请人：', valB: respondents, width: '60px',
	} : {
		lableA: '最新公告：', valA: title, lableB: '最新公告日期：', valB: gmtPublish, width: '84px',
	};
	const flagA = isPortraitInquiry || relateNoticeCount; // 债务人详情 - 当公告数等于0时不显示最新公告和最新公告日期
	const flagB = relateNoticeCount && isPortraitInquiry; // 画像查询/债务人详情 - 当公告数大于0时，显示查看关联公告，不然不显示
	const toggleObj = vStatus => (vStatus === 'close' ? { text: '展开', icon: 'down' } : { text: '收起', icon: 'up' });
	const f = i => (i || '-');
	const brackets = (i = '') => i.replace('（', '(').replace('）', ')');
	useEffect(() => {
		const { clientHeight } = vRef.current;
		if (isPortraitInquiry && clientHeight > 36 && status === 'none') {
			setStatus('close');
		}
	}, [status]);
	return (
		<div className="backruptcy-table-left-content">
			<div className="backruptcy-table-left-content-title" style={{ marginBottom: flagB ? '3px' : '' }}>
				<div className="backruptcy-table-left-content-title-val">
					{
						flagB ? <Ellipsis content={brackets(caseNumber)} width={350} tooltip /> : brackets(caseNumber)
					}
				</div>
				{flagB ? ModalHtml : null}
			</div>
			{
				flagA ? (
					<div className="backruptcy-table-left-content-main">
						<li className="backruptcy-table-left-content-main-item">
							<div className="backruptcy-table-left-content-main-item-label" style={{ minWidth: obj.width }}>
								{obj.lableA}
							</div>
							<div className="backruptcy-table-left-content-main-item-val">
								{
									isPortraitInquiry ? f(obj.valA)
										: <Ellipsis content={f(obj.valA)} url={url} isSourceLink width={266} tooltip />
								}
								{!isPortraitInquiry && ModalHtml}
							</div>

						</li>
						<li className="backruptcy-table-left-content-main-item">
							<div className="backruptcy-table-left-content-main-item-label" style={{ minWidth: obj.width }}>
								{obj.lableB}
							</div>
							<div className="backruptcy-table-left-content-main-item-val">
								<div ref={vRef} className={status === 'close' ? 'ellipsis' : ''}>
									 {f(obj.valB)}
								</div>
								{
									status !== 'none' ?	(
										<div className="backruptcy-table-left-content-main-item-val-toggle">
											<div style={{ height: '18px' }}>{status === 'close' ? '...' : ''}</div>
											<div className="action-btn yc-text-normal" onClick={() => setStatus(status === 'close' ? 'open' : 'close')}>
												<span className="action-btn-text">{toggleObj(status).text}</span>
												<IconA type={toggleObj(status).icon} />
											</div>
										</div>
									) : null
								}
							</div>
						</li>
					</div>
				) : null
			}
		</div>
	);
}
export default BackruptcyItem;
