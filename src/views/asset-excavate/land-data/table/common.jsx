import React from 'react';
import { Tooltip } from 'antd';
// import { linkDom } from '@/utils';

const Result = {
	InfoProject: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">项目名称：</span>
					<span className="list list-content text-ellipsis" style={{ color: '#1C80E1' }}>
						{/* {rowContent.projectName || '-'} */}
						{
						rowContent.projectName && rowContent.projectName.length > 12
							? (
								<Tooltip placement="topLeft" title={rowContent.projectName}>
									<a href={rowContent.url.length > 1 && rowContent.url} target="_blank" rel="noopener noreferrer" className={rowContent.url.length > 1 ? 'yc-table-text-link' : ''}>
										{`${rowContent.projectName.substr(0, 12)}...`}
									</a>
								</Tooltip>
							)
							: (
								<a href={rowContent.url.length > 1 && rowContent.url} target="_blank" rel="noopener noreferrer" className={rowContent.url.length > 1 ? 'yc-table-text-link' : ''}>
									{rowContent.projectName || '-'}
								</a>
							)
					}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">行政区划：</span>
					<span className="list list-content">{rowContent.administrativeRegion || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">具体坐落：</span>
					<span className="list list-content">{rowContent.projectAddress || '-'}</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoLand: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">土地用途：</span>
					<span className="list list-content text-ellipsis">{rowContent.landUse || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">面　　积：</span>
					<span className="list list-content">
						{rowContent.area || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">使用年限：</span>
					<span className="list list-content">{rowContent.landUsageTerm || '-'}</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoTransfer: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">供地方式：</span>
					<span className="list list-content text-ellipsis">{rowContent.supplyWay || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">批准单位：</span>
					<span className="list list-content">{rowContent.approvers || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">成交价格：</span>
					<span className="list list-content">{rowContent.area || '-'}</span>
				</li>
			</div>
		</React.Fragment>
	),
};
const Transfer = {
	AssetsInfo: (text, rowContent) => <div>{text || rowContent}</div>,
};


export { Result, Transfer };
