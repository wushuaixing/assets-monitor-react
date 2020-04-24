import React from 'react';
import { Icon } from '@/common';
import './style.scss';

class HomeDynamic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkArray: [
				{ name: '7天内更新', type: 1 },
				{ name: '30天内更新', type: 2 },
			],
			checkType: 0,
		};
	}

	handleClick = (index) => {
		this.setState(() => ({
			checkType: index,
		}));
	};

	render() {
		const { checkArray, checkType } = this.state;
		return (
			<div className="dynamic-container">
				<div className="dynamic-container-header">
					<div className="dynamic-container-header-name">动态</div>
					<div className="horizontal-line" />
					{
						checkArray.map((item, index) => (
							<div
								key={item.type}
								onClick={() => this.handleClick(index)}
								className="dynamic-container-header-type"
								style={checkType === index ? { borderBottom: '2px solid #fb8e3c' } : {}}
							>
								{item.name}
							</div>
						))
					}
				</div>
				{checkType === 0 ? <div>7天</div> : null}
				{checkType === 1 ? <div>30天</div> : null}
			</div>
		);
	}
}

export default HomeDynamic;
