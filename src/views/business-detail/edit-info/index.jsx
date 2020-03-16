import React from 'react';
import { getQueryByName } from '@/utils';
import {
	Download, Icon as IconType, BreadCrumb, Button,
} from '@/common';
import { getSource } from '@/views/business-detail/business/cache';
import './style.scss';

/* 概要-down */
const DownloadButton = () => (
	<div className="intro-download">
		<Download
			style={{ width: 84 }}
			condition={{
				companyId: getQueryByName(window.location.href, 'id'),
			}}
			icon={<IconType type="icon-download" style={{ marginRight: 5 }} />}
			api=""
			normal
			text="下载"
		/>
	</div>
);

export default class Enterprise extends React.Component {
	constructor(props) {
		document.title = '业务详情';
		// const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		super(props);
		this.state = {
			id: getQueryByName(window.location.href, 'id'),
			source: getSource() || {},
		};
		this.portrait = 'debtor_personal';
		// 画像类型：business 业务，debtor_enterprise 企业债务人 debtor_personal 个人债务人
	}

	componentWillMount() {

	}

	render() {
		const { id } = this.state;
		return (
			<div className="edit-info-wrapper">
				<div className="info-navigation info-wrapper">
					<BreadCrumb
						list={[
							{ id: 1, name: '业务视图', link: '/business' },
							{ id: 2, name: '业务详情', link: `/business/detail/info?id=${id}` },
							{ id: 3, name: '编辑', link: '' },
						]}
						suffix={(
							<div className="info-navigation-suffix">
								<Button className="info-navigation-suffix__button" type="primary">保存</Button>
								<Button className="info-navigation-suffix__button">取消</Button>
							</div>
						)}
					/>
				</div>
				<div style={{ margin: '0 20px' }}><div className="mark-line" /></div>
				<div className="info-content info-wrapper">
					编辑的内容
				</div>
			</div>
		);
	}
}
