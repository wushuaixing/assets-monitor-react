import React from 'react';
import { Button, Spin, NoContent } from '@/common';
import { parseQuery } from '@/utils';
import { judgmentDetail } from '@/utils/api/index';
import './style.scss';

class Judgement extends React.Component {
	constructor(props) {
		super(props);
		document.title = '文书正文';
		this.state = {
			loading: true,
			url: '',
			htmlText: '',
			title: '',
		};
	}

	componentWillMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		const newParams = {
			pid: params.pid,
			sourceId: parseInt(params.sourceId, 10),
		};
		this.setState({
			title: params.title,
		});
		this.getData(newParams);
	}

	// 请求数据
	getData = (params) => {
		judgmentDetail(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					loading: false,
					url: 'http://www.baidu.com',
					htmlText: '11',
				});
			} else {
				this.setState({
					loading: false,
				});
			}
		}).catch((err) => {
			console.log(err);
			this.setState({
				loading: false,
			});
		});
	};

	// 手动跳转源链接
	handleJumpSourceLink = () => {
		const { url } = this.state;
		console.log('url', url);
		const w = window.open('about:blank');
		w.location.href = url;
	};

	render() {
		const { loading, htmlText, title } = this.state;
		return (
			<Spin visible={loading}>
				{
					htmlText ? (
						<div className="judgement">
							<div className="judgement-header">
								<span className="judgement-header-title">{title}</span>
								<Button className="judgement-header-btn" onClick={this.handleJumpSourceLink}>源链接</Button>
							</div>
							<div className="judgement-line">
								<div className="judgement-line-title">文书正文</div>
								<div className="judgement-line-line" />
							</div>
							<div className="judgement-body">
								<div className="judgement-body-title">
									<div>河北省定兴县人民法院</div>
									<div>刑事判决书</div>
								</div>
								<div className="judgement-body-subtitle">(2017)冀0626刑初24号</div>
								<div className="judgement-body-text">
									<p className="judgement-body-text-article">
										公诉机关定兴县人民检察院。
										被告人李四，男，1991年6月22日出生，汉族，农民，小学文化，湖南省黄石市阳新县太子镇四松村人住。2012年8月28日因犯非法拘禁罪被湖北省孝感市孝南区人民法院判处有期徒刑八个月。2016年10月30日因涉嫌犯盗窃罪被定兴县公安局刑事拘留，2017年1月10日被逮捕。

										指定辩护人曹立华，定兴县法律援助中心律师。

										定兴县人民检察院以定检公诉刑诉【2017】21号起诉书指控被告人李四犯盗窃罪，于2017年3月7日向本院提起公诉。本院依法组成合议庭，公开开庭审理了本案。定兴县人民检察院指派检察员梁雪松、代理检察员甄会鹏出庭支持公诉，被告人李四及其辩护人曹立华、被告人哑语翻译马彦、齐卫华到庭参加了诉讼。现已审理终结。

										公诉机关指控，2016年10月30日下午14时许，被告人李四在定兴县大钟寺购物广场地下超市内盗窃李佳黑色背包一个，内有人民币1200元，苹果6S手机一部，价值人民币3629元，后被告人被抓获。案发后，赃物已提取返还失主。

										针对上述指控，公诉机关向法庭提供了相关证据，并建议适用《中华人民共和国刑法》第二百六十四条之规定对被告人李四进行处罚。

										被告人李四对公诉机关指控的犯罪事实无异议，表示认罪。辩护人辩称被告人李四系聋哑人犯罪，按照法律规定可以从轻、减轻处罚.

										经审理查明，2016年10月30日下午14时许，被告人李四在定兴县大钟寺购物广场地下超市内盗窃李佳黑色背包一个，内有人民币1200元，苹果6S手机一部，价值人民币3629元，后被告人被抓获。案发后，赃物已提取返还失主。

										上述事实有下列证据予以证实：

										被告人李四供述:2016年10月30日的下午两点的时候，我在大钟寺购物广场地下超市的一辆购物车内偷了一个黑色的背包，当时包的主人在哄孩子，没注意，后来我被保安抓住了，我把偷的东西都给保安了，被保安抓住后，我才知道包里有一部手机苹果6S，手机套是黑色的，还有一个钱包，钱包里里有人民币1200元。

										2、失主李佳亦证实其在2016年10月30日在大钟寺地下购物广场丢失一个黑色背包的过程。她还证实她的背包里有现金人民币1200元及苹果6S手机一部的事实。

										3、大钟寺保安史晓辰证实：2016年10月30日中午的时候，我在购物广场内巡逻，当时我们看门的保安告诉我来了三个聋哑人，去了地下超市，我就跟了下去，我刚走到下楼的楼梯那，就看见有两个小伙子，有一个小伙子手里拿着一个女士的背包在往上跑，一个在后面跟着，当时我就把那个拿包的小伙子给抓住了，另一个就跑了。之后我把他带到市场派出所的警务室，我就在广播中找失主，然后就报了案，我就询问那个偷包的人，发现他不会说话，过了一会儿，有个叫李佳的人就来认领背包，我把背包交给了她。

										4、定兴县公安局调取证据清单及发还物品清单。

										5、李四所盗窃的背包照片，内有钱包一个及苹果6S手机一部和银行卡等物。

										6、定兴县物价局价格认证中心价格鉴定意见书意见：苹果6S手机一部价值人民币3629元。

										7、定兴县公安局治安管理大队情况说明。

										8、定兴县公安局治安管理大队抓破经过证实李四为聋哑人，因盗窃于2016年10月30日被抓获。

										9、湖北省孝感市孝南区人民法院（2012）鄂孝南刑初第00169号刑事判决书证实被告人李四于2012年8月28日因犯非法拘禁罪被判处有期徒刑八个月。

										10、被告人李四人口信息。

										上述证据均经庭审质证，被告人无异议。

										本院认为，被告人李四以非法占有为目的，在公共场所进行盗窃，其行为已构成盗窃罪，定兴县人民检察院指控被告人李四所犯罪名成立。被告人李四具有以下量刑情节：1、被释放后五年内又犯新罪，系累犯；2、系聋哑人犯罪；3、当庭自愿认罪。根据上述情节，可以对其从轻处罚。本院为打击犯罪，保护公民的合法财产不受侵犯，依照《中华人民共和国刑法》第二百六十四条、第十九条、第六十五条第一款、第六十七条第三款之规定，判决如下：

										被告人李四犯盗窃罪，判处有期徒刑七个月，并处罚金人民币四千元。

										刑期从判决执行之日起计算。判决执行以前先行羁押的，羁押一日折抵刑期一日。即自2016年10月30日起至2017年5月29日止。罚金限判决生效后十日内缴纳。

										如不服本判决，可在接到判决书的第二日起十日内，通过本院或者直接向河北省保定市中级人民法院提出上诉。书面上诉的，应当提交上诉状正本一份，副本两份。
									</p>
								</div>
							</div>
						</div>
					) : <NoContent font="暂未查到相关文书详情" style={{ paddingTop: 50 }} />
				}
			</Spin>
		);
	}
}
export default Judgement;
