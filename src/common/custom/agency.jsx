import React, { useState, useEffect } from 'react';
import CustomModal from '@/common/custom/noPhoneModal/custom-modal';
import Icon from '../icon';
import PhoneModal from '../../views/login/forgetPassword/noPhoneModal/index';

const domainType = {
	ZG: 'zhongguan',
};

// 不传domainName的时候使用默认的node
const CustomAgency = (props) => {
	const {
		nodeName, node, type, nodeProps,
	} = props;
	const localDomainName = window.location.href;
	const currentDomainName = localDomainName.split(':')[1].split('//')[1];
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
			console.log('nodeProps === ', nodeProps);
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
		// 这个是通用case
	case 'string': newNode = node; break;
	default: newNode = null; break;
	}
	return newNode;
};

export default CustomAgency;
