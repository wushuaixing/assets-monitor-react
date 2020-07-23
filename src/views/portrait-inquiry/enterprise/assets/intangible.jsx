import React from 'react';
import { Tabs } from '@/common';
import { toGetNumber } from '@/utils/promise';
import {
	TableVersionDumpingRight, TableVersionMiningRight, TableVersionCopyright, TableVersionConstruction,
} from '@/views/asset-excavate/intangible-assets/table-version';

const fakeData = [{ id: 10601, data: 20 }, { id: 10602, data: 30 }, { id: 10603, data: 30 }, { id: 10604, data: 30 }];
export default class Intangible extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [
				{
					id: 10601,
					name: '排污权',
					number: toGetNumber(fakeData, 10601),
					showNumber: true,
					disabled: !(toGetNumber(fakeData, 10601)),
				},
				{
					id: 10602,
					name: '矿业权',
					number: toGetNumber(fakeData, 10602),
					showNumber: true,
					disabled: !(toGetNumber(fakeData, 10602)),
				},
				{
					id: 10603,
					name: '商标专利',
					number: toGetNumber(fakeData, 10603),
					showNumber: true,
					disabled: !(toGetNumber(fakeData, 10703)),
				},
				{
					id: 10604,
					name: '建筑建造资质',
					number: toGetNumber(fakeData, 10604),
					showNumber: true,
					disabled: !(toGetNumber(fakeData, 10604)),
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
					symbol="none"
					onChange={this.onSourceType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">无形资产</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10601 ? <TableVersionDumpingRight /> : null}
					{sourceType === 10602 ? <TableVersionMiningRight /> : null}
					{sourceType === 10603 ? <TableVersionCopyright /> : null}
					{sourceType === 10604 ? <TableVersionConstruction /> : null}
				</div>
			</div>
		);
	}
}
