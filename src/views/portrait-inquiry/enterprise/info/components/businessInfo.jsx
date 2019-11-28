import React from 'react';
import { Tooltip } from 'antd';
import { Spin } from '@/common';
import { parseQuery } from '@/utils';
import { getBaseInfo } from '@/utils/api/portrait-inquiry/enterprise/info';
import './style.scss';

export default class BusinessInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			dataObj: {},
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		this.getBaseInfoData(params);
	}

	getBaseInfoData = (value) => {
		this.setState({
			loading: true,
		});
		const params = {
			...value,
		};
		getBaseInfo(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						loading: false,
						dataObj: res.data,
					});
				} else {
					this.setState({ loading: false });
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	}

	render() {
		const { id } = this.props;
		const { loading, dataObj } = this.state;

		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
                        基本信息
					</div>
				</div>
				<div className="yc-base-content">
					<Spin visible={loading}>
						<div className="yc-base-infoTitle">法定代表人</div>
						<div className="yc-base-infoName">{dataObj.legalPerson && dataObj.legalPerson.trim().length > 0 ? dataObj.legalPerson : '-'}</div>
						<div className="yc-base-infoTitle">组织机构代码</div>
						<div className="yc-base-infoName">{dataObj.orgNumber && dataObj.orgNumber.trim().length > 0 ? dataObj.orgNumber : '-'}</div>
						<div className="yc-base-infoTitle">统一社会信用代码</div>
						<div className="yc-base-infoName">{dataObj.creditCode && dataObj.creditCode.trim().length > 0 ? dataObj.creditCode : '-'}</div>
						<div className="yc-base-infoTitle">纳税人识别号</div>
						<div className="yc-base-infoName">{dataObj.taxNumber && dataObj.taxNumber.trim().length > 0 ? dataObj.taxNumber : '-'}</div>
						<div className="yc-base-infoTitle">成立日期</div>
						<div className="yc-base-infoName">{dataObj.establishTime ? dataObj.establishTime : '-'}</div>
						<div className="yc-base-infoTitle">营业期限</div>
						<div className="yc-base-infoName">{dataObj.fromTime && dataObj.toTime && dataObj.fromTime.trim().length > 0 && dataObj.toTime.trim().length > 0 ? `自 ${dataObj.fromTime} 至 ${dataObj.toTime}` : '-'}</div>
						<div className="yc-base-infoTitle">注册资本</div>
						<div className="yc-base-infoName">{dataObj.regCapital && dataObj.regCapital.trim().length > 0 ? dataObj.regCapital : '-'}</div>
						<div className="yc-base-infoTitle">实缴资本</div>
						<div className="yc-base-infoName">{dataObj.actualCapital && dataObj.actualCapital.trim().length > 0 ? dataObj.actualCapital : '-'}</div>
						<div className="yc-base-infoTitle">经营状态</div>
						<div className="yc-base-infoName">{dataObj.regStatus && dataObj.regStatus.trim().length > 0 ? dataObj.regStatus : '-'}</div>
						<div className="yc-base-infoTitle">登记机关</div>
						<div className="yc-base-infoName">
							{
								dataObj.regInstitute && dataObj.regInstitute.length > 25
									? (
										<Tooltip placement="top" title={dataObj.regInstitute}>
											<p style={{ cursor: 'pointer' }}>{`${dataObj.regInstitute.substr(0, 25)}...`}</p>
										</Tooltip>
									)
									: <p>{dataObj.regInstitute && dataObj.regInstitute.trim().length > 0 ? dataObj.regInstitute : '-'}</p>
							}
						</div>
						<div className="yc-base-infoTitle">企业类型</div>
						<div className="yc-base-infoName">
							{
								dataObj.companyOrgType && dataObj.companyOrgType.length > 25
									? (
										<Tooltip placement="top" title={dataObj.companyOrgType}>
											<p style={{ cursor: 'pointer' }}>{`${dataObj.companyOrgType.substr(0, 25)}...`}</p>
										</Tooltip>
									)
									: <p>{dataObj.companyOrgType && dataObj.companyOrgType.trim().length > 0 ? dataObj.companyOrgType : '-'}</p>
							}
						</div>
						<div className="yc-base-infoTitle">核准日期</div>
						<div className="yc-base-infoName">{dataObj.approvedTime ? dataObj.approvedTime : '-'}</div>
						<div className="yc-base-infoTitle">所属行业</div>
						<div className="yc-base-infoName">
							{
								dataObj.industry && dataObj.industry.length > 25
									? (
										<Tooltip placement="top" title={dataObj.industry}>
											<p style={{ cursor: 'pointer' }}>{`${dataObj.industry.substr(0, 25)}...`}</p>
										</Tooltip>
									)
									: <p>{dataObj.industry && dataObj.industry.trim().length > 0 ? dataObj.industry : '-'}</p>
							}
						</div>
						<div className="yc-base-infoTitle">工商注册号</div>
						<div className="yc-base-infoName">{dataObj.regNumber && dataObj.regNumber.trim().length > 0 ? dataObj.regNumber : '-'}</div>
						<div className="yc-base-infoTitle">人员规模</div>
						<div className="yc-base-infoName">{dataObj.scale && dataObj.scale.trim().length > 0 ? dataObj.scale : '-'}</div>
						<div className="yc-base-infoTitle">参保人数</div>
						<div className="yc-base-infoName">{dataObj.insuranceNum && dataObj.insuranceNum.trim().length > 0 ? dataObj.insuranceNum : '-'}</div>
						<div className="yc-base-infoTitle">英文名</div>
						<div className="yc-base-infoName">{dataObj.englishName && dataObj.englishName.trim().length > 0 ? dataObj.englishName : '-'}</div>
						<div className="yc-base-infoTitle">注册地址</div>
						<div className="yc-base-infoName">
							{
								dataObj.regLocation && dataObj.regLocation.length > 25
									? (
										<Tooltip placement="top" title={dataObj.regLocation}>
											<p style={{ cursor: 'pointer' }}>{`${dataObj.regLocation.substr(0, 25)}...`}</p>
										</Tooltip>
									)
									: <p>{dataObj.regLocation && dataObj.regLocation.trim().length > 0 ? dataObj.regLocation : '-'}</p>
							}
						</div>
						<div className="yc-base-infoTitle">经营范围</div>
						<div className="yc-base-infoName">
							{
								dataObj.businessScope && dataObj.businessScope.length > 25
									? (
										<Tooltip placement="top" title={dataObj.businessScope}>
											<p style={{ cursor: 'pointer' }}>{`${dataObj.businessScope.substr(0, 25)}...`}</p>
										</Tooltip>
									)
									: <p>{dataObj.businessScope && dataObj.businessScope.trim().length > 0 ? dataObj.businessScope : '-'}</p>
							}
						</div>
						<div className="yc-base-infoTitle">&nbsp;</div>
						<div className="yc-base-infoName">&nbsp;</div>
					</Spin>
				</div>
			</div>
		);
	}
}
