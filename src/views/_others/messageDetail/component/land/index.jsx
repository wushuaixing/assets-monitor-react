import React, { Component } from 'react';
import '../../style.scss';
import Sell from './sell';
import Transfer from './transfer';
import Pledge from './pledge';

class Land extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}


	render() {
		const {
			id, title, total, childrenCount,
		} = this.props;
		const config = childrenCount && childrenCount.filter(item => item.count > 0);
		return (
			<React.Fragment>
				<div className="messageDetail-table-title" id={id}>
					{title}
					<span className="messageDetail-table-total">{total}</span>
				</div>
				<div className="messageDetail-table-headerLine" />
				<div className="messageDetail-table-container">
					{
						config && config.map(item => (
							item.count > 0
							&& (
								<div>
									<div className="messageDetail-table-subTitle" style={{ width: parseInt(item.name.length * 10 + 35, 10) }}>
										{item.name}
										<span>{item.count}</span>
									</div>
									{ item.type === 'sell' && <Sell />}
									{ item.type === 'transfer' && <Transfer />}
									{ item.type === 'pledge' && <Pledge />}
								</div>
							)
						))
					}
				</div>
			</React.Fragment>
		);
	}
}

export default Land;
