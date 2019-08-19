import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import Input from '@/common/input';
import close from '@/assets/img/icon/close.png';
import add from '@/assets/img/icon/icon_add.png';
import './style.scss';

const Datas = (props) => {
	const [plaintiff, setPlaintiff] = useState([{
		name: '',
		id: 1,
	}]);
	const [defendant, setDefendant] = useState([{
		name: '',
		id: 1,
	}]);
	return (
		<div className="yc-tabs-data" style={{ padding: '16px 22px' }}>
			<div className="yc-tabs-items">
				{
					plaintiff.map((item, index) => (
						<div className="item" style={{ 'margin-right': 10 }}>
							<Input
								key={item.id}
								title="原告"
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={(val) => {
									const temp = plaintiff;
									temp[index].name = val;
									setPlaintiff(temp);
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
											setPlaintiff(temp);
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
								setPlaintiff(temp);
							}}
						/>
					)
				}
			</div>
			<div className="yc-tabs-items">
				{
					defendant.map((item, index) => (
						<div className="item" style={{ 'margin-right': 10 }}>
							<Input
								key={item.id}
								title="被告"
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={(val) => {
									const temp = defendant;
									temp[index].name = val;
									setDefendant(temp);
								}}
							/>
							{
								defendant.length > 0 ? (
									<img
										alt=""
										className="close"
										src={close}
										onClick={() => {
											const temp = defendant;
											temp.splice(index, 1);
											setDefendant(temp);
										}}
									/>
								) : null
							}
						</div>
					))
				}
				{
					defendant.length > 2 ? (<span style={{ 'margin-top': 8, display: 'inline-block' }}>最多添加3个</span>) : (
						<img
							alt=""
							style={{ 'margin-top': 8 }}
							src={add}
							onClick={() => {
								const temp = defendant;
								temp.push({
									name: '',
									id: defendant.length + 1,
								});
								setDefendant(temp);
							}}
						/>
					)
				}
			</div>
			<div className="yc-tabs-items">
				<div className="item" style={{ 'margin-right': 10 }}>
					<Input title="起诉法院" placeholder="法院名称" />
				</div>
				<div className="item" style={{ 'margin-right': 10 }}>
					<Input title="案号" placeholder="案件编号" />
				</div>
				<div className="item" style={{ 'margin-right': 0, width: 303 }}>
					<span>日期选择：</span>
					<DatePicker placeholder="开始日期" style={{ width: 112 }} size="large" allowClear />
					<span style={{ margin: '0 2px ' }}>至</span>
					<DatePicker placeholder="结束日期" style={{ width: 112 }} size="large" allowClear />
				</div>
			</div>
			<div className="others">
				<span>信息类型：</span>
				<Button size="large" type="ghost" style={{ 'margin-right': 10 }}>立案信息</Button>
				<Button size="large" type="primary">开庭公告</Button>
			</div>
		</div>
	);
};
export default Datas;
