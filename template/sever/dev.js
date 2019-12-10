
var fs =require('fs');
// var cleanCSS = require('clean-css');
var dataSource = require('./data');
var _dataSource = JSON.stringify(dataSource);

var backgroundImg  = fs.readFileSync('./template/img/watermark.png',);
var iconImg  = fs.readFileSync('./template/img/icon_shixin.png',);

// 转换为 data:image/jpeg;base64,***** 格式的字符串

var backgroundImgData = 'data:image/png;base64,' +  new Buffer.alloc(65*1024,backgroundImg).toString('base64');

var iconImgData = 'data:image/png;base64,' +  new Buffer.alloc(4*1024,iconImg).toString('base64');

var htmlResultStr1  = fs.readFileSync('./template/src/enterprise.html','utf8');
var htmlResultStr2  = fs.readFileSync('./template/src/personal.html','utf8');

const cssResult  = fs.readFileSync('./template/src/index.css','utf8');
// const minifyCss = new cleanCSS().minify(cssResult);

var htmlEnterprise = htmlResultStr1.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g,'').replace("___style___",cssResult);
var htmlPersonal = htmlResultStr2.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g,'').replace("___style___",cssResult);

function exportTemplate(source,exportType) {
	var data = JSON.parse(source);
	var fun = {
		source:{
			labelType: [
				{id: 1, value: "资产所有人"},
				{id: 2, value: "债权人"},
				{id: 3, value: "资产线索"},
				{id: 5, value: "竞买人"},
			],
			auctionType:[
				{id: 1, value: "即将开始"},
				{id: 3, value: "拍卖中"},
				{id: 5, value: "成功交易"},
				{id: 7, value: "已流拍"},
				{id: 9, value: "终止"},
				{id: 11, value: "撤回"},
			],
			mortgage:[
				{id: 1, value: "抵押物所有人"},
				{id: 2, value: "抵押权人"},
			],
			stock:[
				{id: 1, value: "股权持有人"},
				{id: 2, value: "股权质权人"},
			],
			infoType:[
				{id: 1, value: "立案信息", field: "trial"},
				{id: 2, value: "开庭信息", field: "court"},
				{id: 3, value: "裁判文书", field: "judgment"},
			],
			landType:[
				{id: 1, value: "土地出让", field: ""},
				{id: 2, value: "土地转让", field: ""},
				{id: 3, value: "土地抵押", field: ""},
			],
			landRole:[
				{id: 1, value: "出让结果中的受让方"},
				{id: 2, value: "转让信息中的原土地使用权人"},
				{id: 3, value: "转让信息中的受让方"},
				{id: 4, value: "抵押信息中的土地所有人"},
				{id: 5, value: "抵押信息中的抵押权人"},
			],
			taxRole:[
				{id: 1, value: "作为纳税主体", field: ""},
				{id: 2, value: "作为法人", field: ""},
				{id: 3, value: "作为财务", field: ""},
			]
		},
		toGetType:function (source,options,field,isAry,fillText) {
			if (isAry) {
				if (source.length) {
					var result = [];
					source.forEach(function (item) {
						var typeName = '';
						options.forEach(function (i) {
							if (item[field] === i.id) {
								typeName = i.value;
							}
						});
						if (typeName) result.push(typeName);
					});
					return result.length ? result.join('、') : (fillText || '--');
				}
				return fillText || '--';
			} else {
				if (source) {
					var typeName = '';
					options.forEach(function (i) {
						if (source === i.id) {
							typeName = i.value;
						}
					});
					return typeName || fillText || "--";
				}
				return fillText || '--';
			}
		},
		toNumberStr:function (num){
			if(num && typeof num==='number'){
				if(Boolean(num%1)){
					return Number(num.toFixed(2)).toLocaleString()+' 元';
				}
				return num.toLocaleString()+'.00 元';
			}
			return '--';
		},
		toShowPrice:function (item) {
			if(item.process===1){
				return "<span class='n-title'>起拍价：</span><span class='n-desc'>"+this.toNumberStr(item.initialPrice) +"</span>";
			}else if(item.process===5){
				return "<span class='n-title'>成交价：</span><span class='n-desc'>"+this.toNumberStr(item.currentPrice) +"</span>";
			}
			return "<span class='n-title'>当前价：</span><span class='n-desc'>"+this.toNumberStr(item.currentPrice) +"</span>";
		},
		handleParties:function handleParties(data) {
			if(!data) return '--';
			var source = [];
			data.forEach(function (i) {
				if (source.length === 0) {
					source.push({
						index: source.length,
						role: i.role,
						child: [i]
					});
				} else {
					var _result = source.filter(function (item) {
						return item.role === i.role;
					})[0];
					if (_result) {
						source[_result.index].child.push(i);
					} else {
						source.push({
							index: source.length,
							role: i.role,
							child: [i]
						});
					}
				}
			});
			return source;
		},
		partiesList:function methods(data) {

			return data.length ? (data.map(function (item) {
				return "<li class='mg8-0'><div class='nAndI'><span class='n-title'>".concat(item.role, "：<label class='n-desc'>").concat(item.child.map(function (i) {
					return i.name;
				}).join('、'), "</label></span></div></li>");
			})).join('') : "";
		},
		toRegStatus:function(val){
			if (val) {
				if (val.match(/(存续|在业)/)) return ' regStatus-green';
				if (val.match(/(迁出|其他)/)) return ' regStatus-orange';
				if (val.match(/(撤销|吊销|清算|停业|注销)/)) return ' regStatus-red';
				return "";
			}
			return '';
		},
		toGetCaseType:function methods(value) {
			if(value){
				var res =value;
				switch (value) {
					case 1:res='普通案件';break;
					case 2:res='破产案件';break;
					case 3:res='执行案件';break;
					case 4:res='终本案件';break;
				}
				return res;
			}
			return ''
		},
		toGetYearList:function (list,field) {
			if(list.length>5){
				list.sort(function (a,b) { return b.year-a.year;});
				var base = (list.slice(0, 4)).sort(function (a, b) {return a.year - b.year;});
				var other = list.slice(4);
				var otherText= other[0].year;
				var otherCount = 0;
				other.forEach(function (item) { otherCount+=item.count; });
				base.unshift({
					count:otherCount,
					year:otherText+'及以前'
				});
				return base;
			}
			if(field){
				list.sort(function (a, b) {return a[field] - b[field];})
			}
			list.forEach(function (item) {
				if (item.year === 0) item.year = '未知';
			});
			return list;
		},
	};

	var htmlTemp = exportType?htmlEnterprise:htmlPersonal;

	htmlTemp=htmlTemp.replace("../img/watermark.png",backgroundImgData);
	htmlTemp=htmlTemp.replace("../img/icon_shixin.png",iconImgData);
	/* 基本信息模块 */
	var dataTime = new Date().getFullYear() +'年' +(new Date().getMonth()+1)+"月"+new Date().getDate()+"日";
	htmlTemp = htmlTemp.replace(/{base.dateTime}/g, dataTime);


	if(exportType){
		var infoInput = function (source) {
			htmlTemp = htmlTemp.replace("{info.name}", source.name||'--');
			["name","legalPersonName","regCapital","establishTime"].forEach(function (item) {
				htmlTemp = htmlTemp.replace("{info." + item + "}", source[item]||'--');
			});

			var formerNames= (source.formerNames.length)?source.formerNames.join('、'):'--';
			htmlTemp = htmlTemp.replace("{info.formerNames}", formerNames);
			htmlTemp = htmlTemp.replace("{info.logoUrl}", (source.logoUrl?("<img src=\""+source.logoUrl+"\" alt=\"\" width=\"67\">"):""));
			var regStatus =fun.toRegStatus(source.regStatus);
			htmlTemp = htmlTemp.replace("{info.regStatus}", (regStatus?"<span class=\"n-regStatus"+regStatus+"\">"+source.regStatus+"</span>":""));
		};
		infoInput(data.A10101);
		htmlTemp = htmlTemp.replace("{info.dishonest}", (data.A10102?"<span class=\"img-icon\"></span>":""));
	}else{
		var infoInput2 = function (source) {
			htmlTemp = htmlTemp.replace(/{info.name}/g, source.name||'--');
			htmlTemp = htmlTemp.replace(/{info.number}/g, source.number||'--');
		};
		infoInput2(data.B10101);
		htmlTemp = htmlTemp.replace("{info.firstName}", data.B10101.name?data.B10101.name[0]:'');
		htmlTemp = htmlTemp.replace("{info.dishonest}", (data.B10102?"<span class=\"img-icon\"></span>":""));
		htmlTemp = htmlTemp.replace("{info.logoUrl}", (source.logoUrl?("<img src=\""+source.logoUrl+"\" alt=\"\" width=\"67\">"):""));
	}

	/* 概览模块 */
	var overViewTable = function (list,columns,option) {
		var trLength= Math.ceil(list.length/columns);
		var res = [];
		for(var i = 1;i<=trLength;i+=1){
			var childList =list.slice(columns * i - columns, columns * i);
			var childRes ="<tr>";
			if (childList.length < columns && !option.isFill) {
				childList = childList.concat(new Array(columns - childList.length));
			}
			childList.forEach(function (item) {
				if(item){
					var childName = option.options
						?fun.toGetType(item[option.name],option.options,option.field,option.isAry,option.fillText)
						:item[option.name];
					childRes += ("<td><span class=\"mg-r\">" + childName + "：</span>" +
						"<span class=\"fw-bold \">" + item[option.count]+(option.numberUnit||'') +
						"</span><span>"+(option.unit||" 条")+"</span>" +
						(option.remark ? eval(option.remark) : '') + "</td>");
				}else{
					childRes+="<td></td>";
				}

			});
			childRes+="</tr>";
			res.push(childRes);
		}
		return res.length>0?res.join(""):null;
	};

	var overView = function (source,viewName) {
		var yearTotal = 0;
		var roleTotal = 0;
		var result = false;
		var itemData='';
		if(viewName==="overview.A10201"||viewName==="overview.B10201"){
			if((source.auctionInfos||[]).length){
				source.auctionInfos.forEach(function (item) {
					if (item.type === 2) {
						if(item.count>0){
							htmlTemp = htmlTemp.replace("{" + viewName + ".total}", item.count);
							if (item.roleDistributions.length) {
								htmlTemp = htmlTemp.replace("{" + viewName + ".role.list}",
									overViewTable(item.roleDistributions, 4, {
										name: "type",
										count: "count",
										options: fun.source.labelType,
									}))
							}
							if (item.auctionResults.length) {
								htmlTemp = htmlTemp.replace("{" + viewName + ".result.list}",
									overViewTable(item.auctionResults, 4, {
										name: "type",
										count: "count",
										options: fun.source.auctionType,
									}))
							}
						}else{
							htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
						}

					}
				});
			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
			}
		}
		else if(viewName==="overview.A10202"){
			if((source.subrogationInfos||[]).length){
				fun.source.infoType.forEach(function (i) {
					var result = false;
					source.subrogationInfos.forEach(function (item) {
						if(item.type===i.id){
							if(item.count){
								result =true;
								htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".total}", item.count);
								if(item.caseReasons.length){
									htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".reason.list}",
										overViewTable(item.caseReasons, 4, {
											name: "type",
											count: "count",
										}))
								}
								if(item.caseTypes.length){
									htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".case.list}",
										overViewTable(item.caseTypes, 4, {
											name: "type",
											count: "count",
										}))
								}
								if(item.yearDistribution.length){
									htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".year.list}",
										overViewTable(fun.toGetYearList(item.yearDistribution), 5, {
											name: "year",
											count: "count",
										}))

								}
							}
						}
					});
					if (!result){
						htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".display}", "display-none");
					}
				})
			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".trial.display}", "display-none");
				htmlTemp = htmlTemp.replace("{" + viewName + ".court.display}", "display-none");
				htmlTemp = htmlTemp.replace("{" + viewName + ".judgment.display}", "display-none");
			}
		}
		else if(viewName==="overview.B10202"){
			if(source.subrogationInfos){
				itemData =source.subrogationInfos;
				if(itemData.count){
					result =true;
					htmlTemp = htmlTemp.replace("{" + viewName +  ".total}", itemData.count);
					if(itemData.caseReasons.length){
						htmlTemp = htmlTemp.replace("{" + viewName +  ".reason.list}",
							overViewTable(itemData.caseReasons, 4, {
								name: "type",
								count: "count",
							}))
					}
					if(itemData.caseTypes.length){
						htmlTemp = htmlTemp.replace("{" + viewName +  ".case.list}",
							overViewTable(itemData.caseTypes, 4, {
								name: "type",
								count: "count",
							}))
					}
					if(itemData.yearDistribution.length){
						htmlTemp = htmlTemp.replace("{" + viewName +  ".year.list}",
							overViewTable(fun.toGetYearList(itemData.yearDistribution), 5, {
								name: "year",
								count: "count",
							}))

					}
				}
				if (!result){
					htmlTemp = htmlTemp.replace("{" + viewName +  ".display}", "display-none");
				}
			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
			}
		}
		else if(viewName==="overview.A10203"){
			var landTotal =0;
			if((source.infoTypes||[]).length||(source.roleDistributions||[]).length||(source.yearDistributions||[]).length){
				if ((source.infoTypes || []).length) {
					source.infoTypes.forEach(function (item) {
						landTotal += item.count;
					});
					htmlTemp = htmlTemp.replace("{" + viewName + ".type.list}",
						overViewTable(source.infoTypes, 4, {
							name: "type",
							count: "count",
							options: fun.source.landType,
							field: "type",
						}))
				} else {
					htmlTemp = htmlTemp.replace("{" + viewName + ".type.display}", "display-none");
				}
				if ((source.roleDistributions || []).length) {
					htmlTemp = htmlTemp.replace("{" + viewName + ".role.list}",
						overViewTable(source.roleDistributions, 4, {
							name: "type",
							count: "count",
							options: fun.source.landRole,
							field: "type",
						}))
				} else {
					htmlTemp = htmlTemp.replace("{" + viewName + ".role.display}", "display-none");
				}
				if ((source.yearDistributions || []).length) {
					htmlTemp = htmlTemp.replace("{" + viewName + ".year.list}",
						overViewTable(fun.toGetYearList(source.yearDistributions, "year"), 5, {
							name: "year",
							count: "count",
						}))
				} else {
					htmlTemp = htmlTemp.replace("{" + viewName + ".year.display}", "display-none");
				}
				htmlTemp = htmlTemp.replace("{" + viewName + ".total}", landTotal || 0);
			}
			htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
		}
		else if(viewName==="overview.B10203"){
			if(source.litigationInfos){
				 itemData =source.litigationInfos;
				if(itemData.count){
					result =true;
					htmlTemp = htmlTemp.replace("{" + viewName +  ".total}", itemData.count);
					if(itemData.caseReasons.length){
						htmlTemp = htmlTemp.replace("{" + viewName +  ".reason.list}",
							overViewTable(itemData.caseReasons, 4, {
								name: "type",
								count: "count",
							}))
					}
					if(itemData.caseTypes.length){
						htmlTemp = htmlTemp.replace("{" + viewName +  ".case.list}",
							overViewTable(itemData.caseTypes, 4, {
								name: "type",
								count: "count",
							}))
					}
					if(itemData.yearDistribution.length){
						htmlTemp = htmlTemp.replace("{" + viewName +  ".year.list}",
							overViewTable(fun.toGetYearList(itemData.yearDistribution), 5, {
								name: "year",
								count: "count",
							}))

					}
				}
				if (!result){
					htmlTemp = htmlTemp.replace("{" + viewName +  ".display}", "display-none");
				}
			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
			}
		}
		else if(viewName==="overview.A10204"){
			if((source.roleDistributions || []).length||(source.yearDistributions || []).length){
				if ((source.roleDistributions || []).length) {
					source.roleDistributions.forEach(function (item) {
						roleTotal += item.count;
					});

					htmlTemp = htmlTemp.replace("{" + viewName + ".role.list}",
						overViewTable(fun.toGetYearList(source.roleDistributions), 2, {
							name: "type",
							count: "count",
							options: fun.source.stock,
							field: "type",
							remark: "item.invalidCount?'<span class=\"remark\"> ( 其中\'+item.invalidCount+\'条质押登记状态为无效 )</span>':''",
						}))
				} else {
					htmlTemp = htmlTemp.replace("{" + viewName + ".role.display}", "display-none");
				}
				if ((source.yearDistributions || []).length) {
					source.yearDistributions.forEach(function (item) {
						yearTotal += item.count;
					});
					htmlTemp = htmlTemp.replace("{" + viewName + ".year.list}",
						overViewTable(fun.toGetYearList(source.yearDistributions, "year"), 5, {
							name: "year",
							count: "count",
						}))
				} else {
					htmlTemp = htmlTemp.replace("{" + viewName + ".year.display}", "display-none");
				}
				htmlTemp = htmlTemp.replace("{" + viewName + ".total}", roleTotal || yearTotal);
				if(!(roleTotal || yearTotal)){
					htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
				}
			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
			}
		}
		else if(viewName==="overview.B10204"){
			if(((source.assetOverviewDishonestInfo||{}).yearDistributions||[]).length){
				source.assetOverviewDishonestInfo.yearDistributions.forEach(function (item) {
					yearTotal += item.count;
				});
				htmlTemp = htmlTemp.replace("{" + viewName + ".total}", yearTotal);
				htmlTemp = htmlTemp.replace("{" + viewName + ".year.list}",
					overViewTable(fun.toGetYearList(source.assetOverviewDishonestInfo.yearDistributions,'year'), 5, {
						name: "year",
						count: "count",
					}))
			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
			}
		}
		else if(viewName==="overview.B10205"){
			if((source.taxIllegalInfoVO||[]).length){
				source.taxIllegalInfoVO.forEach(function (item) {
					roleTotal +=item.count;
				});
				htmlTemp = htmlTemp.replace("{" + viewName + ".role.list}",
					overViewTable(source.taxIllegalInfoVO, 4, {
						name: "type",
						count: "count",
						options: fun.source.taxRole,
					}));
				htmlTemp = htmlTemp.replace("{" + viewName + ".total}", roleTotal);
			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
			}
		}
		else if(viewName==="overview.A10205"){
			if((source.roleDistributions || []).length||(source.yearDistributions || []).length){
				if ((source.roleDistributions || []).length) {
					source.roleDistributions.forEach(function (item) {
						roleTotal += item.count;
					});
					htmlTemp = htmlTemp.replace("{" + viewName + ".role.list}",
						overViewTable(fun.toGetYearList(source.roleDistributions), 2, {
							name: "type",
							count: "count",
							options: fun.source.mortgage,
							field: "type",
							remark: "item.invalidCount?'<span class=\"remark\"> ( 其中\'+item.invalidCount+\'条质押登记状态为无效 )</span>':''",
						}))
				} else {
					htmlTemp = htmlTemp.replace("{" + viewName + ".role.display}", "display-none");
				}
				if ((source.yearDistributions || []).length) {
					source.yearDistributions.forEach(function (item) {
						yearTotal += item.count;
					});
					htmlTemp = htmlTemp.replace("{" + viewName + ".year.list}",
						overViewTable(fun.toGetYearList(source.yearDistributions, "year"), 5, {
							name: "year",
							count: "count",
						}))
				} else {
					htmlTemp = htmlTemp.replace("{" + viewName + ".year.display}", "display-none");
				}
				htmlTemp = htmlTemp.replace("{" + viewName + ".total}", roleTotal || yearTotal);
				if(!(roleTotal || yearTotal)){
					htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
				}
			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
			}
		}
		else if(viewName==="overview.A10206"){
			if((source.litigationInfos||[]).length ||((source.assetOverviewDishonestInfo||{}).yearDistributions||[]).length){
				if((source.litigationInfos||[]).length){
					fun.source.infoType.forEach(function (i) {
						var result = false;
						source.litigationInfos.forEach(function (item) {
							if(item.type===i.id){
								if(item.count){
									result =true;
									htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".total}", item.count);
									if(item.caseReasons.length){
										htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".reason.list}",
											overViewTable(item.caseReasons, 4, {
												name: "type",
												count: "count",
											}))
									}
									if(item.caseTypes.length){
										htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".case.list}",
											overViewTable(item.caseTypes, 4, {
												name: "type",
												count: "count",
											}))
									}
									if(item.yearDistribution.length){
										htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".year.list}",
											overViewTable(fun.toGetYearList(item.yearDistribution), 5, {
												name: "year",
												count: "count",
											}))

									}
								}
							}
						});
						if (!result){
							htmlTemp = htmlTemp.replace("{" + viewName + "." + i.field + ".display}", "display-none");
						}
					})

				}else{
					htmlTemp = htmlTemp.replace("{" + viewName + ".trial.display}", "display-none");
					htmlTemp = htmlTemp.replace("{" + viewName + ".court.display}", "display-none");
					htmlTemp = htmlTemp.replace("{" + viewName + ".judgment.display}", "display-none");
				}
				if(((source.assetOverviewDishonestInfo||{}).yearDistributions||[]).length){
					source.assetOverviewDishonestInfo.yearDistributions.forEach(function (item) {
						yearTotal += item.count;
					});
					htmlTemp = htmlTemp.replace("{" + viewName + ".dishonest.total}", yearTotal);
					htmlTemp = htmlTemp.replace("{" + viewName + ".dishonest.year.list}",
						overViewTable(fun.toGetYearList(source.assetOverviewDishonestInfo.yearDistributions,'year'), 5, {
							name: "year",
							count: "count",
						}))
				}else{
					htmlTemp = htmlTemp.replace("{" + viewName + ".dishonest.display}", "display-none");
				}
			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
			}
		}
		else if(viewName==="overview.A10207"){
			if(source.businessRiskInfos){
				if(source.businessRiskInfos.length){
					source.businessRiskInfos.forEach(function (item) {
						yearTotal += item.count;
					});
					htmlTemp = htmlTemp.replace("{" + viewName + ".total}", yearTotal);
					htmlTemp = htmlTemp.replace("{" + viewName + ".list}",
						overViewTable(source.businessRiskInfos, 4, {
							name: "typeName",
							count: "count",
						}))
				}else{
					htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
				}
			}
		}
		else if(viewName==="overview.A10208"){
			if(source.baseInfo){
				['legalPersonName', 'regStatus', 'regCapital', 'establishTime', 'regLocation'].forEach(function (item) {
					htmlTemp = htmlTemp.replace("{" + viewName + ".baseInfo."+item+"}", source.baseInfo[item]||'-');
				})
			}
			if(source.businessScaleInfo){
				if(source.businessScaleInfo.employeeNum){
					htmlTemp = htmlTemp.replace("{" + viewName + ".businessScaleInfo.employeeNum}", source.businessScaleInfo.employeeNum);
				}else{
					htmlTemp = htmlTemp.replace("{" + viewName + ".businessScaleInfo.display}", "display-none");
				}
			}
			if((source.shareholderInfos||[]).length){
				htmlTemp = htmlTemp.replace("{" + viewName + ".shareholderInfos.list}",
					overViewTable(source.shareholderInfos, 2, {
						name: "investorName",
						count: "subscribeAmountRate",
						numberUnit:"%",
						unit:"&nbsp",
					}))

			}else{
				htmlTemp = htmlTemp.replace("{" + viewName + ".shareholderInfos.display}", "display-none");
			}
		}
		else if(viewName==="baseInfo"){
			if(source){
				["display", "legalPersonName", "regStatus", "regCapital", "establishTime", "regLocation", "display", "legalPerson", "orgNumber", "creditCode", "taxNumber", "establishTime", "regCapital", "actualCapital", "regStatus", "regInstitute", "companyOrgType", "approvedTime", "industry", "regNumber", "scale", "insuranceNum", "englishName", "businessScope", "regLocation"].forEach(function (item) {
					htmlTemp = htmlTemp.replace("{baseInfo."+item+"}", source[item]||'-');
					var timeLimit=(source.fromTime || source.toTime)?("自 "+(source.fromTime||'--')+" 至 "+(source.toTime||'--')):"--";
					htmlTemp = htmlTemp.replace("{baseInfo.timeLimit}", timeLimit);
				})
			}
		}
	};

	if(exportType){
		overView(data.A10201,"overview.A10201");
		overView(data.A10202,"overview.A10202");
		overView(data.A10203,"overview.A10203");
		overView(data.A10204,"overview.A10204");
		overView(data.A10205,"overview.A10205");
		if(!(/padding6 {overview\.A1020([12345])\..{0,12}\.display/.test(htmlTemp))){
			htmlTemp = htmlTemp.replace("{overview.asset.display}", "display-none");
		}
		overView(data.A10206,"overview.A10206");
		if(!(/A10206\..{0,12}\.display/.test(htmlTemp))){
			htmlTemp = htmlTemp.replace("{overview.lawsuit.display}", "display-none");
		}
		overView(data.A10207,"overview.A10207");
		overView(data.A10208,"overview.A10208");

	}else{
		overView(data.B10201,"overview.B10201");
		overView(data.B10202,"overview.B10202");
		overView(data.B10203,"overview.B10203");
		overView(data.B10204,"overview.B10204");
		if(!(/padding6 {overview\.B1020([345]).display/.test(htmlTemp))){
			htmlTemp = htmlTemp.replace("{overview.lawsuit.display}", "display-none");
		}
		overView(data.B10205,"overview.B10205");

	}

	/* table列表，选项 */
	var tableList = function (source,viewName) {
		var listAry =[];
		switch (viewName) {
			case "asset":{
				source.list.forEach(function (item) {
					listAry.push("<tr><td>" +
						"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold\">"+(item.title||'--')+"</a>":(item.title||'--')) +
						"</li>" +
						"<li class='mg8-0'><div class='nAndI'><span class='n-desc'>· 匹配原因："+fun.toGetType(item.obligors,fun.source.labelType,"labelType",true)+"</span></div></li>" +
						"<li class='mg8-0'><div class='nAndI'><span class='n-desc'>"+item.matchRemark+"</span></div></li>" +
						"</td><td>" +
						"<li class='mg8-0'><div class='nAndI'>"+fun.toShowPrice(item)+"</div></li>" +
						"<li class='mg8-0'><div class='nAndI'><span class='n-title'>评估价：</span><span class='n-desc'>"+fun.toNumberStr(item.consultPrice)+"</span></div></li>" +
						"<li class='mg8-0'><div class='nAndI'><span class='n-title'>拍卖时间：</span><span class='n-desc'>"+item.start+"</span></div></li>" +
						"<li class='mg8-0'><div class='nAndI'><span class='n-title'>处置单位：</span><span class='n-desc' style='max-width: 220px'>" +
						item.court
						+"</span></div></li></td></tr>");
				});
				break;
			}
			case "lawsuit.trial":
			case "subrogation.trial":{
				source.list.forEach(function (item) {
					var parties = fun.handleParties(item.parties);
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold\">"+(item.caseNumber||'--')+"</a>":(item.caseNumber||'--')) +
						(fun.toGetCaseType(item.caseType)?"<span class=\"case-tag\">"+fun.toGetCaseType(item.caseType)+"</span>":"") +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>立案日期：</span>" +
						"<span class='n-desc'>"+(item.gmtRegister||'--')+"</span>" +
						"</div>" +
						"</li>" + fun.partiesList(parties) +
						"</td>" +
						"<td>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>审理法院：<label class='n-desc'>"+item.court+"</label></span>" +
						"</div></li></td></tr>");
				});
				break;
			}
			case "lawsuit.court":
			case "subrogation.court":{
				source.list.forEach(function (item) {
					var parties = fun.handleParties(item.parties);
					listAry.push("<tr>" +
					"<td>" +
					"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold\">"+(item.caseNumber||'--')+"</a>":(item.caseNumber||'--')) +
						(item.caseReason?"<span class=\"case-tag type-tag\">"+item.caseReason+"</span>":"") +
					"</li>" +
					"<li class='mg8-0'>" +
					"<div class='nAndI'>" +
					"<span class='n-title'>开庭日期：</span>" +
					"<span class='n-desc'>"+(item.gmtTrial||'--')+"</span>" +
					"</div>" +
					"</li>" + fun.partiesList(parties) +
					"</td>" +
					"<td>" +
					"<li class='mg8-0'>" +
					"<div class='nAndI'>" +
					"<span class='n-title'>审理法院：<label class='n-desc'>"+item.court+"</label></span>" +
					"</div></li></td></tr>");
				});
				break;
			}
			case "subrogation.judgment":
			case "lawsuit.judgment":{
				source.list.forEach(function (item) {
					var parties = fun.handleParties(item.parties);
					listAry.push("<tr>" +
					"<td>" +
					"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold\">"+(item.title||'--')+"</a>":(item.title||'--')) +
						(fun.toGetCaseType(item.caseType)?"<span class=\"case-tag\">"+fun.toGetCaseType(item.caseType)+"</span>":"") +
						(item.caseReason?"<span class=\"case-tag type-tag\">"+item.caseReason+"</span>":"") +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>判决日期：</span>" +
						"<span class='n-desc'>"+(item.gmtJudgment||'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>发布日期：</span>" +
						"<span class='n-desc'>"+(item.gmtPublish||'--')+"</span>" +
						"</div>" +
						"</li>" + fun.partiesList(parties) +
						"</td>" +
						"<td>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class=\"n-icon\"></span>" +
						"<span class='n-desc'>"+item.caseNumber+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>审理法院：<label class='n-desc'>"+item.court+"</label></span>" +
						"</div></li></td></tr>");
				});
				break;
			}
			case "lawsuit.dishonest":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 fw-bold font-m'>" +(item.caseCode||'--')+ "</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>失信被执行人行为具体情形：<label class='n-desc'>"+item.fact+"</label></span></div></li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>生效法律文书确定义务：<label class='n-desc'>"+item.duty+"</label></span></div></li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>被执行人的履行情况：<label class='n-desc'>"+item.performance+"</label></span></div></li>" +
						"</td>" +
						"<td>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>执行法院：<label class='n-desc'>"+item.court+"</label></span></div></li>" +
						"<li>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>发布日期：<label class='n-desc'>"+item.publishDate+"</label></span></div>" +
						"</li></td></tr>");
				});
				break;
			}
			case "land.result":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold\">"+(item.projectName||'--')+"</a>":(item.projectName||'--')) +
						(item.landUse?"<span class=\"case-tag type-tag\">"+item.landUse+"</span>":"") +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-desc'>"+(item.administrativeRegion||'--')+"</span>" +
						"<span class='n-desc paddingL6'>"+(item.landAddress||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>签订日期：</span>" +
						"<span class='n-desc'>"+(item.singedTime||'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>面积：</span>" +
						"<span class='n-desc'>"+(item.landArea||'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>使用年限：</span>" +
						"<span class='n-desc'>"+(item.transferTerm||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class=\"n-icon green\"></span>" +
						"<span class='n-desc'>成交价格"+(item.finalPrice||'--')+"万元</span>" +
						"</div></li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>批准单位：<label class='n-desc'>"+item.approver+"</label></span>" +
						"</div></li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>供地方式：<label class='n-desc'>"+item.supplyWay+"</label></span>" +
						"</div></li>" +
						"</td></tr>");
				});
				break;
			}
			case "land.transfer":{
				source.list.forEach(function (item) {
					var parties = fun.handleParties(item.parties);
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold font-m\">"+(item.landAddress||'--')+"</a>":(item.landAddress||'--')) +
						(item.landUse?"<span class=\"case-tag type-tag\">"+item.landUse+"</span>":"") +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>成交日期：</span>" +
						"<span class='n-desc'>"+(item.dealingTime||'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>面积：</span>" +
						"<span class='n-desc'>"+(item.landArea||'--')+"公顷</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>使用年限：</span>" +
						"<span class='n-desc'>"+(item.landUsageTerm||'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>行政区域：</span>" +
						"<span class='n-desc'>"+(item.administrativeRegion||'--')+"</span>" +
						"</div>" +
						"</li>" +
						fun.partiesList(parties) +
						"</td>" +
						"<td>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>转让价格：<label class='n-desc'>"+((item.transferPrice===0 || item.transferPrice)?item.transferPrice:'--')+"</label></span>" +
						"</div></li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>转让方式：<label class='n-desc'>"+(item.transferMode||'--')+"</label></span>" +
						"</div></li>" +
						"</td></tr>");
				});
				break;
			}
			case "land.mortgage":{
				source.list.forEach(function (item) {
					var parties = fun.handleParties(item.parties);
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold\">"+(item.landAddress||'--')+"</a>":(item.landAddress||'--')) +
						(item.landUse?"<span class=\"case-tag type-tag\">"+item.landUse+"</span>":"") +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>行政区域：</span>" +
						"<span class='n-desc'>"+(item.administrativeRegion||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>登记日期：</span>" +
						"<span class='n-desc'>"+(item.startTime||'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>面积：</span>" +
						"<span class='n-desc'>"+(item.landArea||'--')+"公顷</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>评估金额：</span>" +
						"<span class='n-desc'>"+(item.consultPrice||'--')+"万元</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>土地使用权证号：</span>" +
						"<span class='n-desc'>"+(item.landUseCertificateNumber||'--')+"</span>" +
						"</div>" +
						"</li>" +
						fun.partiesList(parties) +
						"</td>" +
						"<td>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class=\"n-icon green\"></span>" +
						"<span class='n-desc'>抵押金额 "+(item.mortgageAmount||'--')+"万元</span>" +
						"</div></li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>抵押面积：<label class='n-desc'>"+((item.transferPrice===0 || item.transferPrice)?item.transferPrice:'--')+"</label></span>" +
						"</div></li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>土地他项权证号：<label class='n-desc'>"+(item.otherObligeeCertificateNumber||'--')+"</label></span>" +
						"</div></li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>登记结束日期：<label class='n-desc'>"+(item.endTime||'--')+"</label></span>" +
						"</div></li>" +
						"</td></tr>");
				});
				break;
			}
			case "stock.pledgor":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +(item.companyName||'--') +"</li>"+
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>登记日期：</span>" +
						"<span class='n-desc'>"+(item.regDate||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>质权人：</span>" +
						"<span class='n-desc'>"+(item.pledgeeList?item.pledgeeList.push('、'):'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>出质股权数额：</span>" +
						"<span class='n-desc'>"+(item.equityAmount||'--')+"万人民币</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						(item.state === 0 ? (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon green\"></span>" +
							"<span class='n-desc'>有效</span>" +
							"</div></li>"
						) : (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon gray\"></span>" +
							"<span class='n-desc'>无效</span>" +
							"</div></li>"
						)) +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>登记编号：<label class='n-desc'>"+(item.regNumber||'--')+"</label></span>" +
						"</div></li>" +
						"</td></tr>");
				});
				break;
			}
			case "stock.pledgee":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +(item.companyName||'--') + "</li>"+
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>登记日期：</span>" +
						"<span class='n-desc'>"+(item.regDate||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>出质人：</span>" +
						"<span class='n-desc'>"+(item.pledgorList?item.pledgorList.push('、'):'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>出质股权数额：</span>" +
						"<span class='n-desc'>"+(item.equityAmount||'--')+"万人民币</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						(item.state === 0 ? (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon green\"></span>" +
							"<span class='n-desc'>有效</span>" +
							"</div></li>"
						) : (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon gray\"></span>" +
							"<span class='n-desc'>无效</span>" +
							"</div></li>"
						)) +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>登记编号：<label class='n-desc'>"+(item.regNumber||'--')+"</label></span>" +
						"</div></li>" +
						"</td></tr>");
				});
				break;
			}
			case "mortgage.owner":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +(item.pawnName||'--') + "</li>"+
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>登记日期：</span>" +
						"<span class='n-desc'>"+(item.regDate||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>抵押权人：</span>" +
						"<span class='n-desc'>"+(item.people||'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>担保债权数额：</span>" +
						"<span class='n-desc'>"+(item.amount||'--')+"元</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						(item.status === "有效" ? (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon green\"></span>" +
							"<span class='n-desc'>有效</span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>登记编号：<label class='n-desc'>"+(item.regNum||'--')+"</label></span>" +
							"</div></li>"
						) : (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon gray\"></span>" +
							"<span class='n-desc'>无效</span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>注销时间：<label class='n-desc'>"+(item.cancelDate||'--')+"</label></span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>注销原因：<label class='n-desc'>"+(item.cancelReason||'--')+"</label></span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>登记编号：<label class='n-desc'>"+(item.regNum||'--')+"</label></span>" +
							"</div></li>"
						)) +
						"</td></tr>");
				});
				break;
			}
			case "mortgage.people":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +(item.pawnName||'--') + "</li>"+
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>登记日期：</span>" +
						"<span class='n-desc'>"+(item.regDate||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>抵押物所有人：</span>" +
						"<span class='n-desc'>"+(item.owner||'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>担保债权数额：</span>" +
						"<span class='n-desc'>"+(item.amount||'--')+"元</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						(item.status === "有效" ? (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon green\"></span>" +
							"<span class='n-desc'>有效</span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>登记编号：<label class='n-desc'>"+(item.regNum||'--')+"</label></span>" +
							"</div></li>"
						) : (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon gray\"></span>" +
							"<span class='n-desc'>无效</span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>注销时间：<label class='n-desc'>"+(item.cancelDate||'--')+"</label></span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>注销原因：<label class='n-desc'>"+(item.cancelReason||'--')+"</label></span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>登记编号：<label class='n-desc'>"+(item.regNum||'--')+"</label></span>" +
							"</div></li>"
						)) +
						"</td></tr>");
				});
				break;
			}
			case "bankruptcy":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold\">"+(item.title||'--')+"</a>":(item.title||'--')) +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>发布日期：</span>" +
						"<span class='n-desc'>"+(item.publishDate||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>受理法院：<label class='n-desc'>"+(item.court||'--')+"</label></span>" +
						"</div></li>" +
						"</td></tr>");
				});
				break;
			}
			case "abnormal":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m fw-bold'>" +(item.putReason||'--') + "</li>"+
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>列入日期：</span>" +
						"<span class='n-desc'>"+(item.gmtPutDate||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>决定机关：</span>" +
						"<span class='n-desc'>"+(item.putDepartment||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						(!item.gmtRemoveDate ? (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon green\"></span>" +
							"<span class='n-desc'>未移除</span>" +
							"</div></li>"
						) : (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon gray\"></span>" +
							"<span class='n-desc'>已移除</span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>移除日期：<label class='n-desc'>"+(item.gmtRemoveDate||'--')+"</label></span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>移除原因：<label class='n-desc'>"+(item.removeReason||'--')+"</label></span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>移除机关：<label class='n-desc'>"+(item.removeDepartment||'--')+"</label></span>" +
							"</div></li>"
						)) +
						"</td></tr>");
				});
				break;
			}
			case "illegal":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m fw-bold'>" +(item.type||'--') + "</li>"+
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>列入日期：</span>" +
						"<span class='n-desc'>"+(item.gmtPutDate||'--')+"</span>" +
						"</div>" +
						"<div class='n-line mg0-5'></div><div class='nAndI'>" +
						"<span class='n-title'>决定机关：</span>" +
						"<span class='n-desc'>"+(item.putDepartment||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>列入原因：</span>" +
						"<span class='n-desc'>"+(item.putReason||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						(!item.gmtRemoveDate ? (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon green\"></span>" +
							"<span class='n-desc'>未移除</span>" +
							"</div></li>"
						) : (
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class=\"n-icon gray\"></span>" +
							"<span class='n-desc'>已移除</span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>移除日期：<label class='n-desc'>"+(item.gmtRemoveDate||'--')+"</label></span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>移除原因：<label class='n-desc'>"+(item.removeReason||'--')+"</label></span>" +
							"</div></li>"+
							"<li class='mg8-0'>" +
							"<div class='nAndI'>" +
							"<span class='n-title'>移除机关：<label class='n-desc'>"+(item.removeDepartment||'--')+"</label></span>" +
							"</div></li>"
						)) +
						"</td></tr>");
				});
				break;
			}
			case "tax":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold\">"+(item.caseNature||'--')+"</a>":(item.caseNature||'--')) +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>违法事实：</span>" +
						"<span class='n-desc'>"+(item.illegalFacts||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>处罚情况：</span>" +
						"<span class='n-desc'>"+(item.punish||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>发布日期：<label class='n-desc'>"+(item.gmtPublish||'--')+"</label></span>" +
						"</div></li>" +
						"</td></tr>");
				});
				break;
			}
			case "punishment":{
				source.list.forEach(function (item) {
					listAry.push("<tr>" +
						"<td>" +
						"<li class='mg8-0 font-m'>" +
						(item.url?"<a href=\""+item.url+"\" target=\"_blank\" class=\"base-b fw-bold\">"+(item.type||'--')+"</a>":(item.type||'--')) +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>决定文书号：</span>" +
						"<span class='n-desc'>"+(item.punishNumber||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>处罚内容：</span>" +
						"<span class='n-desc'>"+(item.content||'--')+"</span>" +
						"</div>" +
						"</li>" +
						"</td>" +
						"<td>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>决定机关：<label class='n-desc'>"+(item.departmentName||'--')+"</label></span>" +
						"</div></li>" +
						"<li class='mg8-0'>" +
						"<div class='nAndI'>" +
						"<span class='n-title'>决定日期：<label class='n-desc'>"+(item.decisionDate||'--')+"</label></span>" +
						"</div></li>" +
						"</td></tr>");
				});
				break;
			}
			case "branch":{
				source.list.forEach(function (item,index) {
					listAry.push("<tr>" +
						"<td>"+(index+1)+"</td>" +
						"<td>"+(item.companyName||'--')+"</td>" +
						"<td>"+(item.legalName||'--')+"</td>" +
						"<td>"+(item.regCapital||'--')+"</td>" +
						"<td>"+(item.regTime||'--')+"</td>" +
						"<td>"+(item.regStatus||'--')+"</td>" +
						"</tr>")
				});
				break;
			}
			case "change":{
				source.list.forEach(function (item,index) {
					listAry.push("<tr>" +
						"<td>"+(index+1)+"</td>" +
						"<td>"+(item.changeTime||'--')+"</td>" +
						"<td>"+(item.changItem||'--')+"</td>" +
						"<td>"+(item.contentBefore||'--')+"</td>" +
						"<td>"+(item.contentAfter||'--')+"</td>" +
						"</tr>")
				});
				break;
			}
			case "investment":{
				source.list.forEach(function (item,index) {
					listAry.push("<tr>" +
						"<td>"+(index+1)+"</td>" +
						"<td>"+(item.legalName||'--')+"</td>" +
						"<td>"+(item.rate||'--')+"</td>" +
						"<td>"+(item.amount||'--')+"</td>" +
						"</tr>")
				});
				break;
			}
			case "mainPerson":{
				source.list.forEach(function (item,index) {
					listAry.push("<tr>" +
						"<td>"+(index+1)+"</td>" +
						"<td>"+(item.name||'--')+"</td>" +
						"<td>"+(item.job||'--')+"</td>" +
						"</tr>")
				});
				break;
			}
			case "stockholder":{
				source.list.forEach(function (item,index) {
					listAry.push("<tr>" +
						"<td>"+(index+1)+"</td>" +
						"<td>"+(item.legalName||'--')+"</td>" +
						"<td>"+(item.rate||'--')+"</td>" +
						"<td>"+(item.amount||'--')+"</td>" +
						"</tr>")
				});
				break;
			}
		}
		return listAry;
	};
	/* 通用列表模块 table 形式 */
	var listView = function (dataSource,viewName) {
		var source = typeof dataSource === "object"?dataSource:{};
		if(source.total>0){
			htmlTemp = htmlTemp.replace("{" + viewName + ".list}", tableList(source,viewName).join("")).replace(new RegExp("{"+viewName+".total}",'g'), source.total);
		}else{
			htmlTemp = htmlTemp.replace("{" + viewName + ".display}", "display-none");
		}
	};
	if(exportType){
		listView(data.A10301,"asset");
		listView(data.A10302,"subrogation.trial");
		listView(data.A10303,"subrogation.court");
		listView(data.A10304,"subrogation.judgment");
		listView(data.A10305,"land.result");
		listView(data.A10306,"land.transfer");
		listView(data.A10307,"land.mortgage");
		listView(data.A10308,"stock.pledgor");
		listView(data.A10309,"stock.pledgee");
		listView(data.A10310,"mortgage.owner");
		listView(data.A10311,"mortgage.people");

		listView(data.A10401,"lawsuit.trial");
		listView(data.A10402,"lawsuit.court");
		listView(data.A10403,"lawsuit.judgment");
		listView(data.A10404,"lawsuit.dishonest");

		listView(data.A10501,"bankruptcy");
		listView(data.A10502,"abnormal");
		listView(data.A10503,"illegal");
		listView(data.A10504,"tax");
		listView(data.A10505,"punishment");

		overView(data.A10103,"baseInfo");
		if(data.A10106){
			var tD = data.A10106;
			if(tD.branch>0){
				listView(data.A10104,"branch");
			}else{
				htmlTemp = htmlTemp.replace("{branch.display}", "display-none");
			}
			if(tD.change>0){
				listView(data.A10105,"change");
			}else{
				htmlTemp = htmlTemp.replace("{change.display}", "display-none");
			}
			if(tD.investment>0){
				listView(data.A10107,"investment");
			}else{
				htmlTemp = htmlTemp.replace("{investment.display}", "display-none");
			}
			if (tD.mainPerson > 0) {
				listView({
					list: data.A10108||[],
					total: tD.mainPerson,
				}, "mainPerson");
			} else {
				htmlTemp = htmlTemp.replace("{mainPerson.display}", "display-none");
			}
			if (tD.stockholder > 0) {
				listView({
					list: data.A10110||[],
					total: tD.stockholder,

				}, "stockholder");
			}else{
				htmlTemp = htmlTemp.replace("{stockholder.display}", "display-none");
			}
		}
	}else{
		listView(data.B10301,"asset");
		listView(data.B10302,"subrogation.judgment");
		listView(data.B10401,"lawsuit.judgment");
		listView(data.B10402,"lawsuit.dishonest");
		listView(data.B10403,"tax");
	}

	return htmlTemp;
}

function writeFile() {
	fs.writeFile("./template/result/demo.html", exportTemplate(_dataSource, false), (error) => {
		error && console.log('error');
	});
}
writeFile();
module.exports = {exportTemplate, writeFile};
