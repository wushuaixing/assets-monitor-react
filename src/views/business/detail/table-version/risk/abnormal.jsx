import React from 'react';
import { Abnormal } from '@/views/risk-monitor/operation-risk/table-version';
import { toGetNumber } from '@/utils/promise';
import { toGetModuleHeight as toH } from '@/utils';

export default class AbnormalIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: toGetNumber(props.data, 30301),
		};
	}

	render() {
		const { id, data, portrait } = this.props;
		const { count } = this.state;
		const h = toH(30301, toGetNumber(data, 30301), portrait);
		return (
			<div className="yc-inquiry-public-table" style={{ paddingBottom: 30 }} id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">{`经营异常 ${count || 0}`}</div>
				</div>
				<div className="inquiry-public-table">
					<Abnormal {...this.props} loadingHeight={h} />
				</div>
			</div>
		);
	}
}
