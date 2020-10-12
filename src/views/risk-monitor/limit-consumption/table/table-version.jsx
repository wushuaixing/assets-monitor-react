import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import { Spin, Table } from '@/common';
import { linkDom, timeStandard } from '@/utils';

export default class TableVersion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	toGetColumns=() => [
		{
			title: '限制高消费',
			dataIndex: 'caseNumber',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
						{value ? linkDom(row.url, value.replace('（', '( ')) : '-'}
					</li>
					<li>
						<span className="list list-title align-justify">关联对象</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">张三</span>
					</li>
				</div>
			),
		}, {
			title: '关联信息',
			width: 270,
			dataIndex: 'gmtModified',
			render: value => (
				<div className="assets-info-content">
					<li style={{ height: 24 }} />
					<li>
						<span className="list list-title align-justify">更新日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(value)}</span>
					</li>
				</div>
			),
		},
	];

	// 当前页数变化
	onPageChange = (val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData = (page) => {
		const { portrait, option } = this.props;
		// 默认查询债务人的限制高消费list
		const { api, params } = getDynamicRisk(portrait, option || {
			b: 20701,
		});
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
			...params,
		})
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						dataSource: [
							{
								url: 'www.baidu.com',
								caseNumber: '(2020)沪0117执2263号',
								registerDate: '2020-10-01',
								gmtModified: '2020-10-22',
								status: 0,
								isRead: false,
								isAttention: 1,
								personName: '易烊千玺',
								companyName: '青岛啤酒厂有限公司青岛',
								obligorType: 1,
								obligorNumber: '340603654235455',
								obligorId: 327157,
								content: '杭州凭信科技有限公司:本院于2020年08月12日立案执行申请人梁光超申请执行你单位劳动争议仲裁一案,因你单位未按执行通知书指定的期间履行生效法律文书确定的给付义务,本院依照《中华人民共和国民事诉讼法》第二百五十五条和《最高人民法院关于限制被执行人高消费及有关消费的若干规定》第一条、第三条的规定,对你单位采取限制消费措施,限制你单位及你单位法定代表人陈志宏不得实施以下高消费及非生活和工作必需的消费行为:(一)乘坐交通工具时,选择飞机、列车软卧、轮船二等以上舱位;(二)在星级以上宾馆、酒店、夜总会、高尔夫球场等场所进行高消费;(三)购买不动产或者新建、扩建、高档装修房屋;(四)租赁高档写字楼、宾馆、公寓等场所办公;(五)购买非经营必需车辆;(六)旅游、度假;(七)子女就读高收费私立学校;(八)支付高额保费购买保险理财产品;(九)乘坐G字头动车组列车全部座位、其他动车组列车一等以上座位等其他非生活和工作必需的消费行为。如你单位(法定代表人、主要负责人、影响债务履行的直接责任人员、实际控制人)因私消费以个人财产实施前述行为的,可以向本院提出申请。如你单位因经营必需而进行前述禁止的消费活动的,应当向本院提出申请,获批准后方可进行。如违反限制消费令,经查证属实的,本院将依照《中华人民共和国民事诉讼法》第一百一十一条的规定,予以罚款、拘留;情节严重,构成犯罪的,依法追究刑事责任。此令二0二0年八月十八日',
								id: 89565,
							},
							{
								url: '',
								caseNumber: '(2020)沪0117执2263号',
								registerDate: '2020-10-01',
								gmtModified: '2020-10-22',
								status: 1,
								isRead: false,
								isAttention: 1,
								id: 89562,
								personName: '易烊千玺',
								companyName: '青岛啤酒厂有限公司青岛',
								obligorType: 2,
								obligorId: 327157,
							},
							{
								url: '',
								caseNumber: '(2020)沪0117执2263号',
								registerDate: '2020-10-01',
								gmtModified: '2020-10-22',
								status: 1,
								isRead: false,
								isAttention: 1,
								id: 895222,
								personName: '易烊千玺',
								companyName: null,
								obligorType: 1,
								obligorId: 327157,
							},
						],
						// dataSource: res.data.list,
						current: res.data.page,
						total: res.data.total,
						loading: false,
					});
				} else {
					this.setState({
						dataSource: '',
						current: 1,
						total: 0,
						loading: false,
					});
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	render() {
		const { dataSource, current, total } = this.state;
		const { loading } = this.state;
		const { loadingHeight } = this.props;
		return (
			<div className="yc-assets-auction ">
				<Spin visible={loading} minHeight={(current > 1 && current * 5 >= total) ? '' : loadingHeight}>
					<Table
						rowClassName={() => 'yc-assets-auction-table-row'}
						columns={this.toGetColumns()}
						dataSource={dataSource}
						showHeader={false}
						pagination={false}
					/>
					{dataSource && dataSource.length > 0 && (
						<div className="yc-table-pagination">
							<Pagination
								showQuickJumper
								current={current || 1}
								total={total || 0}
								pageSize={5}
								onChange={this.onPageChange}
								showTotal={totalCount => `共 ${totalCount} 条信息`}
							/>
						</div>
					)}
				</Spin>
			</div>
		);
	}
}
