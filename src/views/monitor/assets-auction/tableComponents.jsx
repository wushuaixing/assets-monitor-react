import React from 'react';
import { Tooltip } from 'antd';
import accurate from '@/assets/img/icon/icon-jinzhun.png';
import dishonest1 from '@/assets/img/icon/icon_shixin.png';
import dishonest2 from '@/assets/img/icon/icon_cengshixin.png';
import Matching from './matching-reason';
import { floatFormat } from '@/utils/format';

const AssetsInfo = (text, rowContent, noMatching = false) => {
	const {
		obligorName, obligorNumber, orgName, updateTime, important, dishonestStatus,
	} = rowContent;
	return (
		<React.Fragment>
			{important === 1 && !noMatching ? <img src={accurate} alt="" className="yc-assets-info-img" /> : null}
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">债 务 人：</span>
					{
						obligorName ? (
							<Tooltip placement="top" title={obligorName}>
								<span className="list list-content text-ellipsis click-link">{obligorName}</span>
							</Tooltip>
						) : <span className="list list-content text-ellipsis">-- </span>
					}
				</li>
				<li>
					<span className="list list-title align-justify">证 件 号：</span>
					<span className="list list-content">{obligorNumber || '--'}</span>
				</li>
				<li>
					<span className="list list-title">机构名称：</span>
					{
						orgName ? (
							<Tooltip placement="top" title={orgName}>
								<span className="list list-content text-ellipsis ">{orgName}</span>
							</Tooltip>
						) : <span className="list list-content text-ellipsis">-- </span>
					}
				</li>
				<li className="list-dishonest">
					<span className="list list-title">更新时间：</span>
					<span className="list list-content">{updateTime ? new Date(updateTime * 1000).format('yyyy-MM-dd hh:mm') : '--'}</span>
					{ dishonestStatus === 1 ? <img src={dishonest1} alt="" className="list-dishonest-status" /> : ''}
					{ dishonestStatus === 2 ? <img src={dishonest2} alt="" className="list-dishonest-status" /> : ''}
				</li>
			</div>
		</React.Fragment>
	);
};

const MatchingReason = (text, content) => <Matching content={content} />;

const AuctionInfo = (text, rowContent) => {
	const {
		title, url, court, consultPrice, start, currentPrice, status,
	} = rowContent;
	const auctionStatus = (s) => {
		let res = '--';
		switch (s) {
		case 1: res = '即将开始'; break;
		case 3: res = '正在进行'; break;
		case 5: res = '已成交'; break;
		case 7: res = '已流拍'; break;
		case 9: res = '中止'; break;
		case 11: res = '撤回'; break;
		default: res = '--';
		}
		return res;
	};
	return (
		<div className="yc-assets-table-info">
			{
				title || url ? (
					<Tooltip placement="top" title={title}>
						<a
							className="table-info-title text-ellipsis click-link"
							href={url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{title || url}
						</a>
					</Tooltip>
				) : <div className="table-info-title ">--</div>
			}
			<li className="table-info-list list-width-180">
				<span className="info info-title">处置机关：</span>
				{
					court ? (
						<Tooltip placement="top" title={court}>
							<span className="info info-content text-ellipsis list-width-120 cursor-pointer">{court}</span>
						</Tooltip>
					) : <span className="info info-content">未知</span>
				}
			</li>
			<li className="table-info-list ">
				<span className="info info-title">评估价：</span>
				<span className="info info-content">{consultPrice ? `${floatFormat(consultPrice.toFixed(2))} 元` : '未知'}</span>
			</li>
			<br />
			<li className="table-info-list list-width-180">
				<span className="info info-title">开拍时间：</span>
				<span className="info info-content">{start ? new Date(start * 1000).format('yyyy-MM-dd hh:mm') : '未知'}</span>
			</li>
			{
				status === 5 ? (
					<li className="table-info-list ">
						<span className="info info-title">成交价：</span>
						<span className="info-content info-over">
							{currentPrice ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
						</span>
					</li>
				) : (
					<li className="table-info-list ">
						<span className="info info-title">当前价：</span>
						<span className="info-content">
							{currentPrice ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
						</span>
					</li>
				)
			}
			<br />
			<li className="table-info-list list-width-180">
				<span className="info info-title">拍卖状态：</span>
				<span className={`info info-content${status ? ` info-auction-${status}` : ''}`}>{auctionStatus(status)}</span>
			</li>
		</div>
	);
};

export { AssetsInfo, MatchingReason, AuctionInfo };
