import React, { Component } from 'react';
import PropTypes from 'reactPropTypes';
import Competition from './competition';
import PubilcProject from './public';
import Merchants from './merchants';
import '../../style.scss';

class Financial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			obligorId: props.obligorId,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { obligorId } = this.props;
		if (nextProps.obligorId !== obligorId) {
			this.setState({
				obligorId: nextProps.obligorId,
			});
		}
	}

	render() {
		const {
			id, title, total, childrenCount, stationId,
		} = this.props;
		const { obligorId } = this.state;
		const peopleProps = {
			stationId,
			obligorId,
		};
		const config = childrenCount && childrenCount.filter(item => item.count > 0);
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
									config.map(item => (
										item.count > 0
										&& (
											<div>
												<div className="messageDetail-table-subTitle" style={{ width: parseInt(item.name.length * 10 + 35, 10) }}>
													{item.name}
													<span>{item.count}</span>
												</div>
												{ item.dataType === 10601 && <Competition dataType={10601} {...peopleProps} />}
												{ item.dataType === 10602 && <PubilcProject dataType={10602} {...peopleProps} />}
												{ item.dataType === 10603 && <Merchants dataType={10603} {...peopleProps} />}
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

Financial.propTypes = {
	obligorId: PropTypes.number,
	id: PropTypes.number,
	total: PropTypes.number,
	stationId: PropTypes.number,
	title: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	childrenCount: PropTypes.array,

};

Financial.defaultProps = {
	obligorId: 0,
	total: 0,
	stationId: 0,
	id: 0,
	title: PropTypes.string,
	childrenCount: [],
};

export default Financial;
