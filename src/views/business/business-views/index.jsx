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
import { urlEncode } from '@/utils';
import { Input, Button, Spin } from '@/common';
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
		};
	}

	componentDidMount() {
		this.getData();
	}

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
					if (info.file.status === 'done') {
						if (info.file.response.code === 200) {
							// url.push(info.file.response.data);
							that.setState({
								refresh: !that.state.refresh,
								errorMsg: [],
							});
							const { form: { resetFields } } = that.props; // 会提示props is not defined
							resetFields('');
							that.getData();
							message.success(`${info.file.name} ${info.file.response.message}`);
						} else {
							info.fileList.pop();
							// 主动刷新页面，更新文件列表
							that.setState({
								refresh: !that.state.refresh,
								// errorMsg: info.file.response.data.errorMsgList,
							});
							message.error(`上传失败: ${info.file.response.data.errorMessage}`);
						}
					} else if (info.file.status === 'error') {
						message.error(`${info.file.name} 上传失败。`);
						that.setState({
							errorMsg: [],
						});
					}
				},
			};
		};

	// 获取消息列表
	getData = (value) => {
		const {
			current, pageSize,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		const params = {
			num: pageSize,
			page: current,
			// uploadTimeStart: startTime, // 搜索时间
			// uploadTimeEnd: endTime,
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
					current: value && value.current ? value.current : 1, // 翻页传选中页数，其他重置为1
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

		this.getData(params);
	}


	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const {
			startTime, endTime,
		} = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		if (startTime > endTime) {
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
		console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
		this.setState({
			selectedRowKeys,
			selectData: selectedRows,
		});
	};

	// 一键导出
	handleExportExcel = () => {
		const { selectedRowKeys } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
			idList: selectedRowKeys, // 批量选中
		};
		exportExcel(urlEncode(params)).then((res) => {
			if (res.status === 200) {
				const downloadElement = document.createElement('a');
				downloadElement.href = res.responseURL;
				// // document.body.appendChild(downloadElement);
				downloadElement.click(); // 点击下载

				message.success('下载成功');
			} else {
				message.error('请求失败');
			}
		});
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		this.getData();
		this.setState({
			searchValue: {},
		});
	}

	// 判断点击的键盘的keyCode是否为13，是就调用上面的搜索函数
	handleEnterKey = (e) => {
		console.log(1);
		if (e.nativeEvent.keyCode === 13) { // e.nativeEvent获取原生的事件对像
			this.getData();
		}
	}

	// 批量删除
	handledDeleteBatch = () => {
		const { selectedRowKeys } = this.state;
		const that = this;
		if (selectedRowKeys.length === 0) {
			message.warning('未选中业务');
			return;
		}
		confirm({
			title: '确认删除选中业务吗?',
			content: '点击确认删除，业务相关债务人的所有数据(除已完成的数据外)将被清空，无法恢复，请确认是否存在仍需继续跟进的数据',
			iconType: 'exclamation-circle-o',
			onOk() {
				console.log('确定');
				const params = {
					idList: selectedRowKeys,
				};
				postDeleteBatch(params).then((res) => {
					if (res.code === 200) {
						console.log(res);
						message.success(res.message);
						that.getData();
					} else {
						message.error(res.message);
					}
				});
			},
			onCancel() {},
		});
	}

	// 导出选中业务
	handledExport = () => {
		const { selectedRowKeys } = this.state;
		const that = this; // this指定
		if (selectedRowKeys.length === 0) {
			message.warning('未选中业务');
			return;
		}
		confirm({
			title: '确认导出所选业务吗?',
			content: '点击确定，将为您导出所有选中的信息',
			iconType: 'exclamation-circle-o',
			onOk() {
				that.handleExportExcel();
			},
			onCancel() {},
		});
	}

	// 打开担保人弹窗
	openPeopleModal = (id) => {
		console.log(id);

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

	render() {
		const {
			openRowSelection, selectedRowKeys, selectData, totals, current, dataList, loading, PeopleListModalVisible, businessId,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		// 通过 rowSelection 对象表明需要行选择
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		return (
			<div className="yc-content-query">
				<Form layout="inline">
					<div className="yc-query-item">
						<Input
							title="业务编号"
							style={_style1}
							size="large"
							placeholder="业务编号"
							{...getFieldProps('caseNumber', {
							// initialValue: true,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
								getValueFromEvent: e => e.replace(/\s+/g, ''),
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
								// initialValue: true,
								// rules: [
								// 	{ required: true, whitespace: true, message: '请填写密码' },
								// ],
								getValueFromEvent: e => e.replace(/\s+/g, ''),
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
								// initialValue: true,
								// rules: [
								// 	{ required: true, whitespace: true, message: '请填写密码' },
								// ],
								getValueFromEvent: e => e.replace(/\s+/g, ''),
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
								// initialValue: true,
								// rules: [
								// 	{ required: true, whitespace: true, message: '请填写密码' },
								// ],
								getValueFromEvent: e => e.replace(/\s+/g, ''),
							})}
						/>
					</div>

					<div className="yc-query-item">
						<span className="yc-query-item-title">上传时间: </span>
						<DatePicker
							{...getFieldProps('uploadTimeStart', {
							// initialValue: true,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										startTime: dateString,
									});
								},
							})}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('uploadTimeEnd', {
							// initialValue: true,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										endTime: dateString,
									});
								},
							})}
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
							<Button onClick={this.handledExport} className="yc-business-btn">
								导出
							</Button>
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
						<Button onClick={this.handleExportExcel} className="yc-business-btn" style={{ float: 'right' }}>
							<span className="yc-icon-export" />
								一键导出
						</Button>
						)}
						<Tooltip placement="topLeft" title={text} arrowPointAtCenter>
							<Icon className="yc-business-icon" type="question-circle-o" />
						</Tooltip>
					</div>
					<Spin visible={loading}>
						<TableList stateObj={this.state} selectData={selectData} dataList={dataList} rowSelection={rowSelection} getData={this.getData} openPeopleModal={this.openPeopleModal} />
					</Spin>
					<div className="yc-pagination">
						<Pagination
							total={totals}
							current={current}
							defaultPageSize={10} // 默认条数
							showQuickJumper
							showTotal={total => `共 ${total} 条记录`}
							onChange={(val) => {
								console.log(val);

								this.handleChangePage(val);
							}}
						/>
						{/* <div className="yc-pagination-btn"><Button>跳转</Button></div> */}
					</div>
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
			</div>
		);
	}
}
export default createForm()(BusinessView);
