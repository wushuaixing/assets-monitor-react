import React from 'react';
import { Modal, message } from 'antd';
import Cookies from 'universal-cookie';
import { Button } from '@/common';
import BASE_URL from 'api/config';
import './style.scss';

const cookies = new Cookies();

let progressNumber = 0;

function uploadProgress(evt) {
	if (evt.lengthComputable) {
		const percentComplete = Math.round(evt.loaded * 100 / evt.total);
		progressNumber = `${percentComplete.toString()}%`;
	} else {
		progressNumber = 'unable to compute';
	}
}

function uploadComplete(evt) {
	console.log('loaded === ', evt.loaded);
	console.log('uploadComplete');
}

function uploadFailed(evt) {
	console.log(evt);
}

function uploadCanceled(evt) {
	console.log(evt);
}


export default class BusinessModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: props.businessModalVisible,
			fileName: '',
			fileSize: 0,
			fileType: '',
			fd: undefined,
		};
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		const { businessModalVisible } = this.props;
		if (nextProps.businessModalVisible !== businessModalVisible) {
			this.setState({
				visible: false,
			});
		}
	}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	// 附件上传处理
	uploadAttachmentParam = () => {
		const that = this;
		return {
			name: 'file',
			// action: `${BASE_URL}/yc/business/importExcelText?token=${cookies.get('token') || ''}`,
			beforeUpload(file) {
				const type = file.name.split('.');
				const isTypeRight = type[type.length - 1] === 'xlsx' || file.name.split('.')[1] === 'xls';
				if (!isTypeRight) {
					message.error('只能上传 Excel格式文件！');
				}
				return isTypeRight;
			},
			onChange(info) {
				console.log('info === ', info);
				// if (info.file.status !== 'uploading') {
				// 	console.log(info.file, info.fileList);
				// }
				// that.setState({
				// 	errorLoading: true,
				// });
				// console.log(info.file.status, 12312);
				that.handleCancel();
				// if (info.file.status === 'done') {
				// 	if (info.file.response.code === 200) {
				// 		// url.push(info.file.response.data);
				// 		that.setState({
				// 			refresh: !that.state.refresh,
				// 			errorMsg: [],
				// 			errorLoading: false,
				// 		});
				// 		const { form: { resetFields } } = that.props; // 会提示props is not defined
				// 		resetFields('');
				// 		that.getData();
				// 		const successMessage = info.file.response.data.type !== 2 ? '成功导入' : '成功转移';
				// 		message.success(`${info.file.name} ${successMessage}${info.file.response.data.businessCount}笔`);
				// 		that.handleCancel();
				// 	} else if (info.file.response.code === 9001) {
				// 		message.error('服务器出错');
				// 		that.setState({
				// 			errorLoading: false,
				// 		});
				// 	} else if (info.file.response.code === 9003) {
				// 		message.error(info.file.response.message);
				// 		that.setState({
				// 			errorLoading: false,
				// 		});
				// 	} else {
				// 		info.fileList.pop();
				// 		// 主动刷新页面，更新文件列表
				// 		that.setState({
				// 			refresh: !that.state.refresh,
				// 			uploadErrorData: info.file.response.data,
				// 			errorLoading: false,
				// 			// errorMsg: info.file.response.data.errorMsgList,
				// 		});
				// 		that.openErrorModal();
				// 		// that.uploadError(info.file.response.data);
				// 		// message.error(`上传失败: ${info.file.response.data.errorMessage}`);
				// 	}
				// } else if (info.file.status === 'error') {
				// 	message.error(`${info.file.name} 上传失败。`);
				// 	that.setState({
				// 		errorMsg: [],
				// 		errorLoading: false,
				// 	});
				// }
			},
		};
	};

	handleChangeFile = () => {
		const file = document.getElementById('fileToUpload').files[0];
		console.log('file === ', file);
		if (file) {
			this.setState({
				fileName: file.name,
				fileSize: file.size,
			});
			// let size = 0;
			// if (file.size > 1024 * 1024) {
			// 	size = `${(Math.round(file.size * 100 / (1024 * 1024)) / 100).toString()}MB`;
			// } else {
			// 	size = `${(Math.round(file.size * 100 / 1024) / 100).toString()}KB`;
			// }
			const fd = new FormData();
			fd.append('file', document.getElementById('fileToUpload').files[0]);
			this.setState({
				fd,
			});
		}
	};

	uploadFileResult = () => {

	};

	handleConfirmFile = () => {
		const { fd } = this.state;
		const xhr = new XMLHttpRequest();
		xhr.upload.addEventListener('progress', uploadProgress, false);
		xhr.addEventListener('load', uploadComplete, false);
		xhr.addEventListener('error', uploadFailed, false);
		xhr.addEventListener('abort', uploadCanceled, false);
		xhr.onreadystatechange = function dealResult() {
			console.log('xhr === ', xhr);
			// status === 200 是接口请求成功的标志
			if (xhr.readyState === 4 && xhr.status === 200) {
				const res = JSON.parse(xhr.responseText);
				// 这个code === 200 表示的是接口的数据发送符合接口要求
				if (res.code === 200) {
					message.success('文件上传成功');
				}
				console.log('res === ', res);
			}
		};
		xhr.open('POST', `${BASE_URL}/yc/business/importExcelText?token=${cookies.get('token') || ''}`, true);
		xhr.send(fd);
	};

	// 手动删除文件
	handleDeleteFile = () => {
		this.setState({
			fd: undefined,
			fileName: '',
		});
	};

	render() {
		const { visible, fileName } = this.state;
		return (
			<Modal
				title="导入业务"
				width={560}
				visible={visible}
				onCancel={this.handleCancel}
				onOk={this.handleConfirmFile}
			>
				<div className="business-modal">导入业务后，系统将对债务人进行逐个匹配，匹配时间会因导入的债务人数量而不同，请您耐心等待！</div>
				<div className="business-modal-content">
					<span className="business-modal-content-label">上传文件：</span>
					<div className="business-modal-content-choose">
						<input id="fileToUpload" className="file-upload" type="file" name="upload" onChange={this.handleChangeFile} />
						<Button className="file-btn">选择</Button>
						{/* <Upload className={!global.GLOBAL_MEIE_BROWSER ? 'yc-upload' : 'yc-ie-upload'} showUploadList={false} {...this.uploadAttachmentParam()}> */}
						{/*	<Button className="yc-business-btn"> */}
						{/*		选择 */}
						{/*	</Button> */}
						{/* </Upload> */}
					</div>
					<a className="business-modal-content-choose-template" href="../../../../static/template.xlsx">模版下载</a>
					<div className="business-modal-content-choose-tips">
						{
							progressNumber
						}
						{
							fileName ? (
								<div>
									{fileName}
									<span style={{ marginLeft: 20 }} onClick={this.handleDeleteFile}>X</span>
								</div>
							) : null
						}
						<div>文件最大20M,支持扩展名：.xls .xlsx</div>
					</div>
				</div>
			</Modal>
		);
	}
}
