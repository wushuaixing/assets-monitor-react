import React from 'react';
import getCount from '../getCount';
import './style.scss';


class RingEcharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newArray: [],
		};
	}

	componentDidMount() {
		const { Data } = this.props;
		this.newArrayFun(Data);
	}

	componentWillReceiveProps(nextProps) {
		const { Data } = this.props;
		if (Data !== nextProps.Data) {
			this.newArrayFun(nextProps.Data);
		}
	}

	newArrayFun = (Data) => {
		if (Data && Data.length <= 5) {
			const newData = [...Data];
			const newDataArray = newData.sort((a, b) => a.year - b.year);
			this.setState({
				newArray: newDataArray,
			});
			return newDataArray;
		}
		const newData = [...Data];
		const num = getCount(Data.slice(5));
		const newDataArray = newData.sort((a, b) => b.year - a.year).slice(0, 5).reverse();
		newDataArray[4].count += num;
		this.setState({
			newArray: newDataArray,
		});
		return newDataArray;
	};

	render() {
		const { title, Data } = this.props;
		const { newArray } = this.state;
		return (
			<div>
				<div className="yc-timeline-title">{title}</div>
				<ul className="yc-timeline">
					{
						Data && newArray.length > 0 && newArray.map(item => (
							<li className="yc-li-complete">
								<div className="yc-timestamp">
									<span className="num">
										{`${item.count} 条`}
									</span>
								</div>
								<div className="yc-dotted-line" />
								<div className="status">
									<h4>
										{item.year === 0 ? '未知' : `${item.year} 年`}
									</h4>
								</div>
							</li>
						))
                    }
				</ul>
			</div>
		);
	}
}

export default RingEcharts;
