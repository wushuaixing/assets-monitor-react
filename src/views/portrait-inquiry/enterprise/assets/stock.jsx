import React from 'react';
import { Tabs } from '@/common';
import { Pledge, Mortgage } from '@/views/asset-excavate/financial-assets/table-version';
import { toGetNumber } from '@/utils/promise';

export default class Stock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: props.data.filter(i => i.data > 0)[0].id,
			config: [
				{
					id: 10501,
					name: '股权出质',
					number: toGetNumber(props.data, 10501),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10501)),
				},
				{
					id: 10502,
					name: '股权质权',
					number: toGetNumber(props.data, 10502),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10502)),
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
		const { config, sourceType } = this.state;
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					prefix={<div className="yc-tabs-simple-prefix">股权质押</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10501 ? <Pledge /> : null}
					{sourceType === 10502 ? <Mortgage /> : null}
				</div>
			</div>
		);
	}
}
