import React, {
	useState, useRef, useEffect, Fragment,
} from 'react';
import { Icon as IconA } from 'antd';
import { Button, Ellipsis, Icon } from '@/common';
import '../../style.scss';

function BackruptcyItem(props) {
	const [statusA, setStatusA] = useState('none');
	const [statusB, setStatusB] = useState('none');
	const vRefA = useRef();
	const vRefB = useRef();
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
		lableA: '申请人', valA: applicants, lableB: '被申请人', valB: respondents, width: '48px',
	} : {
		lableA: '最新公告', valA: title, lableB: '最新公告日期', valB: gmtPublish, width: '72px',
	};
	const flagA = isPortraitInquiry || relateNoticeCount; // 债务人详情 - 当公告数等于0时不显示最新公告和最新公告日期
	const flagB = relateNoticeCount && isPortraitInquiry; // 画像查询/债务人详情 - 当公告数大于0时，显示查看关联公告，不然不显示
	const toggleObj = vStatus => (vStatus === 'close' ? { text: '展开', icon: 'down' } : { text: '收起', icon: 'up' });
	const f = i => (i || '-');
	const brackets = (i = '') => i.replace('（', '(').replace('）', ')');
	const ToggleHtml = ({ status, setStatus }) => (
		<div className="backruptcy-table-left-content-main-item-val-toggle">
			<div style={{ height: '18px' }}>{status === 'close' ? '...' : ''}</div>
			<div className="action-btn yc-text-normal" onClick={setStatus}>
				<span className="action-btn-text">{toggleObj(status).text}</span>
				<IconA type={toggleObj(status).icon} />
			</div>
		</div>
	);
	useEffect(() => {
		const { clientHeight } = vRefB.current;
		if (isPortraitInquiry && clientHeight > 36 && statusB === 'none') {
			setStatusB('close');
		}
	}, [statusB]);
	useEffect(() => {
		const { clientHeight } = vRefA.current;
		if (isPortraitInquiry && clientHeight > 36 && statusA === 'none') {
			setStatusA('close');
		}
	}, [statusA]);
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
							<div className="backruptcy-table-left-content-main-item-label">
								<span style={{ minWidth: obj.width }}>{obj.lableA}</span>
								：
							</div>
							<div className={`backruptcy-table-left-content-main-item-val ${isPortraitInquiry ? '' : 'align-center'}`}>
								 {
									isPortraitInquiry ? (
										<Fragment>
											<div ref={vRefA} className={statusA === 'close' ? 'ellipsis' : ''}>
												 {f(obj.valA)}
											</div>
											{
												statusA !== 'none' ?	<ToggleHtml status={statusA} setStatus={() => setStatusA(statusA === 'close' ? 'open' : 'close')} /> : null
											}
										</Fragment>
									)
										: <Ellipsis content={f(obj.valA)} url={url} isSourceLink width={266} tooltip />
								 }
								{!isPortraitInquiry && ModalHtml}
							</div>

						</li>
						<li className="backruptcy-table-left-content-main-item">
							<div className="backruptcy-table-left-content-main-item-label">
								<span style={{ minWidth: obj.width }}>
									{obj.lableB}
								</span>
								：
							</div>
							<div className="backruptcy-table-left-content-main-item-val">
								<div ref={vRefB} className={statusB === 'close' ? 'ellipsis' : ''}>
									{f(obj.valB)}
								</div>
								{
									statusB !== 'none' ?	<ToggleHtml status={statusB} setStatus={() => setStatusB(statusB === 'close' ? 'open' : 'close')} /> : null
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
