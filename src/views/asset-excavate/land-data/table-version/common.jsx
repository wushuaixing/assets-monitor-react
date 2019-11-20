import React from 'react';
import { Tooltip } from 'antd';
import { formatDateTime } from '@/utils/changeTime';
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
										<span className="yc-table-text-link">
											{`${row.projectName.substr(0, 20)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span className="yc-table-text-link">
										{row.projectName || '-'}
									</span>
								)
						}
					</span>
				</li>
				<li>
					<span className="list">
						<span>
							{row.approvers || '-'}
						</span>
						<span style={{ marginLeft: 20 }}>{row.administrativeRegion || '-'}</span>
					</span>
				</li>
				<div className="yc-table-content">
					<span className="list list-title align-justify">签订日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{formatDateTime(row.singedDate, 'onlyYear') || '-'}</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">面积</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{row.area || '-'}
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
	resultRelatedInfo: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-content">
						<span className="yc-purchasePrice-icon" />
						{`成交价格 ${row.purchasePrice}万元`}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">批准单位</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.approvers || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">供地方式</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.landUse || '-'}</span>
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
							row.projectName && row.projectName.length > 20
								? (
									<Tooltip placement="topLeft" title={row.projectName}>
										<span className="yc-table-text-link">
											{`${row.projectName.substr(0, 20)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span className="yc-table-text-link">
										{row.projectName || '-'}
									</span>
								)
						}
					</span>
				</li>
				<li>
					<span className="list">
						<span>
							{row.approvers || '-'}
						</span>
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">原土地使用权人</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">五华县长安实业发展有限公司</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">现土地使用权人</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
					何萍
					</span>
				</li>
				<div className="yc-table-content">
					<span className="list list-title align-justify">成交日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{formatDateTime(row.singedDate, 'onlyYear') || '-'}</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">面积</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{row.area || '-'}
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
						{`成交价格 ${row.purchasePrice}万元`}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">转让方式</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">买卖</span>
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
							row.projectName && row.projectName.length > 20
								? (
									<Tooltip placement="topLeft" title={row.projectName}>
										<span className="yc-table-text-link">
											{`${row.projectName.substr(0, 20)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span className="yc-table-text-link">
										{row.projectName || '-'}
									</span>
								)
						}
					</span>
				</li>
				<li>
					<span className="list">
						<span>
							{row.approvers || '-'}
						</span>
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">抵押人</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">五华县长安实业发展有限公司</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">抵押权人</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
					何萍
					</span>
				</li>
				<div className="yc-table-content">
					<span className="list list-title align-justify">登记日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{formatDateTime(row.singedDate, 'onlyYear') || '-'}</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">面积</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{row.area || '-'}
						公顷
					</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">评估金额</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">7590.0000万元</span>
					<div className="yc-table-line" />
					<span className="list list-title align-justify">土地使用权证号</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">0036539</span>
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
						{`抵押金额 ${row.purchasePrice || '-'}万元`}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">抵押面积</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{row.area || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">土地他项权证号</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">0071251</span>
				</li>
				<li>
					<span className="list list-title align-justify">登记结束日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						<span className="list list-content">{formatDateTime(row.singedDate, 'onlyYear') || '-'}</span>
					</span>
				</li>
			</div>
		</React.Fragment>
	),
};
export { Result, Transfer, Mortgage };
