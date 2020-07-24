import React, { Component } from 'react';
import '../../style.scss';
import Case from './case';
import Court from './court';
import JudgmentDocument from './judgmentDocument';

class LitigationMonitoring extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const {
			id, title, total, childrenCount, stationId, obligorId,
		} = this.props;
		const peopleProps = {
			stationId,
			obligorId,
		};
		const config = childrenCount ? childrenCount.filter(item => item.count > 0) : [];
		return (
			<React.Fragment>
				{
					config.length > 0 && (
					<div>
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
											{ item.dataType === 10901 && <Case dataType={10901} {...peopleProps} />}
											{ item.dataType === 10902 && <Court dataType={10902} {...peopleProps} />}
											{ item.dataType === 10903 && <JudgmentDocument dataType={10903} {...peopleProps} />}
										</div>
									)
								))
							}
						</div>
					</div>
					)
				}
			</React.Fragment>
		);
	}
}

export default LitigationMonitoring;
