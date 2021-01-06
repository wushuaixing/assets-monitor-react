import React, { useState, useEffect } from 'react';
import CustomModal from '@/common/custom/noPhoneModal/custom-modal';
import leftBackground from 'img/login/left_background.png';
import zhongguanBg from 'img/login/zhongguan_bg.png';
import Icon from '../icon';
import PhoneModal from '../../views/login/forgetPassword/noPhoneModal/index';

const domainType = {
	ZG: 'zhongguandev',
};

// 不传domainName的时候使用默认的node
const CustomAgency = (props) => {
	const {
		nodeName, node, type, nodeProps,
	} = props;
	console.log('props === ', props);
	const localDomainName = window.location.hostname;
	const currentDomainName = localDomainName.split('.')[0];
	const domainName = 'localhost';
	let newNode = null;
	if (type === 'delete') {
		return null;
	}
	// 针对二级域名的匹配替换都在这里了
	switch (nodeName) {
	case 'loginName': if (currentDomainName === domainType.ZG) {
		newNode = null;
	} else {
		newNode = (
			<span className="yc-login-world">
				<Icon className="yc-login-icon" type="info-circle-o" />
				正式用户都会开通唯一的二级域名，请确认访问正确的二级域名网址进行登录
			</span>
		);
	} break;
	case 'footerTitle':
		if (currentDomainName === domainType.ZG) {
			newNode = '上海茸冕网络科技有限公司    ';
		} else {
			newNode = '杭州源诚科技有限公司    ';
		} break;
	case 'Copyright':
		if (currentDomainName === domainType.ZG) {
			newNode = 'Copyright © 2020 上海茸冕网络科技有限公司 ';
		} else {
			newNode = 'Copyright © 2018 杭州源诚科技有限公司 ';
		}
		break;
	case 'caseNum':
		if (currentDomainName === domainType.ZG) {
			newNode = '沪ICP备2020037843号';
		} else {
			newNode = '浙ICP备17030014号';
		} break;
	case 'noPhone':
		if (currentDomainName === domainType.ZG) {
			const customProps = {
				customVisible: nodeProps.noPhoneModalVisible,
				onCancel: nodeProps.onCancel,
				customTitle: '手机号不可用',
				customWidth: 380,
				content: <React.Fragment>
					<div>请联系客服，我们会第一时间为您处理。</div>
					<div>客服电话：138-1631-6187</div>
             </React.Fragment>,
			};
			newNode = <CustomModal {...customProps} />;
		} else {
			newNode = <PhoneModal {...nodeProps} />;
		} break;
	case 'overdueAccount':
		const commonProps = {
			customVisible: nodeProps.accountVisible,
			onCancel: nodeProps.onCancel,
			customTitle: '账号过期提醒',
			customWidth: 380,
		};
		if (currentDomainName === domainType.ZG) {
			const accountProps = {
				content: <div>
					<div>账号已过期，如果疑问，请联系客服。</div>
					<div>客服电话：138-1631-6187</div>
				</div>,
			};
			newNode = <CustomModal {...accountProps} {...commonProps} />;
		} else {
			const accountProps = {
				content: <div>
					<div>账号已过期，如果疑问，请联系客服。</div>
					<div>客服电话：138-1631-6187</div>
				</div>,
			};
			newNode = <CustomModal {...accountProps} {...commonProps} />;
		} break;
	case 'loginPic':
		if (currentDomainName === domainType.ZG) {
			newNode = <img className="yc-login-left-img" src={zhongguanBg} alt="" />;
		} else {
			newNode = <img className="yc-login-left-img" src={leftBackground} alt="" />;
		} break;
	// 这个是通用case
	case 'string': newNode = node; break;
	default: newNode = null; break;
	}
	return newNode;
};

export default CustomAgency;
