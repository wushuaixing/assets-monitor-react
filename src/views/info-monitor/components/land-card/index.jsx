import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { landTransferCount, landMortgageCount, landTransactionCount } from 'api/monitor-info/excavate/count';
import { toThousands } from '@/utils/changeTime';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Land extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			transferNum: 0,
			mortgageNum: 0,
			transactionNum: 0,
		};
	}

	componentDidMount() {
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount=() => {
		const params = {
			isRead: 0,
		};
		landTransferCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					transferNum: res.data,
				});
			}
		});
		landMortgageCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					mortgageNum: res.data,
				});
			}
		});
		landTransactionCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					transactionNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, landPropsData, landPropsData: {
				totalCount, loading, gmtUpdate, mortgagee, mortgageeAmount, owner, ownerAmount,
			},
		} = this.props;
		const { transferNum, mortgageNum, transactionNum } = this.state;
		const unReadCount = transferNum + mortgageNum + transactionNum;
		return (
			<Card
				IconType="land"
				Loading={loading}
				onClick={() => navigate(url)}
				IconColor={{ color: '#1C80E1' }}
				customStyle={hasCountStyle}
				text="土地信息"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(landPropsData).length !== 0 && (
					<div className="risk-land-container">
						<div className="risk-land-container-card" style={{ paddingBottom: '10px', color: '#7D8699' }}>
							<span style={{ color: '#FB5A5C' }}>*</span>
							原土地使用权人不计入角色统计
						</div>

						<div className={`risk-land-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							使用权人：
							<span className={`risk-land-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{owner || 0}</span>
								条
							{ownerAmount ? (
								<span style={{ paddingLeft: '5px' }}>
									(涉及土地价值
									<span style={{ color: '#FB5A5C', padding: '0 5px' }}>{ toThousands(ownerAmount)}</span>
									元)
								</span>
							) : null}
						</div>

						<div className={`risk-land-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							抵押权人：
							<span className={`risk-land-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{mortgagee || 0}</span>
								条
							{mortgageeAmount ? (
								<span style={{ paddingLeft: '5px' }}>
									(涉及抵押额
									<span style={{ color: '#FB5A5C', padding: '0 5px' }}>{ toThousands(mortgageeAmount)}</span>
									元)
								</span>
							) : null}
						</div>
					</div>
				)}
			</Card>
		);
	}
}
