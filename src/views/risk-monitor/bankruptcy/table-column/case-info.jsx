import React, { useState } from 'react';
import { Icon } from 'antd';

function CaseInfo(props) {
	const [statusA, setStatusA] = useState(false);
	const [statusB, setStatusB] = useState(false);
	const brackets = (i = '') => i.replace('（', '(').replace('）', ')');
	const {
		caseNumber = '', court = '',
	} = props;
	const caseNumberList = caseNumber.split('^');
	const courtList = court.split('、');
	const obj = status => (status ? { text: '收起', icon: 'up' } : { text: '展开', icon: 'down' });
	const arr = [
		{
			label: '案号', list: caseNumberList, sliceNumber: 3, status: statusA, fn: setStatusA,
		},
		{
			label: '受理法院', list: courtList, sliceNumber: 2, status: statusB, fn: setStatusB,
		},
	];
	return (
		<ul className="case-info-content">
			{
				arr.map((i) => {
					const {
						label, list = [], sliceNumber, status, fn,
					} = i || {};
					const vList = (list.slice(0, status ? list.length : sliceNumber)).map(j => brackets(j));
					const { length } = list || [];
					return 	(
						<li className="case-info-content-item" key={label}>
							<div className="case-info-content-item-label">
								<span>{label}</span>
								：
							</div>
							<div className="case-info-content-item-val">
								{
									length ? vList.map(item => <p>{item}</p>) : '-'
								}
								{
									length > sliceNumber
										? (
											<div className="action-btn yc-text-normal" onClick={() => fn(!status)}>
												<span>{obj(status).text}</span>
												<Icon type={obj(status).icon} />
											</div>
										)
										: null
								}
							</div>
						</li>
					);
				})
			}
		</ul>
	);
}
export default CaseInfo;
