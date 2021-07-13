import React from 'react';
import { BreadCrumb, Button, timeRule } from '@/common';
import { format } from '@/utils/changeTime';
import { Radio, Form, DatePicker } from 'antd';
import './index.scss';

class BusinessExportView extends React.Component {
	constructor(props) {
		super(props);
		document.title = '业务视图-导出业务报告';
		this.state = {
			status: 0,
		};
	}

	componentDidMount() {

	}

	onChangeValue = (event, field) => {
		if (event) {
			let value;
			value = event.target ? event.target.value : event;
			if (field === 'remark') value = value.slice(0, 160);
			this.setState({
				[field]: value,
			});
		} else {
			this.setState({
				[field]: event,
			});
		}
	};

	render() {
		const { status } = this.state;
		const { form: { getFieldProps } } = this.props;
		return (
			<div className="business-export">
				<div className="info-navigation">
					<BreadCrumb
						list={[
							{ id: -1, name: '业务管理', link: '/business/view/' },
							{ id: 1, name: '业务视图', link: '/business/view' },
							{ id: 2, name: '导出业务报告', link: '' },
						]}
					/>
				</div>
				<div style={{ margin: '0 20px' }}><div className="mark-line" /></div>
				<div className="business-export-info">
					<div className="business-export-info-title">导出业务报告</div>
					<div className="business-export-info-message">
						{/* <Icon style={{ fontSize: 28, color: '#f66c5b', marginRight: 8 }} type="ExclamationOutlined" /> */}
						有报告正在生成中，请在报告生成后再发起新的导出任务。
					</div>
					<div className="business-export-info-form">
						<div className="form-type">
							<span className="label">选择报告类型：</span>
							<Radio.Group onChange={e => this.onChangeValue(e, 'status')} value={status}>
								<Radio key="a" value={0}>完整业务报告</Radio>
								<Radio key="b" value={1}>增量数据报告</Radio>
							</Radio.Group>
						</div>
						{ status ? null : (
							<div className="form-date">
								<span className="label">时间范围：</span>
								<DatePicker
									size="large"
									style={{ width: 164 }}
									placeholder="上次导出时间"
									{...getFieldProps('startGmtCreate')}
									disabledDate={time => timeRule.disabledStartDate(time, format(new Date()))}
								/>
								<span className="yc-query-item-title">至</span>
								<DatePicker
									size="large"
									style={{ width: 88 }}
									placeholder="今天"
									disabled
								/>
								<div className="export-time">
									（本账号上次导出报告的日期为：
									<span className="date">2015-10-01</span>
									）
								</div>
							</div>
						)
						}
						<div className="form-business">
							<span className="label">开启推送的业务数：</span>
							<span className="business-number">12</span>
							笔
						</div>
					</div>
					<div className="business-export-info-remind">*导出文件较大，请您耐心等待，生成成功后，会通过</div>
					<div className="business-export-info-btn">
						<Button
							type="primary"
							size="large"
							className="yc-high-search"
							onClick={this.search}
						>
							确定
						</Button>
						<Button size="large">
							返回
						</Button>
					</div>
				</div>
				<div className="business-export-info-line" />
				<div className="business-export-footer">
					<ul className="complete">
						<li>完整业务报告</li>
						<li>完整业务报告展示的是单笔业务中的债务人，完整的的资产/风险画像。可作为制定清收策略的参考信息</li>
						<li>每笔业务都会生成一个独立的pdf文件</li>
					</ul>
					<div className="line" />
					<ul className="increment">
						<li>增量数据报告</li>
						<li>增量数据报告展示的是单个负责人/机构所管理的债务人，在指定时间范围内，新增的资产/风险信息，可作为贷后定期检查的工具</li>
						<li>我们会为每个负责人/机构生成1个独立的excel文件</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Form.create()(BusinessExportView);
