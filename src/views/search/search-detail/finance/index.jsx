import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { Form, Pagination, message } from 'antd';
import { navigate } from '@reach/router';
import { getQueryByName, generateUrlWithParams } from '@/utils';
import { Spin, Input, Button } from '@/common';
import FinanceTable from './table';
import {
	finance, // 列表
} from '@/utils/api/search';

import './style.scss';

const createForm = Form.create;
const _style1 = { width: 900 };
class FINANCE extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
			loading: false,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const content = getQueryByName(hash, 'content');
		const { form } = this.props; // 会提示props is not defined
		const { setFieldsValue } = form;
		window._addEventListener(document, 'keyup', this.toKeyCode13);
		setFieldsValue({
			content,
		});
		const params = {
			content,
		};
		if (content) {
			this.getData(params);
		}
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
			...fildes,
			...value,
		};
		this.setState({
			loading: true,
		});
		finance(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.totalCount,
					current: res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		const { pageSize } = this.state;
		navigate(generateUrlWithParams('/search/detail/finance', fildes));
		this.setState({
			page: 1,
		});
		const params = {
			...fildes,
			page: 1,
			num: pageSize,
		};
		if (fildes.content) {
			this.getData(params);
		} else {
			this.queryReset();
			// message.error('请输入搜索条件');
		}
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		this.setState({
			pageSize: 10,
			dataList: [],
			totals: 0,
			page: 1,
		});
		navigate(generateUrlWithParams('/search/detail/finance', {}));
	}

	//  pagesize页面翻页可选
	onShowSizeChange = (current, pageSize) => {
		this.setState({
			pageSize,
			current: 1,
			page: 1,
		});
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const fildes = getFieldsValue();
		const params = {
			...fildes,
			num: pageSize,
			page: 1,
		};
		if (fildes.content) {
			this.getData(params);
		}
	}

	// page翻页
	handleChangePage = (val) => {
		const { pageSize } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const fildes = getFieldsValue();
		const params = {
			...fildes,
			current: val,
			num: pageSize,
			page: val,
		};
		this.setState({
			page: val,
			loading: true,
		});

		finance(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.totalCount,
					current: res.data.page,
					loading: false,
				});
			} else {
				message.error(res.message);
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	}


	render() {
		const {
			loading, totals, current, dataList, page, pageSize,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;

		return (
			<div className="yc-content-query">
				<div className="yc-content-header">
					<div className="yc-query-item">
						<Input
							title="全文"
							style={_style1}
							size="large"
							placeholder="标题/关键字"
							{...getFieldProps('content', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
				</div>
				<div className="yc-header-title">
					{totals ? `源诚科技为您找到${totals}条信息` : ''}
				</div>
				<Spin visible={loading}>
					<FinanceTable stateObj={this.state} dataList={dataList} getData={this.getData} openPeopleModal={this.openPeopleModal} />
					<div className="yc-pagination">
						<Pagination
							total={totals && totals > 1000 ? 1000 : totals}
							current={current}
							pageSize={pageSize} // 默认条数
							showQuickJumper
							showSizeChanger
							onShowSizeChange={this.onShowSizeChange}
							showTotal={() => `共 ${totals} 条记录`}
							onChange={(val) => {
								// 存在数据才允许翻页
								if (dataList.length > 0) {
									this.handleChangePage(val);
								}
							}}
						/>
					</div>
					{page === 100 && (
					<span style={{
						color: '#929292', fontSize: 12, float: 'right', lineHeight: 1,
					}}
					>
						如需更多数据请联系：186-5718-6471
					</span>
					)}
				</Spin>

			</div>
		);
	}
}

export default createForm()(FINANCE);
