import React, { useState } from 'react';
import './index.scss';

const Tabs = (props) => {
	const { source, onChange, defaultActive } = props;
	const [active, setActive] = useState(defaultActive || source[0].id);

	return (
		<div className="yc-tabs-search">
			{source.map(item => (
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
