import React from 'react';
import { Popover, Tooltip, Button } from 'antd';
import QRCode from 'qrcode.react';
import './style.scss';

const PopCode = (props) => {
	const {
		ktModalSourceLinkIcon, wsSourceLink, showContent, content, tooltip, url, target, className, style, click, isSourceLink, renderAs, size, bgColor, fgColor, level, includeMargin,
	} = props;

	// 手动跳转源链接
	const handleJumpSourceLink = () => {
		const w = window.open('about:blank');
		w.location.href = url;
	};

	// 二维码
	const popContent = (
		<div className="yc-qrCode-element">
			<QRCode
				value={url}
				renderAs={renderAs || 'canvas'}
				size={size || 144}
				bgColor={bgColor || '#FFFFFF'}
				fgColor={fgColor || '#000000'}
				level={level || 'L'}
				includeMargin={includeMargin || false}
			/>
			<p>扫描上方二维码，即可查看源链接</p>
		</div>
	);

	// 开庭modal框中链接的图片（改成字符串是为了配合 “拍卖信息-信息搜索” 页面资产匹配信息title）
	const imgToString = `<img class="linkPic" src="${ktModalSourceLinkIcon}" alt="${content}"></img>`;

	const contentDom = ktModalSourceLinkIcon ? imgToString	: showContent || content;

	const linkDom = url
		? (
			<a
				href={url}
				className={`click-link${className ? ` ${className}` : ''}`}
				rel="noopener noreferrer"
				target={target || '_blank'}
				style={style}
				onClick={click}
				dangerouslySetInnerHTML={{ __html: contentDom }}
			/>
		)
		: <span>{contentDom}</span>;

	// 判断是否需要tooltip
	const tooltipDom = tooltip ? <Tooltip placement="top" title={content}><div>{linkDom}</div></Tooltip> : <div>{linkDom}</div>;

	// 文书中源链接dom
	const sourceBtnDom = <Button className="judgement-header-btn">{content}</Button>;

	const otherDom = wsSourceLink ? <div onClick={() => { handleJumpSourceLink(); }}>{sourceBtnDom}</div> : <div>{tooltipDom}</div>;
	return (
		<div style={{ display: 'inline-block' }}>
			{
				global.IS_SPECIAL_LINE && isSourceLink && url ? (
					<Popover content={popContent} trigger="click" placement={wsSourceLink ? 'bottomRight' : 'topLeft'} overlayClassName="yc-popover-element">
						{wsSourceLink ? sourceBtnDom : <div>{tooltipDom}</div>}
					</Popover>
				)
					: <div>{ otherDom }</div>
			}
		</div>
	);
};
export default PopCode;
