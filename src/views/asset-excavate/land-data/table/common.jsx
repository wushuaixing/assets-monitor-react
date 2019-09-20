import React from 'react';
// import { Tooltip } from 'antd';
// import { linkDom } from '@/utils';

const Result = {
	InfoProject: (text, rowContent) => {
		const { obligorId } = rowContent;
		return (
			<React.Fragment>
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify">项目名称：</span>
						<span className="list list-content text-ellipsis">{'--' || obligorId}</span>
						{/* <Tooltip placement="top" title="----"> */}
						{/* <span className="list list-content text-ellipsis click-link">--</span> */}
						{/* </Tooltip> */}
						{/* {linkDom(`/#/business/debtor/detail?id=${obligorId}`, obligorName)} */}
					</li>
					<li>
						<span className="list list-title align-justify">行政区划：</span>
						<span className="list list-content">--</span>
					</li>
					<li>
						<span className="list list-title align-justify">具体坐落：</span>
						<span className="list list-content">--</span>
					</li>
					{/* <li> */}
					{/* <span className="list list-title">机构名称：</span> */}
					{/* /!* { *!/ */}
					{/* /!* orgName ? ( *!/ */}
					{/* /!* <Tooltip placement="top" title={orgName}> *!/ */}
					{/* /!* <span className="list list-content text-ellipsis ">{orgName}</span> *!/ */}
					{/* /!* </Tooltip> *!/ */}
					{/* /!* ) : <span className="list list-content text-ellipsis">-- </span> *!/ */}
					{/* /!* } *!/ */}
					{/* </li> */}
					{/* <li className="list-dishonest"> */}
					{/* <span className="list list-title">更新时间：</span> */}
					{/* <span className="list list-content">{updateTime ? new Date(updateTime * 1000).format('yyyy-MM-dd hh:mm') : '--'}</span> */}
					{/* </li> */}
				</div>
			</React.Fragment>
		);
	},
	InfoLand: (text, rowContent) => {
		const { obligorId } = rowContent;
		return (
			<React.Fragment>
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify">土地用途：</span>
						<span className="list list-content text-ellipsis">{'--' || obligorId}</span>
					</li>
					<li>
						<span className="list list-title align-justify">面　　积：</span>
						<span className="list list-content">--</span>
					</li>
					<li>
						<span className="list list-title align-justify">使用年限：</span>
						<span className="list list-content">--</span>
					</li>
				</div>
			</React.Fragment>
		);
	},
	InfoTransfer: (text, rowContent) => {
		const { obligorId } = rowContent;
		return (
			<React.Fragment>
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify">供地方式：</span>
						<span className="list list-content text-ellipsis">{'--' || obligorId}</span>
					</li>
					<li>
						<span className="list list-title align-justify">批准单位：</span>
						<span className="list list-content">--</span>
					</li>
					<li>
						<span className="list list-title align-justify">成交价格：</span>
						<span className="list list-content">--</span>
					</li>
				</div>
			</React.Fragment>
		);
	},
};
const Transfer = {
	AssetsInfo: (text, rowContent) => <div>{text || rowContent}</div>,
};


export { Result, Transfer };
