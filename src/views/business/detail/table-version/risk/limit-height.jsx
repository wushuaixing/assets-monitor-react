import React from 'react';
import { Tabs } from '@/common';
import LimitHeightTable from '@/views/risk-monitor/limit-consumption/table/table-version';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';


export default class LimitHeightIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: toGetNumber(props.data, 20501) ? 20501 : 20502,
			config: [
				{
					id: 20501,
					name: '列入',
					number: toGetNumber(props.data, 20501),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20501),
				},
				{
					id: 20502,
					name: '已移除',
					number: toGetNumber(props.data, 20502),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20502),
				}],
		};
	}

	onSourceType=(val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	render() {
		const {
			config, sourceType,
		} = this.state;
		const { id, portrait, data } = this.props;
		const h = toH(sourceType, toGetNumber(data, sourceType), portrait);
		const params = {
			portrait,
			sourceType,
			loadingHeight: h,
		};
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={(
						<div className="yc-tabs-simple-prefix" style={{ width: 120 }}>
							<span>限制高消费</span>
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					<LimitHeightTable {...params} />
				</div>
			</div>
		);
	}
}
