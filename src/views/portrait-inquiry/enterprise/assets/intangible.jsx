import React from 'react';
import { Tabs } from '@/common';
import { toGetNumber } from '@/utils/promise';
import { TableVersionDumpingRight, TableVersionMiningRight, TableVersionCopyright,  TableVersionConstruction} from '@/views/asset-excavate/intangible-assets/table-version';

export default class Intangible extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [
				{
					id: 10701,
					name: '排污权',
					number: toGetNumber(props.data, 10701),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10701)),
				},
				{
					id: 10702,
					name: '矿业权',
					number: toGetNumber(props.data, 10702),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10702)),
				},
				{
					id: 10703,
					name: '商标专利',
					number: toGetNumber(props.data, 10703),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10703)),
				},
				{
					id: 10704,
					name: '建筑建造资质',
					number: toGetNumber(props.data, 10704),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10704)),
				},
			],
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
					prefix={<div className="yc-tabs-simple-prefix">无形资产</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10701 ? <TableVersionDumpingRight /> : null}
					{sourceType === 10702 ? <TableVersionMiningRight /> : null}
					{sourceType === 10703 ? <TableVersionCopyright /> : null}
					{sourceType === 10704 ? <TableVersionConstruction /> : null}

				</div>
			</div>
		);
	}
}
