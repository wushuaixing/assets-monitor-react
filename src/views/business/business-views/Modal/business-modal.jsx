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
			// readyState === 0 未初始化, 还没有调用send()方法
			// readyState === 1 载入, 已调用send()方法，正在发送请求
			// readyState === 2 载入完成, send()方法执行完成，已经接收到全部响应内容
			// readyState === 3 交互, 正在解析响应内容
			// readyState === 4 完成, 响应内容解析完成，可以在客户端调用了
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
						<input
							id="fileToUpload"
							className="file-upload"
							type="file"
							name="upload"
							accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
							onChange={this.handleChangeFile}
						/>
						<Button className="file-btn">选择</Button>
					</div>
					<a className="business-modal-content-choose-template" href="../../../../static/template.xlsx">模版下载</a>
					<div className="business-modal-content-choose-tips">
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
