import React from 'react';
import { Tooltip } from 'antd';
import { Spin } from '@/common';
import { parseQuery } from '@/utils';
import { getBaseInfo } from '@/utils/api/portrait-inquiry/enterprise/info';
import { formatDateTime } from '@/utils/changeTime';
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
						<div className="yc-base-infoName">{dataObj.legalPerson && dataObj.legalPerson.length > 1 ? dataObj.legalPerson : '-'}</div>
						<div className="yc-base-infoTitle">组织机构代码</div>
						<div className="yc-base-infoName">{dataObj.orgNumber && dataObj.orgNumber.length > 1 ? dataObj.orgNumber : '-'}</div>
						<div className="yc-base-infoTitle">统一社会信用代码</div>
						<div className="yc-base-infoName">{dataObj.creditCode && dataObj.creditCode.length > 1 ? dataObj.creditCode : '-'}</div>
						<div className="yc-base-infoTitle">纳税人识别号</div>
						<div className="yc-base-infoName">{dataObj.taxNumber && dataObj.taxNumber.length > 1 ? dataObj.taxNumber : '-'}</div>
						<div className="yc-base-infoTitle">成立日期</div>
						<div className="yc-base-infoName">{dataObj.estiblishTime ? `${formatDateTime(dataObj.estiblishTime, 'onlyYear')}` : '-'}</div>
						<div className="yc-base-infoTitle">营业期限</div>
						<div className="yc-base-infoName">{dataObj.fromTime && dataObj.toTime && dataObj.fromTime.length > 1 && dataObj.toTime.length > 1 ? `自 ${dataObj.fromTime} 至 ${dataObj.toTime}` : '-'}</div>
						<div className="yc-base-infoTitle">注册资本</div>
						<div className="yc-base-infoName">{dataObj.regCapital && dataObj.regCapital.length > 1 ? dataObj.regCapital : '-'}</div>
						<div className="yc-base-infoTitle">实缴资本</div>
						<div className="yc-base-infoName">{dataObj.actualCapital && dataObj.actualCapital.length > 1 ? dataObj.actualCapital : '-'}</div>
						<div className="yc-base-infoTitle">经营状态</div>
						<div className="yc-base-infoName">{dataObj.regStatus && dataObj.regStatus.length > 1 ? dataObj.regStatus : '-'}</div>
						<div className="yc-base-infoTitle">登记机关</div>
						<div className="yc-base-infoName">
							{
								dataObj.regInstitute && dataObj.regInstitute.length > 25
									? (
										<Tooltip placement="top" title={dataObj.regInstitute}>
											<p style={{ cursor: 'pointer' }}>{`${dataObj.regInstitute.substr(0, 25)}...`}</p>
										</Tooltip>
									)
									: <p>{dataObj.regInstitute && dataObj.regInstitute.length > 1 ? dataObj.regInstitute : '-'}</p>
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
									: <p>{dataObj.companyOrgType && dataObj.companyOrgType.length > 1 ? dataObj.companyOrgType : '-'}</p>
							}
						</div>
						<div className="yc-base-infoTitle">核准日期</div>
						<div className="yc-base-infoName">{dataObj.approvedTime ? `${formatDateTime(dataObj.approvedTime, 'onlyYear')}` : '-'}</div>
						<div className="yc-base-infoTitle">所属行业</div>
						<div className="yc-base-infoName">
							{
								dataObj.industry && dataObj.industry.length > 25
									? (
										<Tooltip placement="top" title={dataObj.industry}>
											<p style={{ cursor: 'pointer' }}>{`${dataObj.industry.substr(0, 25)}...`}</p>
										</Tooltip>
									)
									: <p>{dataObj.industry && dataObj.industry.length > 1 ? dataObj.industry : '-'}</p>
							}
						</div>
						<div className="yc-base-infoTitle">工商注册号</div>
						<div className="yc-base-infoName">{dataObj.regNumber && dataObj.regNumber.length > 1 ? dataObj.regNumber : '-'}</div>
						<div className="yc-base-infoTitle">人员规模</div>
						<div className="yc-base-infoName">{dataObj.scale && dataObj.scale.length > 1 ? dataObj.scale : '-'}</div>
						<div className="yc-base-infoTitle">参保人数</div>
						<div className="yc-base-infoName">{dataObj.insuranceNum && dataObj.insuranceNum.length > 1 ? dataObj.insuranceNum : '-'}</div>
						<div className="yc-base-infoTitle">英文名</div>
						<div className="yc-base-infoName">{dataObj.englishName && dataObj.englishName.length > 1 ? dataObj.englishName : '-'}</div>
						<div className="yc-base-infoTitle">注册地址</div>
						<div className="yc-base-infoName">
							{
								dataObj.regLocation && dataObj.regLocation.length > 25
									? (
										<Tooltip placement="top" title={dataObj.regLocation}>
											<p style={{ cursor: 'pointer' }}>{`${dataObj.regLocation.substr(0, 25)}...`}</p>
										</Tooltip>
									)
									: <p>{dataObj.regLocation && dataObj.regLocation.length > 1 ? dataObj.regLocation : '-'}</p>
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
									: <p>{dataObj.businessScope && dataObj.businessScope.length > 1 ? dataObj.businessScope : '-'}</p>
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
