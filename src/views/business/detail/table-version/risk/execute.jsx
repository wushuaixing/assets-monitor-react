import React from 'react';
import { Tabs } from '@/common';
import TableVersion from '@/views/risk-monitor/execute-info/table/table-version';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';

export default class Execute extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: toGetNumber(props.data, 20701) ? 20701 : 20702,
			config: [
				{
					id: 20701,
					name: '列入',
					number: toGetNumber(props.data, 20701),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20701),
				},
				{
					id: 20702,
					name: '已移除',
					number: toGetNumber(props.data, 20702),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20702),
				}],
		};
	}

	componentDidMount() {

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
							<span>被执行信息</span>
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					<TableVersion {...params} />
				</div>
			</div>
		);
	}
}
