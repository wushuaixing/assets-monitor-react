import React, { Component } from 'react';
import '../../style.scss';
import SubrogationRights from './subrogation';
import OpenCourt from './openCourt';
import Instrument from './instrument';

class Subrogation extends Component {
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
				{
					config && (
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
											{ item.datatype === 10201 && <SubrogationRights />}
											{ item.datatype === 10202 && <OpenCourt />}
											{ item.datatype === 10203 && <Instrument />}
										</div>
									)
								))
							}
						</div>
					</React.Fragment>
					)
				}
			</React.Fragment>
		);
	}
}

export default Subrogation;
