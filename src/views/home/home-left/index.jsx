import React, { PureComponent } from 'react';
import DynamicUpdate from './dynamic-update';
import './style.scss';

const customStyle = { padding: '20px' };
class HomeDynamic extends PureComponent {
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
								style={checkType === index ? { borderBottom: '2px solid #fb8e3c', color: '#FB8E3C' } : {}}
							>
								{item.name}
							</div>
						))
					}
				</div>
				{checkType === 0 ? (
					<div style={customStyle}>
						<DynamicUpdate />
					</div>
				) : null}
				{checkType === 1 ? (
					<div style={customStyle}>
						<DynamicUpdate />
					</div>
				) : null}
			</div>
		);
	}
}

export default HomeDynamic;
