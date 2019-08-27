import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { Form, Pagination, message } from 'antd';
import { getQueryByName } from '@/utils';
import { Spin, Input, Button } from '@/common';
import close from '@/assets/img/icon/close.png';
import add from '@/assets/img/icon/icon_add.png';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 274 };
class LAWSUITS extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			plaintiff: [
				{ name: '', id: '' },
			],
		};
	}

	componentDidMount() {
		// const { hash } = window.location;
		// const content = getQueryByName(hash, 'content');
		// this.setState({
		// 	content,
		// });
	}

	render() {
		const { plaintiff } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-content-query">
				<div className="yc-tabs-items">
					{
					plaintiff.map((item, index) => (
						<div className="item" style={{ 'margin-right': 10 }}>
							<Input
								key={item.id}
								title="原告"
								value={item.name}
								style={_style1}
								placeholder="姓名/公司名称"
								onChange={(val) => {
									const temp = plaintiff;
									temp[index].name = val;
								}}
							/>
							{
								plaintiff.length > 0 ? (
									<img
										alt=""
										className="close"
										src={close}
										onClick={() => {
											const temp = plaintiff;
											temp.splice(index, 1);
										}}
									/>
								) : null
							}
						</div>
					))
				}
					{
					plaintiff.length > 2 ? (<span style={{ 'margin-top': 8, display: 'inline-block' }}>最多添加3个</span>) : (
						<img
							alt=""
							style={{ 'margin-top': 8 }}
							src={add}
							onClick={() => {
								const temp = plaintiff;
								temp.push({
									name: '',
									id: plaintiff.length + 1,
								});
							}}
						/>
					)
				}
				</div>
				<div className="yc-query-item yc-query-item-btn">
					<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
					<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
				</div>
			</div>
		);
	}
}

export default createForm()(LAWSUITS);
