import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { Form, Pagination, message } from 'antd';
import { getQueryByName } from '@/utils';
import { Spin, Input, Button } from '@/common';
import FinanceTable from './table';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 900 };
class FINANCE extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			dataList: {},
			loading: false,
			totals: 10,
			pageSize: 10,
			current: 1, // 当前页
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const content = getQueryByName(hash, 'content');
		const { form } = this.props; // 会提示props is not defined
		const { setFieldsValue } = form;
		setFieldsValue({
			content,
		});
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		this.setState({
			searchValue: '',
		});
	}

	//  pagesize页面翻页可选
	onShowSizeChange = (current, pageSize) => {
		this.setState({
			pageSize,
			current: 1,
			// loading: true,
		});
	}

	// page翻页
	handleChangePage = (val) => {
		const { pageSize, searchValue } = this.state;
		// const params = {
		// 	...searchValue,
		// 	current: val,
		// 	num: pageSize,
		// 	page: val,
		// };
		this.setState({
			page: val,
		});
		// businessList(params).then((res) => {
		// 	if (res && res.data) {
		// 		console.log(res.data);

		// 		this.setState({
		// 			dataList: res.data.list,
		// 			totals: res.data.total,
		// 			current: val && val.page ? val.page : res.data.page, // 翻页传选中页数，其他重置为1
		// 			loading: false,
		// 		});
		// 	} else {
		// 		message.error(res.message);
		// 	}
		// }).catch(() => {
		// 	this.setState({ loading: false });
		// });
	}

	render() {
		const {
			loading, dataList, totals, current,
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
								// initialValue: content,
								// rules: [
								// 	{ required: true, whitespace: true, message: '请填写密码' },
								// ],
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
				</div>
				<Spin visible={loading}>
					<FinanceTable stateObj={this.state} dataList={dataList} getData={this.getData} openPeopleModal={this.openPeopleModal} />
				</Spin>
				<div className="yc-pagination">
					<Pagination
						total={totals}
						current={current}
						defaultPageSize={10} // 默认条数
						showQuickJumper
						showSizeChanger
						onShowSizeChange={this.onShowSizeChange}
						showTotal={total => `共 ${total} 条记录`}
						onChange={(val) => {
							console.log(val);

							this.handleChangePage(val);
						}}
					/>
					{/* <div className="yc-pagination-btn"><Button>跳转</Button></div> */}
				</div>
			</div>
		);
	}
}

export default createForm()(FINANCE);
