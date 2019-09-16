import React from 'react';
import { Table, Form, Tooltip } from 'antd';
import { formatDateTime, toThousands } from '@/utils/changeTime';
import {
	parseQuery,
} from '@/utils';

const status = (value) => {
	switch (value) {
	case 1: return '即将开始';
	case 3: return '正在进行';
	case 5: return '已成交';
	case 7: return '已流拍';
	case 9: return '中止';
	case 11: return '撤回';
	default: return '-';
	}
};

// 性别
const sex = (value) => {
	switch (value) {
	case 0: return '未知';
	case 1: return '男';
	case 2: return '女';
	default: return '-';
	}
};

// 任务类型
const type = (value) => {
	switch (value) {
	case 1: return '资产所有人';
	case 2: return '债权人';
	case 3: return '资产线索';
	case 4: return '起诉人';
	case 5: return '竞买人';
	default: return '-';
	}
};
const getName = () => {
	const { hash } = window.location;
	const params = parseQuery(hash);
	return params.name ? params.name : '';
};

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: '资产匹配信息',
					dataIndex: 'title',
					key: 'title',
					width: 720,
					render(text, row) {
						return (
							<div className="yc-td-hl">
								<a href={row.url} target="_blank" rel="noopener noreferrer" className="yc-td-header" dangerouslySetInnerHTML={{ __html: row.title }} />
								{
									row.obligors && row.obligors.length > 0 && (
									<div>
										<div>● 结构化信息提取结果</div>
										{
											row.obligors.length > 0 && row.obligors.map(item => (
												<div>
													{`${type(item.type)}: ${item.name} ${item.birthday || item.gender !== 0 || item.number ? `(${item.gender === 0 ? '' : ` ${item.number ? '' : `性别: ${sex(item.gender)}`} `}  ${item.number ? `证件号: ${item.number}` : `${item.birthday ? `生日: ${item.birthday}` : ''}`} ${item.notes})` : ''}`}
												</div>
											))
										}
									</div>
									)
								}
								{row.patternText && (
								<div>
									<div>
										● 根据
										{`"${getName()}"`}
										匹配
									</div>
									<div>
										<span style={{ marginRight: '10px' }}>链接原内容:</span>
										{<span dangerouslySetInnerHTML={{ __html: row.patternText }} />}
									</div>
								</div>
								)}

							</div>
						);
					},
				}, {
					title: '拍卖信息',
					dataIndex: 'court',
					key: 'court',
					render(text, row) {
						return (
							<div className="table-column">
								<div style={{
									display: 'inline-block', float: 'left', verticalAlign: 'top', lineHeight: '22px',
								}}
								>
									<div>
										<span>
											<span className="yc-td-title" style={{ marginRight: '4px' }}>处置机关:</span>
											<p style={{ display: 'inline-block', width: 120, marginRight: 6 }}>
												{
													text && text.length > 8
														? (
															<Tooltip placement="topLeft" title={text}>
																<p>{`${text.substr(0, 8)}...`}</p>
															</Tooltip>
														)
														: <p>{text || '-'}</p>
												}
											</p>
										</span>
										<span>
											<span className="yc-td-title" style={{ marginRight: '4px' }}>评估价:</span>
											<p style={{ display: 'inline-block' }}>
												{toThousands(row.consultPrice) || '-'}
											</p>
										</span>
									</div>
									<div>
										<span>
											<span className="yc-td-title" style={{ marginRight: '4px' }}>拍卖时间:</span>
											<p style={{ display: 'inline-block', width: 120, marginRight: 6 }}>
												{formatDateTime(row.start) || '-'}
											</p>
										</span>
										<span>
											<span className="yc-td-title" style={{ marginRight: '4px' }}>起拍价:</span>
											<p style={{ display: 'inline-block' }}>
												{toThousands(row.initialPrice) || '-'}
											</p>
										</span>
									</div>
									<div>
										<span className="yc-td-title" style={{ marginRight: '4px' }}>拍卖状态:</span>
										<p style={{ display: 'inline-block' }}>
											{
												status(row.status)
											}
										</p>
									</div>
								</div>
							</div>
						);
					},
				}],
		};
	}

	render() {
		const { columns } = this.state;
		const { dataList } = this.props;

		return (
			<React.Fragment>
				<Table
					rowKey={record => record.id}
					dataSource={dataList.length > 0 && dataList}
					columns={columns}
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
					onRowClick={() => {
						// if (!record.children) {
						// 	const w = window.open('about:blank');
						// 	w.location.href = '#/monitor';
						// }
					}}
				/>
			</React.Fragment>
		);
	}
}
export default Form.create()(BusinessView);
