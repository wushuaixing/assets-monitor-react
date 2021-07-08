import React from 'react';
import { Spin, Tabs } from '@/common';
import LegalCaseTable from '@/views/risk-monitor/legal-case/table/table-version';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';

export default class LegalCaseIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: toGetNumber(props.data, 20301) ? 20301 : 20302,
			config: [
				{
					id: toGetNumber(props.data, 20301) ? 20301 : 20302,
					name: '列入',
					number: toGetNumber(props.data, 20301),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20301),
				},
				{
					id: 20302,
					name: '已移除',
					number: toGetNumber(props.data, 20302),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20302),
				}],
			brokenInfo: {
				status: props.portrait === 'business',
				loading: true,
				once: 0,
				yet: 0,
			},
			modalInfo: {
				visible: false,
				title: '',
			},
		};
	}

	onSourceType=(val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	toShowList=(count, field) => {
		const { modalInfo } = this.state;
		if (!count) return;
		this.setState({
			modalInfo: Object.assign({}, modalInfo, {
				visible: true,
				type: field === 'yet' ? 1 : 2,
			}),
		});
	};

	render() {
		const {
			config, sourceType, brokenInfo: b,
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
							<span>终本案件</span>
						</div>
					)}
					suffix={(
						<div className="yc-tabs-suffix-dishonest" style={{ display: b.status ? '' : 'none' }}>
							<Spin simple visible={b.loading} text="loading...">
								<div className="dishonest-count">
									<span className={b.yet && 'yc-table-text-link'} onClick={() => this.toShowList(b.yet, 'yet')}>{`列入：${b.yet}`}</span>
									<span className={b.once && 'yc-table-text-link'} onClick={() => this.toShowList(b.once, 'once')}>{`移除：${b.once}`}</span>
								</div>
							</Spin>
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					<LegalCaseTable {...params} />
				</div>
			</div>
		);
	}
}
