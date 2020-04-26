import React, { PureComponent } from 'react';
import './style.scss';

class sevenUpdate extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			checkArray: [
				{ name: '资产挖掘', type: 1, num: 12 },
				{ name: '风险参考', type: 2, num: 17 },
			],
			checkType: 0,
		};
	}

	handleClick = (index) => {
		const { getDynamicType } = this.props;
		if (getDynamicType) { getDynamicType(index); }
		this.setState(() => ({
			checkType: index,
		}));
	};

	render() {
		const { checkArray, checkType } = this.state;
		return (
			<div className="dynamic-checked">
				{
					checkArray.map((item, index) => (
						<div
							key={item.type}
							onClick={() => this.handleClick(index)}
							className={`dynamic-checked-type ${checkType === index ? 'dynamic-checked-active' : 'dynamic-checked-unActive'}`}
						>
							{item.name}
							<span className="dynamic-checked-type-num">
								+
								{item.num}
							</span>
							{checkType === index ? <div className="dynamic-checked-active-line" /> : ''}
						</div>
					))
				}
				<div className="dynamic-checked-line" />
			</div>
		);
	}
}

export default sevenUpdate;
