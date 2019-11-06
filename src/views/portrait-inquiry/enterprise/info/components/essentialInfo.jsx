import React from 'react';
import './style.scss';

export default class EssentialInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
                        基本信息
					</div>
				</div>
				<div className="yc-base-content">
					<div className="yc-base-infoTitle">法定代表人</div>
					<div className="yc-base-infoName">赵斌</div>
					<div className="yc-base-infoTitle">组织机构代码</div>
					<div className="yc-base-infoName">a1223rf23414</div>
					<div className="yc-base-infoTitle">统一社会信用代码</div>
					<div className="yc-base-infoName">3928410481048012491</div>
					<div className="yc-base-infoTitle">纳税人识别号</div>
					<div className="yc-base-infoName"> 3928410481048012491</div>
					<div className="yc-base-infoTitle">成立日期</div>
					<div className="yc-base-infoName">2018-03-02</div>
					<div className="yc-base-infoTitle">营业期限</div>
					<div className="yc-base-infoName">自 2018-03-02至 2030-03-02止</div>
					<div className="yc-base-infoTitle">注册资本</div>
					<div className="yc-base-infoName">1120万人民币</div>
					<div className="yc-base-infoTitle">实缴资本</div>
					<div className="yc-base-infoName">-</div>
					<div className="yc-base-infoTitle">经营状态</div>
					<div className="yc-base-infoName">存续</div>
					<div className="yc-base-infoTitle">登记机关</div>
					<div className="yc-base-infoName">温州市市场监督管理局</div>
					<div className="yc-base-infoTitle">企业类型</div>
					<div className="yc-base-infoName">有限责任公司</div>
					<div className="yc-base-infoTitle">核准日期</div>
					<div className="yc-base-infoName">2018-03-02</div>
					<div className="yc-base-infoTitle">所属行业</div>
					<div className="yc-base-infoName">制造业</div>
					<div className="yc-base-infoTitle">营业期限</div>
					<div className="yc-base-infoName">自 2018-03-02至 2030-03-02止</div>
					<div className="yc-base-infoTitle">人员规模</div>
					<div className="yc-base-infoName"> 小于50人</div>
					<div className="yc-base-infoTitle">工商注册号</div>
					<div className="yc-base-infoName">329380412012</div>
					<div className="yc-base-infoTitle">参保人数</div>
					<div className="yc-base-infoName">12</div>
					<div className="yc-base-infoTitle">注册地址</div>
					<div className="yc-base-infoName">温州市临江镇郑大垟村(温州亚泰皮革有限公司内)</div>
					<div className="yc-base-infoTitle">英文名</div>
					<div className="yc-base-infoName">-</div>
					<div className="yc-base-infoTitle">所属地区</div>
					<div className="yc-base-infoName">浙江省</div>
					<div className="yc-base-infoTitle">经营范围</div>
					<div className="yc-base-infoName">皮塑革、人造革制造</div>
					<div className="yc-base-infoTitle">-</div>
					<div className="yc-base-infoName">-</div>
				</div>
			</div>
		);
	}
}
