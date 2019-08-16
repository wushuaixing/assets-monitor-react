import React, { useState } from 'react';

const Tabs = (props) => {
	const { source, onChange, defaultActive } = props;
	const [active, setActive] = useState(defaultActive || source[0].id);

	return (
		<div className="yc-tabs-data">
			<div className='yc-tabs-data-main'>
				aaaa
			</div>
		</div>
	);
};

export default Tabs;
