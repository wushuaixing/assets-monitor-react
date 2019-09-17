import React from 'react';
import {
	DatePicker, Form, message, Tooltip, Icon, Pagination, Modal, Upload,
} from 'antd';

import Cookies from 'universal-cookie';
import PeopleListModal from './Modal/peopleList';
import TableList from './table';
import { baseUrl } from '@/utils/api';
import {
	businessList, // 列表
	exportExcel, // 导出列表
	postDeleteBatch, // 批量删除
} from '@/utils/api/business';
import {
	Input, Button, Spin, timeRule, Download,
} from '@/common';
import './style.scss';

const cookies = new Cookies();

const { confirm } = Modal;
const createForm = Form.create;

const _style1 = { width: 274 };
const _style2 = { width: 100 };
const text = (
	<div style={{
		width: 250, height: 150,
	}}
	>
		导入流程和注意事项：
		<br />
            1、请先下载模版
		<br />
            2、将需导入的数据填写在下载好的模版内，请严格按照模版内要求进行填写

		<br />
			3、请将填写好的模版上传
		<br />
			4、上传成功—新的业务数据导入成功

		<br />
			5、上传失败—请按照相关提示进行修改后再次上传

		<br />
	</div>
);

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openRowSelection: false,
			dataList: [], // 接口返回数据
			selectedRowKeys: [], // 这里配置默认勾选列
			selectData: [], // 选中数组
			totals: 0,
			current: 1, // 当前页
			pageSize: 10, // 默认展示条数
			loading: false,
			startTime: '',
			endTime: '',
			PeopleListModalVisible: false,
			businessId: '', // 担保人id
			searchValue: null, // 输入框内容
			errorModalVisible: false,
			uploadErrorData: '',
			page: '',
			errorLoading: false,
		};
	}

	componentDidMount() {
		this.getData();
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/yc-input-wrapper/.test(className)) {
				this.search();
				document.activeElement.blur();
			}
		}
	};

	// 附件上传处理
	uploadAttachmentParam = () => {
		const that = this;
		// const Authorization = 'eyJuYW1lIjoi5rWL6K-VIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiIxMjMiLCJleHAiOjE1NTg1NzQ4NDl9.TUn3QyocFGMMBV7Z4X0TXDxkFnkf5t83rNh-qISmLeoMlMIWLsvmykmk8cb8U89zyp0CCZGZVmoa9gIgzu32qw';
		return {
			name: 'file',
			action: `${baseUrl}/yc/business/importExcel?token=${cookies.get('token') || ''}`,
			beforeUpload(file) {
				const type = file.name.split('.');
				const isTypeRight = type[type.length - 1] === 'xlsx' || file.name.split('.')[1] === 'xls';
				if (!isTypeRight) {
					message.error('只能上传 Excel格式文件！');
				}
				return isTypeRight;
			},
			onChange(info) {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				that.setState({
					errorLoading: true,
				});
				that.handleCancel();
				if (info.file.status === 'done') {
					if (info.file.response.code === 200) {
						// url.push(info.file.response.data);
						that.setState({
							refresh: !that.state.refresh,
							errorMsg: [],
							errorLoading: false,
						});
						const { form: { resetFields } } = that.props; // 会提示props is not defined
						resetFields('');
						that.getData();
						message.success(`${info.file.name} 导入${info.file.response.message}${info.file.response.data.businessCount}笔`);
						that.handleCancel();
					} else if (info.file.response.code === 9001) {
						message.error('服务器出错');
						that.setState({
							errorLoading: false,
						});
					} else {
						info.fileList.pop();
						// 主动刷新页面，更新文件列表
						that.setState({
							refresh: !that.state.refresh,
							uploadErrorData: info.file.response.data,
							errorLoading: false,
							// errorMsg: info.file.response.data.errorMsgList,
						});
						that.openErrorModal();
						// that.uploadError(info.file.response.data);
						// message.error(`上传失败: ${info.file.response.data.errorMessage}`);
					}
				} else if (info.file.status === 'error') {
					message.error(`${info.file.name} 上传失败。`);
					that.setState({
						errorMsg: [],
						errorLoading: false,
					});
				}
			},
		};
	};


	// 获取消息列表
	getData = (value) => {
		const {
			current, pageSize, totals,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const fildes = getFieldsValue();

		const params = {
			num: pageSize,
			page: totals % 10 === 1 ? current - 1 : current,
			...fildes,
			...value,
		};
		this.setState({
			loading: true,
		});
		businessList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
					current: res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};


	// page翻页
	handleChangePage = (val) => {
		const { pageSize, searchValue } = this.state;
		const params = {
			...searchValue,
			current: val,
			num: pageSize,
			page: val,
		};
		this.setState({
			page: val,
			loading: true,
		});
		businessList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
					current: val && val.page ? val.page : res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	}


	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const {
			startTime, endTime,
		} = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		if (startTime && endTime && startTime > endTime) {
			message.warning('结束时间必须大于开始时间');
			return;
		}
		const params = {
			...fildes,
			page: 1,
			num: 10,
			uploadTimeStart: startTime || null, // 搜索时间
			uploadTimeEnd: endTime || null,
		};

		this.getData(params);
		this.setState({
			searchValue: params,
		});
	}


	openManagement = (openRowSelection) => {
		this.setState({
			openRowSelection: !openRowSelection,
			selectedRowKeys: [],
		});
	}

	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({
			selectedRowKeys,
			selectData: selectedRows,
		});
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		const params = {
			page: 1,
		};
		this.getData(params);
		this.setState({
			searchValue: '',
			startTime: '',
			endTime: '',
		});
	}


	// 批量删除
	handledDeleteBatch = () => {
		const {
			selectedRowKeys, page, totals, current,
		} = this.state;
		const that = this;
		if (selectedRowKeys.length === 0) {
			message.warning('未选中业务');
			return;
		}
		console.log(page);

		confirm({
			title: '确认删除选中业务吗?',
			content: '点击确认删除，业务相关债务人的所有数据(除已完成的数据外)将被清空，无法恢复，请确认是否存在仍需继续跟进的数据',
			iconType: 'exclamation-circle-o',
			onOk() {
				const params = {
					idList: selectedRowKeys,
				};
				// 判断最后一页批量删除
				let currentLength;
				if (Math.ceil(totals / 10) === current && totals % 10 === selectedRowKeys.length) {
					currentLength = current - 1;
				}
				if (Math.ceil(totals / 10) === current && selectedRowKeys.length === 10) {
					currentLength = current - 1;
				}
				const otherParams = {
					page: currentLength || current,
				};
				const start = new Date().getTime(); // 获取接口响应时间
				return postDeleteBatch(params).then((res) => {
					if (res.code === 200) {
						const now = new Date().getTime();
						const latency = now - start;
						setTimeout(res.data, latency);
						that.setState({
							selectedRowKeys: [],
						});
						message.success(res.message);
						that.getData(otherParams);
					} else {
						message.error(res.message);
					}
				});
			},
			onCancel() {},
		});
	}

	// 导出
	toExportCondition=(type) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const {
			startTime, endTime, selectedRowKeys,
		} = this.state;
		const fields = getFieldsValue();
		const params = {
			...fields,
			uploadTimeStart: startTime || null, // 搜索时间
			uploadTimeEnd: endTime || null,
		};
		if (type === 'all') {
			return Object.assign({}, params);
		}
		return Object.assign({}, params, { idList: selectedRowKeys });
	};

	// 打开担保人弹窗
	openPeopleModal = (id) => {
		this.setState({
			PeopleListModalVisible: true,
			businessId: id,
		});
	}

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			PeopleListModalVisible: false,
		});
	}

	handleCancel = (type) => {
		if (type === 'down') {
			const hide = message.loading('正在为您下载,请稍后...', 0);
			// 异步手动移除
			setTimeout(hide, 1000);
		}
		this.setState({
			errorModalVisible: false,
		});
	}

	openErrorModal = () => {
		this.setState({
			errorModalVisible: true,
		});
	}

	render() {
		const {
			openRowSelection, selectedRowKeys, selectData, totals, current, dataList, loading, PeopleListModalVisible, businessId, errorModalVisible, uploadErrorData, errorLoading,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		// 通过 rowSelection 对象表明需要行选择
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		return (
			<div className="yc-content-query">
				<Spin visible={errorLoading} modal text="正在为您上传文件，请稍后..." />
				<Form layout="inline">
					<div className="yc-query-item">
						<Input
							title="业务编号"
							style={_style1}
							size="large"
							placeholder="业务编号"
							{...getFieldProps('caseNumber', {

								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="借款人"
							style={_style1}
							size="large"
							placeholder="姓名/公司名称"
							{...getFieldProps('obligorName', {

								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="证件号"
							style={_style1}
							size="large"
							placeholder="身份证号/统一社会信用代码"
							{...getFieldProps('obligorNumber', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="机构名称"
							style={_style1}
							size="large"
							placeholder="机构名称"
							{...getFieldProps('orgName', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>

					<div className="yc-query-item">
						<span className="yc-query-item-title">上传时间: </span>
						<DatePicker
							{...getFieldProps('uploadTimeStart', {
								onChange: (value, dateString) => {
									this.setState({
										startTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('uploadTimeEnd'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('uploadTimeEnd', {
								onChange: (value, dateString) => {
									this.setState({
										endTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('uploadTimeStart'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>

					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
					<div className="yc-split-hr" />

					<div className="yc-business-tablebtn">
						{openRowSelection && (
						<React.Fragment>
							<Button onClick={this.handledDeleteBatch} className="yc-business-btn">
								删除
							</Button>
							{/* <Button onClick={this.handledExport} className="yc-business-btn">
								导出
							</Button> */}
							<Download condition={this.toExportCondition} api={exportExcel} field="idList" text="导出" />
						</React.Fragment>
						)}
						{!openRowSelection && (
						<React.Fragment>
							<Button className="yc-business-btn">
								<a href="../../../static/template.xlsx" style={{ color: '#333' }}>模版下载</a>
							</Button>
							<Upload className="yc-upload" showUploadList={false} {...this.uploadAttachmentParam()}>
								<Button className="yc-business-btn">
								导入业务
								</Button>
							</Upload>

						</React.Fragment>
						)}
						<Button className="yc-business-btn" onClick={() => this.openManagement(openRowSelection)}>
							{openRowSelection ? '取消管理' : '批量管理'}
						</Button>

						{!openRowSelection && (
						// <Button onClick={this.handleExportExcel} className="yc-business-btn" style={{ float: 'right' }}>
						// 	<span className="yc-icon-export" />
						// 		一键导出
						// </Button>
						<Download condition={() => this.toExportCondition('all')} style={{ float: 'right' }} api={exportExcel} all text="一键导出" />
						)}
						<Tooltip placement="topLeft" title={text} arrowPointAtCenter>
							<Icon className="yc-business-icon" type="question-circle-o" />
						</Tooltip>
					</div>
					<Spin visible={loading}>
						<TableList stateObj={this.state} selectData={selectData} dataList={dataList} rowSelection={rowSelection} getData={this.getData} openPeopleModal={this.openPeopleModal} />
						<div className="yc-pagination">
							<Pagination
								total={totals}
								current={current}
								defaultPageSize={10} // 默认条数
								showQuickJumper
								showTotal={total => `共 ${total} 条记录`}
								onChange={(val) => {
									this.handleChangePage(val);
								}}
							/>
						</div>
					</Spin>
				</Form>
				{/** 担保人Modal */}
				{PeopleListModalVisible && (
				<PeopleListModal
					onCancel={this.onCancel}
					onOk={this.onOk}
					businessId={businessId}
					PeopleListModalVisible={PeopleListModalVisible}
				/>
				)}
				{errorModalVisible && 	(
				<Modal
					visible={errorModalVisible}
					onCancel={this.handleCancel}
					footer={false}
					width={500}
					closable={false}
				>

					<div className="yc-confirm-body">
						<div className="yc-confirm-header">
							<Icon style={{ fontSize: 28, color: '#f66c5b', marginRight: 8 }} type="cross-circle-o" />
							<span className="yc-confirm-title">{uploadErrorData.errorType}</span>
						</div>
						<div className="yc-confirm-content">
							{uploadErrorData.errorMessage}
						</div>
						<div className="yc-confirm-btn">
							<Upload className="yc-upload" showUploadList={false} {...this.uploadAttachmentParam()}>
								<Button
									style={{ height: 34, marginRight: 10 }}
								>
									重新上传
								</Button>
							</Upload>
							{
								uploadErrorData.errorType === '文件格式错误' ? <Button onClick={() => this.handleCancel('down')} className="yc-confirm-footer-btn" type="primary"><a href="../../../static/template.xlsx" style={{ color: '#fff' }}>模版下载</a></Button>
									: <Button onClick={this.handleCancel} className="yc-confirm-footer-btn" type="primary">知道了</Button>
								}

						</div>
					</div>

				</Modal>
				)}
			</div>
		);
	}
}
export default createForm()(BusinessView);
