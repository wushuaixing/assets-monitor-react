import React from 'react';
import { Popover } from 'antd';
import footerImg from 'img/login/img_footer_qrcode.png';
import phone from 'img/login/icon_telephone.png';
import address from 'img/login/icon_address.png';
import email from 'img/login/icon_contact_email.png';
// 底部

const content = (
	<div>
		<p style={{ lineHeight: '22px' }}>
			<img
				style={{
					width: 14, height: 14, marginRight: 5, position: 'relative', bottom: -2,
				}}
				src={phone}
				alt=""
			/>
			0571-81182249
		</p>
		<p style={{ lineHeight: '22px' }}>
			<img
				style={{
					width: 14, height: 14, marginRight: 5, position: 'relative', bottom: -2,
				}}
				src={email}
				alt=""
			/>
			sales@yczcjk.com
		</p>
		<p style={{ lineHeight: '22px' }}>
			<img
				style={{
					width: 14, height: 14, marginRight: 5, position: 'relative', bottom: -2,
				}}
				src={address}
				alt=""
			/>
			杭州市西湖区华星世纪大楼五楼508
		</p>
	</div>
);

const Footer = () => (
	<div className="yc-footer-wrapper">
		<div className="yc-footer-content">
			<div className="clear-fix">
				<div className="left">
					<div className="copyright-item-first">
						<Popover content={content}>
							<span>联系我们</span>
						</Popover>
					</div>
					<div className="copyright-item">
						<span>Copyright © 2018 杭州源诚科技有限公司 </span>
						{/* eslint-disable-next-line react/jsx-no-target-blank */}
						<a target="_blank" href="http://beian.miit.gov.cn" rel="nofollow" style={{ color: 'inherit' }}>浙ICP备17030014号</a>
					</div>
				</div>
				<div className="right">
					<div className="copyright-item">
						<img src={footerImg} alt="" style={{ width: 60, height: 60 }} />
						<div className="copyright-code-text">微信公众号每月更新全国及各省司法拍卖统计报告；绑定账号可实时查看平台监控信息</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);
export default Footer;
