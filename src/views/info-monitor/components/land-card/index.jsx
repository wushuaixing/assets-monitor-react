import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { toThousands } from '@/utils/changeTime';
import { landCard } from '@/utils/api/monitor-info/excavate/index';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Land extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			gmtUpdate: '',
			mortgagee: '',
			mortgageeAmount: '',
			owner: '',
			ownerAmount: '',
			totalCount: 0,
		};
	}

	componentDidMount() {
		this.getCardData();
	}

	// 获取消息列表
	getCardData = () => {
		this.setState({ loading: true });
		landCard().then((res) => {
			if (res.code === 200) {
				const {
					gmtUpdate, mortgagee, mortgageeAmount, owner, ownerAmount,
				} = res.data;
				const dataSourceNum = Number(mortgagee || 0) + Number(owner || 0);
				this.setState({
					loading: false,
					gmtUpdate,
					mortgagee, // 抵押权人
					mortgageeAmount, // 抵押额
					owner, // 使用权人
					ownerAmount, // 土地价值
					totalCount: dataSourceNum,
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { url } = this.props;
		const {
			totalCount, loading, gmtUpdate, mortgagee, mortgageeAmount, owner, ownerAmount,
		} = this.state;
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
			>
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
			</Card>
		);
	}
}
