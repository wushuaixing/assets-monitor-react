import React from 'react';
import { Tooltip } from 'antd';
import { formatDateTime } from '@/utils/changeTime';
// import { linkDom } from '@/utils';

const Result = {
	InfoProject: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>项目名称：</span>
					<span className="list list-content text-ellipsis" style={{ color: '#186fc7' }}>
						{/* {rowContent.projectName || '-'} */}
						{
							rowContent.projectName && rowContent.projectName.length > 10
								? (
									<Tooltip placement="topLeft" title={rowContent.projectName}>
										<a href={rowContent.url.length > 1 && rowContent.url} target="_blank" rel="noopener noreferrer" className={rowContent.url.length > 1 ? 'yc-table-text-link' : ''}>
											{`${rowContent.projectName.substr(0, 10)}...`}
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
					<span className="list list-title align-justify" style={{ width: 80 }}>行政区划：</span>
					<span className="list list-content">{rowContent.administrativeRegion || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>具体坐落：</span>
					<span className="list list-content">
						{/* {rowContent.landAddress || '-'} */}
						{
							rowContent.landAddress && rowContent.landAddress.length > 10
								? (
									<Tooltip placement="topLeft" title={rowContent.landAddress}>
										<span>
											{`${rowContent.landAddress.substr(0, 10)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{rowContent.landAddress || '-'}
									</span>
								)
						}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoLand: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>土地用途：</span>
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
					<span className="list list-title align-justify" style={{ width: 80 }}>面　　积：</span>
					<span className="list list-content">
						{rowContent.landArea || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>使用年限：</span>
					{rowContent.transferTerm ? (
						<span className="list list-content">
							{`${rowContent.transferTerm} 年` || '-'}
						</span>
					) : (
						<span className="list list-content">
							{`${rowContent.landUsageTerm} 年` || '-'}
						</span>
					)}
				</li>
			</div>
		</React.Fragment>
	),
	InfoTransfer: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>供地方式：</span>
					<span className="list list-content text-ellipsis">{rowContent.supplyWay || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>批准单位：</span>
					<span className="list list-content">{rowContent.approver || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>成交价格：</span>
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
					<span className="list list-title align-justify" style={{ width: 80 }}>宗地坐落：</span>
					<span className="list list-content text-ellipsis">
						{
							rowContent.landAddress && rowContent.landAddress.length > 6
								? (
									<Tooltip placement="topLeft" title={rowContent.landAddress}>
										<a href={rowContent.url.length > 1 && rowContent.url} target="_blank" rel="noopener noreferrer" className={rowContent.url.length > 1 ? 'yc-table-text-link' : ''}>
											{`${rowContent.landAddress.substr(0, 6)}...`}
										</a>
									</Tooltip>
								)
								: (
									<a href={rowContent.url.length > 1 && rowContent.url} target="_blank" rel="noopener noreferrer" className={rowContent.url.length > 1 ? 'yc-table-text-link' : ''}>
										{rowContent.landAddress || '-'}
									</a>
								)
						}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>行政区划：</span>
					<span className="list list-content text-ellipsis">
						{/* {rowContent.landUse || '-'} */}
						{
							rowContent.administrativeRegion && rowContent.administrativeRegion.length > 10
								? (
									<Tooltip placement="topLeft" title={rowContent.administrativeRegion}>
										<span>
											{`${rowContent.administrativeRegion.substr(0, 10)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{rowContent.administrativeRegion || '-'}
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
					<span className="list list-title align-justify" style={{ width: 80 }}>转让方式：</span>
					<span className="list list-content text-ellipsis">{rowContent.transferMode || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>转让价格：</span>
					<span className="list list-content">
						{rowContent.transferPrice ? `${rowContent.transferPrice} 万元` : '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoMortgageLand: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>土地用途：</span>
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
					<span className="list list-title align-justify" style={{ width: 80 }}>面　　积：</span>
					<span className="list list-content">
						{rowContent.landArea || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>评估金额：</span>
					<span className="list list-content">
						{rowContent.consultPrice ? `${rowContent.consultPrice} 万元` : '-'}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>土地使用权证号：</span>
					<span className="list list-content">
						{rowContent.landUseCertificateNumber || '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoMortgage: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>抵押面积：</span>
					<span className="list list-content">
						{rowContent.mortgageArea || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 80 }}>抵押金额：</span>
					<span className="list list-content">
						{rowContent.mortgageAmount ? `${rowContent.mortgageAmount} 万元` : '-'}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>土地他项权证号：</span>
					<span className="list list-content">
						{rowContent.otherObligeeCertificateNumber || '-'}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>登记结束日期：</span>
					<span className="list list-content">
						{`${formatDateTime(rowContent.endTime, 'onlyYear')}` || '-'}
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