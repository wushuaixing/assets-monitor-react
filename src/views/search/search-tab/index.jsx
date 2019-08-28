import React, { useState } from 'react';
import './index.scss';

const Tabs = (props) => {
	const { source, onChange, defaultActive } = props;
	const displayArray = source.filter(item => item.display === true); // 过滤权限

	const [active, setActive] = useState(defaultActive || displayArray[0].id); // 选中过滤后的第一个值

	return (
		<div className="yc-tabs-search">
			{displayArray.map(item => (
				<div
					className={active === item.id ? 'tabs-nav-item active' : 'tabs-nav-item'}
					key={item.id}
					onClick={(() => {
						setActive(item.id);
						onChange(item);
					})}
				>
					{item.name}
				</div>
			))}
		</div>
	);
};

export default Tabs;
