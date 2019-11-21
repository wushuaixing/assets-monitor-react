import React from 'react';
import { Tooltip } from 'antd';
import { PartyCrosswise } from '@/views/_common';
import './style.scss';

const Result = {
	resultDetail: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
					<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>
						{
								row.projectName && row.projectName.length > 20
									? (
										<Tooltip placement="topLeft" title={row.projectName}>
											<a href={row.url.length > 1 && row.url} target="_blank" rel="noopener noreferrer" className={row.url.length > 1 ? 'yc-table-text-link' : ''}>
												{`${row.projectName.substr(0, 20)}...`}
											</a>
										</Tooltip>
									)
									: (
										<a href={row.url.length > 1 && row.url} target="_blank" rel="noopener noreferrer" className={row.url.length > 1 ? 'yc-table-text-link' : ''}>
											{row.projectName || '-'}
										</a>
									)
							}
					</span>
				</li>
				<li>
					<span className="list">
						<span>
							{row.approver || '-'}
						</span>
						<span style={{ marginLeft: 20 }}>{row.administrativeRegion || '-'}</span>
					</span>
				</li>
				<div className="yc-table-content">
					<span className="list list-title align-justify">签订日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.singedTime || '-'}</span>
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
					<span className="list list-content">{row.transferTerm || '-'}</span>
				</div>

			</div>
		</React.Fragment>
	),
	resultRelatedInfo: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-content">
						<span className="yc-purchasePrice-icon" />
						{`成交价格 ${row.finalPrice}万元`}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">批准单位</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.approver || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">供地方式</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.supplyWay || '-'}</span>
				</li>
			</div>
		</React.Fragment>
	),
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
				</li>
				<li>
					<span className="list">
						<span>
							{row.administrativeRegion || '-'}
						</span>
					</span>
				</li>
				<PartyCrosswise value={row.parties} row={row} type="transfer" />
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
					<span className="list list-content">{row.landUsageTerm || '-'}</span>
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
					<span className="list list-content">{row.transferMode}</span>
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
				</li>
				<li>
					<span className="list">
						<span>
							{row.administrativeRegion || '-'}
						</span>
					</span>
				</li>
				<PartyCrosswise value={row.parties} row={row} type="mortgage" />
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
					<span className="list list-content">{row.landUseCertificateNumber}</span>
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
					<span className="list list-content">{row.otherObligeeCertificateNumber}</span>
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
export { Result, Transfer, Mortgage };
