import React from 'react';
import { Modal } from 'antd';
import { linkDom } from '@/utils';

// 关联连接 组件
export const aboutLink = (value, row) => {
	const toShow = (source) => {
		Modal.info({
			title: '本案号关联多个立案链接，如下：',
			okText: '确定',
			iconType: 'null',
			width: 600,
			content: (
				<div style={{ marginLeft: -28 }}>
					{ source.map(item => (<p style={{ margin: 5 }}>{linkDom(item, item)}</p>)) }
				</div>
			),
			onOk() {},
		});
	};
	if (row.isDeleted) return null;

	const La = (value.filter(item => item.sourceType === 1))[0];
	const Kt = (value.filter(item => item.sourceType === 2))[0];
	const Ws = (value.filter(item => item.sourceType === 3))[0];
	// console.log(La, Kt, Ws);
	const resContent = [];

	if (La && La.url.length) {
		if (La.url.length > 1) {
			resContent.push(<span className="click-link" onClick={() => toShow(La.url)}>立案</span>);
		} else if (La.url.length === 1) {
			resContent.push(linkDom(La.url[0], '立案'));
		}
	}
	if (Kt && Kt.url.length) {
		if (resContent.length)resContent.push(<span className="info-line">|</span>);
		if (Kt.url.length > 1) {
			resContent.push(<span className="click-link" onClick={() => toShow(Kt.url)}>开庭</span>);
		} else if (Kt.url.length === 1) {
			resContent.push(linkDom(Kt.url[0], '开庭'));
		}
	}
	if (Ws && Ws.url.length) {
		if (resContent.length)resContent.push(<span className="info-line">|</span>);
		if (Ws.url.length > 1) {
			resContent.push(<span className="click-link" onClick={() => toShow(Ws.url)}>文书</span>);
		} else if (Ws.url.length === 1) {
			resContent.push(linkDom(Ws.url[0], '文书'));
		}
	}
	return resContent;
};

// 案号 - 弹窗
export const caseInfo = (content, row) => {
	const { isDelete, ygList, bgList } = row;
	if (isDelete || !(ygList.length && bgList)) return content || '--';
	const toClick =	() => Modal.info({
		title: '当事人详情',
		okText: '确定',
		iconType: 'null',
		className: 'assets-an-info',
		content: (
			<div style={{ marginLeft: -28 }}>
				{
					row.ygList && row.ygList.map(item => (
						<p style={{ margin: 5, fontSize: 14 }}>
							<strong>{`${item.ssdw}：`}</strong>
							<span>{item.mc}</span>
						</p>
					))
				}
				{
					row.bgList && row.bgList.map(item => (
						<p style={{ margin: 5, fontSize: 14 }}>
							<strong>{`${item.ssdw}：`}</strong>
							<span>{item.mc}</span>
						</p>
					))
				}
			</div>
		),
		onOk() {},
	});
	return <span className="click-link" onClick={toClick}>{content}</span>;
};
