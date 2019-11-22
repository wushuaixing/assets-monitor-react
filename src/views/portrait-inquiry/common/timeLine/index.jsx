import React from 'react';
import './style.scss';


class RingEcharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	sortFun = (a, b) => b.year - a.year;

	newArrayFun = (arr) => {
		if (arr.length < 6) {
			arr.sort((a, b) => a.year - b.year);
			return arr;
		}
		const b = arr.sort(this.sortFun);
		const c = b.splice(0, 5);
		c.sort((e, f) => e.year - f.year);
		console.log(b);

		// if (b.length === 0) return;
		const num = b.length > 1 ? b.reduce((t, v) => t.count + v.count) : b[0].count;
		c[4].count += num;
		console.log(c);
		return c;
		// const newData = arr.sort(this.sortFun).slice(0, 5).reverse();
		// const newDataNum = newData.length >= 5 ? getCount(arr.slice(5)) : 0;
		// if (newData.length >= 5) {
		// 	newData[4].count = newData[4].count + newDataNum;
		// }
	};

	render() {
		const { title, Data } = this.props;
		// console.log(this.newArrayFun(Data));
		return (
			<div>
				<div className="yc-timeline-title">{title}</div>
				<ul className="yc-timeline">
					{
						Data && this.newArrayFun(Data).map(item => (
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
