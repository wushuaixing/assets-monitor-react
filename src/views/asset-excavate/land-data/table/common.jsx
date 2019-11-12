import React from 'react';
import { Tooltip } from 'antd';
// import { linkDom } from '@/utils';

const Result = {
	InfoProject: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">项目名称：</span>
					<span className="list list-content text-ellipsis" style={{ color: '#186fc7' }}>
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
					<span className="list list-content">{rowContent.landAddress || '-'}</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoLand: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">土地用途：</span>
					<span className="list list-content text-ellipsis">
						{/* {rowContent.landUse || '-'} */}
						{
							rowContent.landUse && rowContent.landUse.length > 6
								? (
									<Tooltip placement="topLeft" title={rowContent.landUse}>
										<span>
											{`${rowContent.landUse.substr(0, 6)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{rowContent.landUse || '-'}
									</span>
								)
						}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">面　　积：</span>
					<span className="list list-content">
						{rowContent.landArea || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">使用年限：</span>
					<span className="list list-content">
						{/* {rowContent.transferTerm || '-'} */}
						{
							rowContent.transferTerm && rowContent.transferTerm.length > 6
								? (
									<Tooltip placement="topLeft" title={rowContent.transferTerm}>
										<span>
											{`${rowContent.transferTerm.substr(0, 6)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{rowContent.transferTerm || '-'}
									</span>
								)
						}
					</span>
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
					<span className="list list-content">{rowContent.approver || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">成交价格：</span>
					<span className="list list-content">
						{rowContent.finalPrice ? `${rowContent.finalPrice} 万元` : '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	landUser: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>原土地使用权人：</span>
					<span className="list list-content text-ellipsis">
						{/* {rowContent.landUse || '-'} */}
						{
							rowContent.landUse && rowContent.landUse.length > 6
								? (
									<Tooltip placement="topLeft" title={rowContent.landUse}>
										<span>
											{`${rowContent.landUse.substr(0, 6)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{rowContent.landUse || '-'}
									</span>
								)
						}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>现土地使用权人：</span>
					<span className="list list-content">
						{rowContent.area || '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	landOwner: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 90 }}>土地抵押人：</span>
					<span className="list list-content text-ellipsis">
						{/* {rowContent.landUse || '-'} */}
						{
							rowContent.landUse && rowContent.landUse.length > 6
								? (
									<Tooltip placement="topLeft" title={rowContent.landUse}>
										<span>
											{`${rowContent.landUse.substr(0, 6)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{rowContent.landUse || '-'}
									</span>
								)
						}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 90 }}>土地抵押权人：</span>
					<span className="list list-content">
						{rowContent.area || '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoTransferProject: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">宗地坐落：</span>
					<span className="list list-content text-ellipsis">
						{/* {rowContent.landUse || '-'} */}
						{
							rowContent.landUse && rowContent.landUse.length > 6
								? (
									<Tooltip placement="topLeft" title={rowContent.landUse}>
										<span>
											{`${rowContent.landUse.substr(0, 6)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{rowContent.landUse || '-'}
									</span>
								)
						}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">行政区划：</span>
					<span className="list list-content text-ellipsis">
						{/* {rowContent.landUse || '-'} */}
						{
							rowContent.landUse && rowContent.landUse.length > 6
								? (
									<Tooltip placement="topLeft" title={rowContent.landUse}>
										<span>
											{`${rowContent.landUse.substr(0, 6)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{rowContent.landUse || '-'}
									</span>
								)
						}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	transferInfo: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">转让方式：</span>
					<span className="list list-content text-ellipsis">{rowContent.supplyWay || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">转让价格：</span>
					<span className="list list-content">
						{rowContent.purchasePrice ? `${rowContent.purchasePrice} 万元` : '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoMortgageLand: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">土地用途：</span>
					<span className="list list-content text-ellipsis">
						{/* {rowContent.landUse || '-'} */}
						{
							rowContent.landUse && rowContent.landUse.length > 6
								? (
									<Tooltip placement="topLeft" title={rowContent.landUse}>
										<span>
											{`${rowContent.landUse.substr(0, 6)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{rowContent.landUse || '-'}
									</span>
								)
						}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">面　　积：</span>
					<span className="list list-content">
						{rowContent.area || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">评估金额：</span>
					<span className="list list-content">
						{rowContent.purchasePrice ? `${rowContent.purchasePrice} 万元` : '-'}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>土地使用权证号：</span>
					<span className="list list-content">
						{rowContent.area || '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoMortgage: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">抵押面积：</span>
					<span className="list list-content">
						{rowContent.area || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">抵押金额：</span>
					<span className="list list-content">
						{rowContent.purchasePrice ? `${rowContent.purchasePrice} 万元` : '-'}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>土地他项权证号：</span>
					<span className="list list-content">
						{rowContent.area || '-'}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>登记结束日期：</span>
					<span className="list list-content">
						{rowContent.area || '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
};
const Transfer = {
	AssetsInfo: (text, rowContent) => <div>{text || rowContent}</div>,
};


export { Result, Transfer };
