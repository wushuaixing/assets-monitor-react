import React, { useState, useEffect } from 'react';
import { Button, Input, Select } from 'antd';

const Datas = (props) => {
	const { options } = props;
	if (options) {
		const [placeholder, setPlaceholder] = useState(options[1].placeholder);
		const [selectId, setSelectId] = useState(options[1].id);
		return (
			<div className="select-search">
				<div className="select">
					<Select
						value={selectId}
						style={{ width: 111 }}
						onChange={(item) => {
							options.forEach((ele) => {
								if (ele.id === item) {
									setPlaceholder(ele.placeholder);
									setSelectId(ele.id);
								}
							});
						}}
					>
						{
							options.map(item => (
								<Select.Option value={item.id}>{item.name}</Select.Option>
							))
						}
					</Select>
				</div>
				<Input placeholder={placeholder} />
				<Button
					type="primary"
					size="large"
					className="red-search"
				>
					搜索
				</Button>
			</div>
		);
	}

	return (
		<div className="select-search">
			<div className="select">
				<p className="financial">全文</p>
			</div>
			<Input placeholder="标题、关键字" />
			<Button
				type="primary"
				size="large"
				className="red-search"
			>
					搜索
			</Button>
		</div>
	);
};
export default Datas;
