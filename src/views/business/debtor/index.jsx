import React from 'react';
import Form from 'antd/lib/form';
import Pagination from 'antd/lib/pagination';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';
import TableList from './table';
import {
	businessList, // 列表
} from '@/utils/api/business';

import { Input, Button } from '@/common';
import './style.scss';

const createForm = Form.create;
const { Option } = Select;
const _style1 = { width: 274 };
const _style3 = { width: 80 };
const dishonstList = [
	{ id: 1, name: '全部', value: 'all' },
	{ id: 2, name: '未失信', value: 'nodishonst' },
	{ id: 3, name: '已失信', value: 'dishonsted' },
	{ id: 4, name: '曾失信', value: 'beforehonst' },
];

class BusinessDebtor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openRowSelection: false,
			dataList: [], // 接口返回数据
			selectedRowKeys: [], // 这里配置默认勾选列
			selectData: [], // 选中数组
			totals: 0,
			current: 1, // 当前页
		};
	}

	componentDidMount() {
		// this.getData();
	}

	// 获取消息列表
	getData = (value) => {
		const params = {
			...value,
			page: {
				num: 20,
				page: 1,
			},
		};
		businessList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			// this.setState({ loading: false });
		});
	};

	// page翻页
	handleChangePage = (val) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const { repayStartTime, repayEndTime, pageSize } = this.state;
		const fields = getFieldsValue();
		console.log(fields, pageSize);
		this.setState({
			current: val,
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

	render() {
		const {
			openRowSelection, selectedRowKeys, selectData, totals, current, dataList,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldsValue } = form;
		const fields = getFieldsValue();
		// 通过 rowSelection 对象表明需要行选择
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		console.log(fields, selectData);
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} size="large" placeholder="姓名/公司名称" />
				</div>
				<div className="yc-query-item">
					<Input title="证件号" style={_style1} size="large" placeholder="身份证号/统一社会信用代码" />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">信用状态: </span>
					<Select size="large" defaultValue="all" style={_style3}>
						{dishonstList.map(item => <Option key={item.key} value={item.value}>{item.name}</Option>)}
					</Select>
				</div>
				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="warning" style={{ width: 84 }}>查询</Button>
					<Button size="large" style={{ width: 120 }}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
				<div className="yc-business-tablebtn">
					<Button className="yc-business-btn">
						一键导出
					</Button>
				</div>
				<TableList stateObj={this.state} rowSelection={rowSelection} />
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
			</div>
		);
	}
}
export default createForm()(BusinessDebtor);
