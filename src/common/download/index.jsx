import React from 'react';
import { Icon, Modal, message } from 'antd';
import Cookies from 'universal-cookie';
import { exportFile, normalGet } from '@/utils/api/home';
import { clearEmpty, urlEncode } from '@/utils';
import PropTypes from 'reactPropTypes';
import Button from '../button';

const cookies = new Cookies();
export default class Download extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingStatus: 'normal',
		};
	}

	handleDownload=() => {
		const {
			api, condition, all, field,
		} = this.props;

		// 处理变量参数
		const _condition = typeof condition === 'function' ? condition() : condition;
		const c = Object.assign({}, _condition);
		// 删除掉 page 和 num
		delete c.page;
		delete c.num;
		const _request = normalGet(`${api}?${urlEncode(clearEmpty(c))}`);
		// console.log(`${api}?${urlEncode(clearEmpty(_condition))}`);
		const token = cookies.get('token');


		// 点击确定 btn
		const toOkClick = () => {
			this.setState({ loadingStatus: 'loading' });
			message.warning('正在下载请稍等...');
			_request().then((res) => {
				const { code, data } = res;
				if (code === 200) {
					this.setState({ loadingStatus: 'normal' });
					window.open(`${exportFile(data)}?token=${token}`, '_self');
				} else {
					this.setState({ loadingStatus: 'normal' });
					message.error(res.message || '网络异常请稍后再试');
				}
			}).catch(() => {
				message.warning('网络异常请稍后再试！');
			});
		};

		if (all) {
			// console.log('一键导出');
			Modal.confirm({
				title: '确认导出选中的所有信息吗？',
				content: '点击确定，将为您导出所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					toOkClick();
				},
				onCancel() {},
			});
		} else if (c[field] && window._.isArray(c[field])) {
			if (c[field].length > 0) {
				// console.log('部分导出');
				toOkClick();
			} else {
				message.warning('未选中业务');
			}
			// window.open(`${api}?${urlEncode(clearEmpty(_condition))}`, '_self');
		} else {
			message.warning('未选中业务');
		}
		return false;
	};

	render() {
		const { loadingStatus } = this.state;
		const { text, all, style } = this.props;

		return (
			<Button disabled={loadingStatus === 'loading'} onClick={this.handleDownload} style={style || ''}>
				{
					loadingStatus === 'loading' ? <Icon type="loading" /> : <span className={all ? 'yc-export-img' : ''} />
				}
				<span style={loadingStatus === 'loading' || all ? { marginLeft: 5 } : ''}>{text || '一键导出'}</span>
			</Button>
		);
	}
}
Download.propTypes = {
	style: PropTypes.obj,
	// 是否添加style样式
	text: PropTypes.string,
	// 按钮的文本内容
	all: PropTypes.bool,
	// 是否是一键导出，优先级高于 field
	field: PropTypes.string,
	// 部分导出时应用，与 all 参数冲突
	condition: PropTypes.obj,
	// 导出请求所需的参数
};

Download.defaultProps = {
	style: {},
	text: null,
	all: false,
	field: false,
	condition: {},
};
