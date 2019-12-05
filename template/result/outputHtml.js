"use strict";

var htmlEnterprise = "<!DOCTYPE html><html lang=\"en\"><head><style>*{line-height:1.45;padding:0;margin:0;color:#20242e;font-size:13px;list-style:none}body{padding:2px;background:#fff url(../watermark.png) repeat-y center top;background-size:80%}span{font-size:inherit}a{font-size:inherit}.display-none{display:none}.fw-bold{font-weight:700}.border-b{border-bottom:1px solid #e5e5e5}.green{background:#3dbd7d!important}.gray{background:#7d8699!important}.border-t{border-top:1px solid #e5e5e5}.padding6{padding:6px 10px}.paddingL6{padding-left:6px}.second-title{padding:15px 0 5px 0}.mg8-0{margin:4px 0}.mg8{margin:8px 0}.mg10-0{margin:5px 0}.mg0-5{margin:0 10px}.font-m{font-size:14px}.font-l{font-size:15px}.font-xl{font-size:16px}.mg-r{margin-right:5px}.ta-c{text-align:center}.vera-top{vertical-align:top!important}.display-with-50{float:left;display:inline-block;width:50%}table{margin-bottom:15px;border-collapse:collapse;width:100%}table tr{text-align:left}table th{text-align:left}table td,table th{padding:10px 10px 10px 0;vertical-align:top;border-bottom:1px solid #e5e5e5}table th{padding-left:10px;background-color:#f0f1f5;color:#4e5566}table em{color:#f82626;font-style:normal}.table-border{border:1px solid #dadde6}.table-border td{padding-left:10px;border:1px solid #dadde6}.table-td-s-30 tr td:first-child{width:73%}.table-td-50 td{width:50%}.table-td-25 td{width:25%}.table-td-20 td{width:20%}.table-baseInfo tr td:first-child{text-align:right;background:#f0f1f5;width:140px!important}.table-baseInfo tr td:first-child+td+td{text-align:right;background:#f0f1f5;width:100px!important}.base-b{color:#1c80e1}.remark{color:#7d8699}.title{color:#20242e}.entry-title{padding:15px 0 10px 0}.entry-title .et-cot{border-left:4px solid #1c80e1;padding-left:10px}.nAndI{display:inline-block}.nAndI span{display:inline-block;vertical-align:middle}.nAndI .n-icon{border-radius:50%;width:6px;height:6px;margin-right:5px;background:#000}.nAndI .n-remark{color:#7d8699}.nAndI .n-title{color:#7d8699}.n-line{display:inline-block;vertical-align:middle;width:1px;height:12px;background:#dadde6}.exp-title{text-align:center;padding:200px 0 150px 0}.exp-title .title{margin:100px 0 50px 0;font-size:40px;color:#384482}.exp-title .name,.exp-title .number{font-size:27px}.exp-title .time{margin:500px 0 50px 0;font-size:18px}.exp-title p{text-align:left;font-size:11px;line-height:18px;color:#7d8699}.exp-info{padding:22px 0 15px 0}.exp-info .icon{width:67px;height:67px;float:left;background-color:#e6eeff;border:1px solid #a8c8ff}.exp-info .info{margin-left:85px}.case-tag{padding:1px 6px;background-color:#fb8e3c;color:#fff;margin-left:15px;display:inline-block}.type-tag{background-color:#eff4ff;border:1px solid #1c80e1;color:#1c80e1}</style><meta charset=\"UTF-8\"><title>债务人画像查询报告</title></head><body><div class=\"exp-title\"><div class=\"title\">债务人画像查询报告</div><div class=\"name\">{info.name}</div><div class=\"time\">{base.dateTime} 查询</div><p>· 本报告内容为 {base.dateTime} 查询的版本，您所看到的内容为该截止时间的数据快照。</p><p>· 本报告内容是源诚资产监控平台接受您的委托，基于公开信息挖掘的结果。源诚资产监控平台不对该查询结果的全面、准确、真实性负责。本报告应仅为您提供参考，真实结果请以各官方网站的公布结果为准。</p></div><div class=\"exp-info border-b\"><div class=\"icon\"></div><div class=\"info\"><li class=\"font-l\">{info.name}</li><li class=\"mg8-0\"><div class=\"nAndI\"><span class=\"n-title\">法定代表人：</span> <span class=\"n-desc\">{info.legalPersonName}</span></div><div class=\"n-line mg0-5\"></div><div class=\"nAndI\"><span class=\"n-title\">注册资本：</span> <span class=\"n-desc\">{info.regCapital}</span></div><div class=\"n-line mg0-5\"></div><div class=\"nAndI\"><span class=\"n-title\">成立日期：</span> <span class=\"n-desc\">{info.establishTime}</span></div></li><li><div class=\"nAndI\"><span class=\"n-title\">曾用名：</span> <span class=\"n-desc\">{info.formerNames}</span></div></li></div></div><div class=\"{overview.asset.display}\"><div class=\"entry-title border-b\"><div class=\"fw-bold font-xl\">资产概况</div></div><div class=\"padding6 {overview.A10201.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10201.total}条</span> <span>相关资产拍卖</span></div></div><div class=\"{overview.A10201.role.display}\"><div class=\"fw-bold second-title\">角色分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10201.role.list}</table></div><div class=\"{overview.A10201.result.display}\"><div class=\"fw-bold second-title\">拍卖结果分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10201.result.list}</table></div></div><div class=\"padding6 {overview.A10202.trial.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10202.trial.total}条</span> <span>立案信息 - 代位权</span></div></div><div class=\"{overview.A10202.trial.year}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10202.trial.year.list}</table></div><div class=\"{overview.A10202.trial.case}\"><div class=\"fw-bold second-title\">案件类型分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10202.trial.case.list}</table></div></div><div class=\"padding6 {overview.A10202.court.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10202.court.total}条</span> <span>开庭信息 - 代位权</span></div></div><div class=\"{overview.A10202.court.year}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10202.court.year.list}</table></div><div class=\"{overview.A10202.court.reason}\"><div class=\"fw-bold second-title\">案由分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10202.court.reason.list}</table></div></div><div class=\"padding6 {overview.A10202.judgment.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10202.judgment.total}条</span> <span>裁判文书 - 代位权</span></div><div class=\"{overview.A10202.judgment.year}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10202.judgment.year.list}</table></div><div class=\"{overview.A10202.judgment.reason}\"><div class=\"fw-bold second-title\">案由分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10202.judgment.reason.list}</table></div><div class=\"{overview.A10202.judgment.case}\"><div class=\"fw-bold second-title\">案件类型分布</div><table class=\"table-td-25 table-border mg8-0\">{overview.A10202.judgment.case.list}</table></div></div></div><div class=\"padding6 {overview.A10203.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10203.total}条</span> <span>土地信息</span></div></div><div class=\"{overview.A10203.type.display}\"><div class=\"fw-bold second-title\">信息类型分布</div><table class=\"table-td-25 table-border mg8-0\">{overview.A10203.type.list}</table></div><div class=\"{overview.A10203.year.display}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10203.year.list}</table></div><div class=\"{overview.A10203.role.display}\"><div class=\"fw-bold second-title\">角色分布</div><table class=\"table-td-25 table-border mg8-0\">{overview.A10203.role.list}</table></div></div><div class=\"padding6 {overview.A10204.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10204.total}条</span> <span>股权质押信息</span></div></div><div class=\"{overview.A10204.year.display}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10204.year.list}</table></div><div class=\"{overview.A10204.role.display}\"><div class=\"fw-bold second-title\">角色分布</div><table class=\"table-td-50 table-border mg8-0\">{overview.A10204.role.list}</table></div></div><div class=\"padding6 {overview.A10205.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10205.total}条</span> <span>动产抵押信息</span></div></div><div class=\"{overview.A10205.year.display}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10205.year.list}</table></div><div class=\"{overview.A10205.role.display}\"><div class=\"fw-bold second-title\">角色分布</div><table class=\"table-td-50 table-border mg8-0\">{overview.A10205.role.list}</table></div></div></div><div class=\"{overview.lawsuit.display}\"><div class=\"entry-title border-b\">`<div class=\"fw-bold font-xl\">涉诉情况</div></div><div class=\"padding6 {overview.A10206.trial.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10206.trial.total}条</span> <span>立案信息</span></div></div><div class=\"{overview.A10206.trial.year}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10206.trial.year.list}</table></div><div class=\"{overview.A10206.trial.case}\"><div class=\"fw-bold second-title\">案件类型分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10206.trial.case.list}</table></div></div><div class=\"padding6 {overview.A10206.court.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10206.court.total}条</span> <span>开庭信息</span></div></div><div class=\"{overview.A10206.court.year}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10206.court.year.list}</table></div><div class=\"{overview.A10206.court.reason}\"><div class=\"fw-bold second-title\">案由分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10206.court.reason.list}</table></div></div><div class=\"padding6 {overview.A10206.judgment.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10206.judgment.total}条</span> <span>裁判文书</span></div><div class=\"{overview.A10206.judgment.year}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10206.judgment.year.list}</table></div><div class=\"{overview.A10206.judgment.reason}\"><div class=\"fw-bold second-title\">案由分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10206.judgment.reason.list}</table></div><div class=\"{overview.A10206.judgment.case}\"><div class=\"fw-bold second-title\">案件类型分布</div><table class=\"table-td-25 table-border mg8-0\">{overview.A10206.judgment.case.list}</table></div></div></div><div class=\"padding6 {overview.A10206.dishonest.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10206.dishonest.total}条</span> <span>失信记录</span></div><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.A10206.dishonest.year.list}</table></div></div></div><div class=\"{overview.A10207.display}\"><div class=\"entry-title border-b\"><div class=\"fw-bold font-xl\">经营风险</div></div><div class=\"padding6\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.A10207.total}条</span> <span>经营风险信息</span></div></div><table class=\"table-td-25 table-border mg8-0\">{overview.A10207.list}</table></div></div><div class=\"{overview.A10208.display} border-b\"><div class=\"entry-title border-b\"><div class=\"fw-bold font-xl\">工商基本情况</div></div><div class=\"padding6 {overview.A10208.baseInfo.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\">基本信息</div><table class=\"table-td-50 table-border mg8\"><tr><td><span class=\"remark\">法定代表人： <label class=\"title\">{overview.A10208.baseInfo.legalPersonName}</label></span></td><td><span class=\"remark\">经营状态： <label class=\"title\">{overview.A10208.baseInfo.regStatus}</label></span></td></tr><tr><td><span class=\"remark\">注册资本： <label class=\"title\">{overview.A10208.baseInfo.regCapital}</label></span></td><td><span class=\"remark\">成立日期： <label class=\"title\">{overview.A10208.baseInfo.establishTime}</label></span></td></tr><tr><td colspan=\"2\"><span class=\"remark\">注册地址： <label class=\"title\">{overview.A10208.baseInfo.regLocation}</label></span></td></tr></table></div></div><div class=\"padding6 {overview.A10208.shareholderInfos.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\">股东情况</div><table class=\"table-td-50 table-border mg8\"><tr><th>股东名称</th><th>持股比</th></tr>{overview.A10208.shareholderInfos.list}</table></div></div><div class=\"padding6 {overview.A10208.businessScaleInfo.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\">企业规模</div><table class=\"table-td-50 table-border mg8\"><tr><td><div class=\"nAndI\"><span class=\"n-title\">人员规模：</span> <span class=\"n-desc\">{overview.A10208.businessScaleInfo.employeeNum}</span></div></td><td></td></tr></table></div></div></div><div class=\"{asset.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">资产拍卖（智能精准匹配 {asset.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{asset.list}</table></div></div><div class=\"{subrogation.trial.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">代位权（立案 {subrogation.trial.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{subrogation.trial.list}</table></div></div><div class=\"{subrogation.court.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">代位权（开庭 {subrogation.court.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{subrogation.court.list}</table></div></div><div class=\"{subrogation.judgment.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">代位权（裁判文书 {subrogation.judgment.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{subrogation.judgment.list}</table></div></div><div class=\"{land.result.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">土地信息（出让结果 {land.result.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{land.result.list}</table></div></div><div class=\"{land.transfer.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">土地信息（土地转让 {land.transfer.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{land.transfer.list}</table></div></div><div class=\"{land.mortgage.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">土地信息（土地抵押 {land.mortgage.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{land.mortgage.list}</table></div></div><div class=\"{stock.pledgor.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">股权质押（股权出质 {stock.pledgor.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{stock.pledgor.list}</table></div></div><div class=\"{stock.pledgee.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">股权质押（股权质权 {stock.pledgee.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{stock.pledgee.list}</table></div></div><div class=\"{mortgage.owner.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">动产抵押（抵押 {mortgage.owner.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{mortgage.owner.list}</table></div></div><div class=\"{mortgage.people.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">动产抵押（抵押权 {mortgage.people.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{mortgage.people.list}</table></div></div><div class=\"{lawsuit.trial.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">涉诉（立案 {lawsuit.trial.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{lawsuit.trial.list}</table></div></div><div class=\"{lawsuit.court.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">涉诉（开庭 {lawsuit.court.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{lawsuit.court.list}</table></div></div><div class=\"{lawsuit.judgment.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">涉诉文书 {lawsuit.judgment.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{lawsuit.judgment.list}</table></div></div><div class=\"{lawsuit.dishonest.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">失信记录 {lawsuit.dishonest.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{lawsuit.dishonest.list}</table></div></div><div class=\"{bankruptcy.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">破产重组 {bankruptcy.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{bankruptcy.list}</table></div></div><div class=\"{abnormal.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">经营异常 {abnormal.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{abnormal.list}</table></div></div><div class=\"{illegal.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">严重违法 {illegal.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{illegal.list}</table></div></div><div class=\"{tax.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">税收违法 {tax.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{tax.list}</table></div></div><div class=\"{punishment.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">行政处罚 {punishment.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{punishment.list}</table></div></div><div class=\"{baseInfo.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l fw-bold\">基本信息</div><table class=\"table-border mg8 table-baseInfo\"><tr><td>法定代表人</td><td>{baseInfo.legalPerson}</td><td>组织机构代码</td><td>{baseInfo.orgNumber}</td></tr><tr><td>统一社会信用代码</td><td>{baseInfo.creditCode}</td><td>纳税人识别号</td><td>{baseInfo.taxNumber}</td></tr><tr><td>成立日期</td><td>{baseInfo.establishTime}</td><td>营业期限</td><td>{baseInfo.timeLimit}</td></tr><tr><td>注册资本</td><td>{baseInfo.regCapital}</td><td>实缴资本</td><td>{baseInfo.actualCapital}</td></tr><tr><td>经营状态</td><td>{baseInfo.regStatus}</td><td>登记机关</td><td>{baseInfo.regInstitute}</td></tr><tr><td>企业类型</td><td>{baseInfo.companyOrgType}</td><td>核准日期</td><td>{baseInfo.approvedTime}</td></tr><tr><td>所属行业</td><td>{baseInfo.industry}</td><td>工商注册号</td><td>{baseInfo.regNumber}</td></tr><tr><td>人员规模</td><td>{baseInfo.scale}</td><td>参保人数</td><td>{baseInfo.insuranceNum}</td></tr><tr><td>英文名</td><td>{baseInfo.englishName}</td><td>注册地址</td><td>{baseInfo.regLocation}</td></tr><tr><td>经营范围</td><td colspan=\"3\">{baseInfo.businessScope}</td></tr> </table></div></div><div class=\"{mainPerson.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l fw-bold\">主要人员 {mainPerson.total}</div><table class=\"table-border mg8\"><tr><th style=\"width:40px\">序号</th><th>姓名</th><th>职务</th></tr>{mainPerson.list}</table></div></div><div class=\"{stockholder.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l fw-bold\">股东信息 {stockholder.total}</div><table class=\"table-border mg8\"><tr><th style=\"width:40px\">序号</th><th>股东基本信息</th><th>出资比例</th><th>认缴出资额</th></tr>{stockholder.list}</table></div></div><div class=\"{branch.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l fw-bold\">分支机构 {branch.total}</div><table class=\"table-border mg8\"><tr><th style=\"width:40px\">序号</th><th>机构名称</th><th>法定代表人</th><th>注册资本</th><th>注册时间</th><th>经营状态</th></tr>{branch.list}</table></div></div><div class=\"{investment.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l fw-bold\">对外投资 {investment.total}</div><table class=\"table-border mg8\"><tr><th style=\"width:40px\">序号</th><th>股东基本信息</th><th>出资比例</th><th>认缴出资额</th></tr>{investment.list}</table></div></div><div class=\"{change.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l fw-bold\">工商变更 {change.total}</div><table class=\"table-border mg8\"><tr><th style=\"width:30px\">序号</th><th style=\"width:90px\">变更日期</th><th style=\"width:70px\">变更事项</th><th>变更前内容</th><th>变更后内容</th></tr>{change.list}</table></div></div></body></html>";
var htmlPersonal = "<!DOCTYPE html><html lang=\"en\"><head><style>*{line-height:1.45;padding:0;margin:0;color:#20242e;font-size:13px;list-style:none}body{padding:2px;background:#fff url(../watermark.png) repeat-y center top;background-size:80%}span{font-size:inherit}a{font-size:inherit}.display-none{display:none}.fw-bold{font-weight:700}.border-b{border-bottom:1px solid #e5e5e5}.green{background:#3dbd7d!important}.gray{background:#7d8699!important}.border-t{border-top:1px solid #e5e5e5}.padding6{padding:6px 10px}.paddingL6{padding-left:6px}.second-title{padding:15px 0 5px 0}.mg8-0{margin:4px 0}.mg8{margin:8px 0}.mg10-0{margin:5px 0}.mg0-5{margin:0 10px}.font-m{font-size:14px}.font-l{font-size:15px}.font-xl{font-size:16px}.mg-r{margin-right:5px}.ta-c{text-align:center}.vera-top{vertical-align:top!important}.display-with-50{float:left;display:inline-block;width:50%}table{margin-bottom:15px;border-collapse:collapse;width:100%}table tr{text-align:left}table th{text-align:left}table td,table th{padding:10px 10px 10px 0;vertical-align:top;border-bottom:1px solid #e5e5e5}table th{padding-left:10px;background-color:#f0f1f5;color:#4e5566}table em{color:#f82626;font-style:normal}.table-border{border:1px solid #dadde6}.table-border td{padding-left:10px;border:1px solid #dadde6}.table-td-s-30 tr td:first-child{width:73%}.table-td-50 td{width:50%}.table-td-25 td{width:25%}.table-td-20 td{width:20%}.table-baseInfo tr td:first-child{text-align:right;background:#f0f1f5;width:140px!important}.table-baseInfo tr td:first-child+td+td{text-align:right;background:#f0f1f5;width:100px!important}.base-b{color:#1c80e1}.remark{color:#7d8699}.title{color:#20242e}.entry-title{padding:15px 0 10px 0}.entry-title .et-cot{border-left:4px solid #1c80e1;padding-left:10px}.nAndI{display:inline-block}.nAndI span{display:inline-block;vertical-align:middle}.nAndI .n-icon{border-radius:50%;width:6px;height:6px;margin-right:5px;background:#000}.nAndI .n-remark{color:#7d8699}.nAndI .n-title{color:#7d8699}.n-line{display:inline-block;vertical-align:middle;width:1px;height:12px;background:#dadde6}.exp-title{text-align:center;padding:200px 0 150px 0}.exp-title .title{margin:100px 0 50px 0;font-size:40px;color:#384482}.exp-title .name,.exp-title .number{font-size:27px}.exp-title .time{margin:500px 0 50px 0;font-size:18px}.exp-title p{text-align:left;font-size:11px;line-height:18px;color:#7d8699}.exp-info{padding:22px 0 15px 0}.exp-info .icon{width:67px;height:67px;float:left;background-color:#e6eeff;border:1px solid #a8c8ff}.exp-info .info{margin-left:85px}.case-tag{padding:1px 6px;background-color:#fb8e3c;color:#fff;margin-left:15px;display:inline-block}.type-tag{background-color:#eff4ff;border:1px solid #1c80e1;color:#1c80e1}</style><meta charset=\"UTF-8\"><title>债务人画像查询报告</title></head><body><div class=\"exp-title\"><div class=\"title\">债务人画像查询报告</div><div class=\"name\">{info.name}</div><div class=\"number\">{info.number}</div><div class=\"time\">{base.dateTime} 查询</div><p>· 本报告内容为 {base.dateTime} 查询的版本，您所看到的内容为该截止时间的数据快照。</p><p>· 本报告内容是源诚资产监控平台接受您的委托，基于公开信息挖掘的结果。源诚资产监控平台不对该查询结果的全面、准确、真实性负责。本报告应仅为您提供参考，真实结果请以各官方网站的公布结果为准。</p></div><div class=\"exp-info border-b\"><div class=\"icon\"></div><div class=\"info\"><li class=\"font-l\">{info.name}</li><li class=\"mg8-0\"><div class=\"nAndI\"><span class=\"n-title\">证件号：</span> <span class=\"n-desc\">{info.number}</span></div></li><li><div class=\"nAndI\"></div></li></div></div><div class=\"{overview.asset.display}\"><div class=\"entry-title border-b\"><div class=\"fw-bold font-xl\">资产概况</div></div><div class=\"padding6 {overview.B10201.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.B10201.total}条</span> <span>相关资产拍卖</span></div></div><div class=\"{overview.B10201.role.display}\"><div class=\"fw-bold second-title\">角色分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.B10201.role.list}</table></div><div class=\"{overview.B10201.result.display}\"><div class=\"fw-bold second-title\">拍卖结果分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.B10201.result.list}</table></div></div><div class=\"padding6 {overview.B10202.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.B10202.total}条</span> <span>裁判文书 - 代位权</span></div><div class=\"{overview.B10202.year}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.B10202.year.list}</table></div><div class=\"{overview.B10202.reason}\"><div class=\"fw-bold second-title\">案由分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.B10202.reason.list}</table></div><div class=\"{overview.B10202.case}\"><div class=\"fw-bold second-title\">案件类型分布</div><table class=\"table-td-25 table-border mg8-0\">{overview.B10202.case.list}</table></div></div></div></div><div class=\"{overview.lawsuit.display}\"><div class=\"entry-title border-b\"><div class=\"fw-bold font-xl\">风险情况</div></div><div class=\"padding6 {overview.B10203.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.B10203.total}条</span> <span>涉诉信息（涉诉文书）</span></div><div class=\"{overview.B10203.year}\"><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.B10203.year.list}</table></div><div class=\"{overview.B10203.reason}\"><div class=\"fw-bold second-title\">案由分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.B10203.reason.list}</table></div><div class=\"{overview.B10203.case}\"><div class=\"fw-bold second-title\">案件类型分布</div><table class=\"table-td-25 table-border mg8-0\">{overview.B10203.case.list}</table></div></div></div><div class=\"padding6 {overview.B10204.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.B10204.total}条</span> <span>失信记录</span></div><div class=\"fw-bold second-title\">年份分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.B10204.year.list}</table></div></div><div class=\"padding6 {overview.B10205.display}\"><div class=\"entry-title\"><div class=\"et-cot font-l\"><span class=\"fw-bold mg-r\">{overview.B10205.total}条</span> <span>税收违法</span></div></div><div class=\"{overview.B10205.role.display}\"><div class=\"fw-bold second-title\">角色分布</div><table class=\"table-td-20 table-border mg8-0\">{overview.B10205.role.list}</table></div></div></div><div class=\"{asset.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">资产拍卖（智能精准匹配 {asset.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{asset.list}</table></div></div><div class=\"{subrogation.judgment.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">代位权（裁判文书 {subrogation.judgment.total}）</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{subrogation.judgment.list}</table></div></div><div class=\"{lawsuit.judgment.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">涉诉文书 {lawsuit.judgment.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{lawsuit.judgment.list}</table></div></div><div class=\"{lawsuit.dishonest.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">失信记录 {lawsuit.dishonest.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{lawsuit.dishonest.list}</table></div></div><div class=\"{tax.display}\"><div class=\"entry-title\"><div class=\"et-cot fw-bold font-l\">税收违法 {tax.total}</div></div><div class=\"entry-table border-t\"><table class=\"table-td-s-30\">{tax.list}</table></div></div></body></html>";
var backgroundImgData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAPoCAYAAAAC24AdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjNDYwZTZiOC00ZjcyLTQ1ZmQtOTJjZC1hZjZkNzZjM2EwNDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0FFOTdGRTEwOUFGMTFFQUE4NDFGODI5OURCOEQwRTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0FFOTdGRTAwOUFGMTFFQUE4NDFGODI5OURCOEQwRTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRjBGQjc3RDA5QUExMUVBQTg0MUY4Mjk5REI4RDBFNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRjBGQjc3RTA5QUExMUVBQTg0MUY4Mjk5REI4RDBFNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl/I3lAAAK7BSURBVHja7N0HfFX1wfDxM+/MzSBBQGUkYchwgLIEZKmooK2ttcPWtz62dVUrKAoImSwHUPWptfZp3z7P09a2tn1bxYGgbBkqIkNWCAiyQva484z3nCCQSRKyk9/3+eQBb3LXyem9P/7nf/9HNE1TAAAAQNMRCSwAAAACCwAAgMACAAAgsAAAAEBgAQAAEFgAAAAEFgAAAAgsAAAAAgsAAIDAAgAAAIEFAABAYAEAABBYAAAABBYAAAAILAAAAAILAACAwAIAAACBBQAAQGABAAAQWAAAACCwAAAACCwAAAACCwAAAAQWAAAAgQUAAEBgAQAAEFgAAAAgsAAAAAgsAAAAAgsAAAAEFgAAAIEFAABAYAEAAIDAAgAAILAAAAAILAAAABBYAAAABBYAAACBBQAAQGABAACAwAIAACCwAAAACCwAAAAQWAAAAAQWAAAAgQUAAAACCwAAgMACAAAgsAAAAEBgAQAAEFgAAAAEFgAAAIEFAAAAAgsAAIDAAgAAILAAAABAYAEAABBYAAAABBYAAAAILAAAAAILAACAwAIAACCwAAAAQGABAAAQWAAAAAQWAAAACCwAAAACCwAAgMACAAAAgQUAAEBgAQAAEFgAAAAgsAAAAAgsAAAAAgsAAIDAAgAAAIEFAABAYAEAABBYAAAAILAAAAAILAAAAAILAAAABBYAAACBBQAAQGABAACAwAIAACCwAAAACCwAAAACCwAAAAQWAAAAgQUAAEBgAQAAgMACAAAgsAAAAAgsAAAAEFgAAAAEFgAAAIEFAAAAAgsAAIDAAgAAILAAAAAILAAAABBYAAAABBYAAACBBQAAAAILAACAwAIAACCwAAAAQGABAAAQWAAAAAQWAAAAgcVWAAAAILAAAAAILAAAAAILAAAABBYAAACBBQAAQGABAACAwAIAACCwAAAACCwAAAAQWAAAAAQWAAAAgQUAAEBgAQAAgMACAAAgsAAAAAgsAAAAEFgAAAAEFgAAAIEFAAAAAgsAAIDAAgAAILAAAABAYAEAABBYAAAABBYAAACBBQAAAAILAACAwAIAACCwAAAAQGABAAAQWAAAAAQWAAAACCwAAAACCwAAgMACAAAAgQUAAEBgAQAAEFgAAAAEFgAAAAgsAAAAAgsAAIDAAgAAAIEFAABAYAEAABBYAAAAILAAAAAILAAAAAILAACAwCKwAAAACCwAAAACCwAAgMACAAAAgQUAAEBgAQAAEFgAAAAgsAAAAAgsAAAAAgsAAAAEFgAAAIEFAABAYAEAABBYAAAAILAAAAAILAAAAAILAAAABBYAAACBBQAAQGABAACAwAIAACCwAAAACCwAAAAQWAAAAAQWAAAAgQUAAEBgAQAAgMACAAAgsAAAAAgsAAAAEFgAAAAEFgAAAIEFAAAAAgsAAIDAAgAAILAAAABAYAEAABBYAAAABBYAAACBBQAAAAILAACAwAIAACCwAAAAQGABAAAQWAAAAAQWAAAACCwAAAACCwAAgMACAAAgsAgsAAAAAgsAAIDAAgAAILAAAABAYAEAABBYAAAABBYAAAAILAAAAAILAACAwAIAAACBBQAAQGABAAAQWAAAAAQWAAAACCwAAAACCwAAgMACAAAAgQUAAEBgAQAAEFgAAAAgsAAAAAgsAAAAAgsAAAAEFgAAAIEFAABAYAEAABBYAAAAILAAAAAILAAAAAILAAAABBYAAACBBQAAQGABAACAwAIAACCwAAAACCwAAAAQWAAAAAQWAAAAgQUAAEBgAQAAgMACAAAgsAAAAAgsAAAAEFgAAAAEFgAAAIEFAAAAAgsAAIDAAgAAILAAAAAILAILAACAwAIAACCwAABoqOnTpwvbt2/v1NvAMAzh6VlzXX36DIjKL8gLv/G3P2rWxbogmLoqu/RQqNT8+JMtNb2921cWnC6XIMlym3xuq1ev7tC/O4X/CQMA2qJNmzYJW7Zs6fTb4VvfOdZNcsb3CIdC+uRb7jLswBLPB5Ye17W3Zph6yKm4Q8FQUegvr/9vRDBNTfR5Igc//pgdicACAOA8t9vd6bfBlUOuUYYOGxFdUlqiybJkVnjvVjQjLCoOlzB+0k3nfl60vibf/A1dMA0rsLyR3ds/i5Tm54ZUyRV8553/FzidcywcFeWO7Pj8M7OszM9ORmABAND53Hb7HVERQ3dZfzUqXFweWqIomvZfg4FA1atJ1pdD8AecAxL7ClLfAeU/PvS66wzTNCM+nzuy8/PPQ0XFRf4jh44FVq/+d0iU1dDuHdsNTQux0QksAAA6Lp8vSujbf3C8oeliA696ZqRLEs1wOFz1e6rf73f07JPs7SPLXa4eOkK449t36qKkhr/YsT0QDJf495cVln38xhvB0pLC8IGsA/wiCCwAADqO/gMGK9cMHeUqKioyXG63VPX7wWDQSil7YMseyRLq+4k1U7LCK2KFV+T8ZdZtm+7+A69wS5IUP9S6vXtumBouLS0I7fj880D3bt1KfrlsfuHnn283+K0QWAAAtGt79+zWf3rfd7J0XZdH3n2PMig6QdUiIdUwdNU0TfW64cNVxRGl6tZ/C6Z57v3c+nkhFAwJVkjVN4hMO9LCoVDFC1RJdjhGXj8+RtOCvkAwUMhvhMACAKDdKysrNbd/trW8enbu+LTa9wcPHiIoTo9s6Jr63bvvVt2+Ls5I2HTFxkW7rrhioKOkJOAWRfGi7tu6lmkahmmYurB9x/a8/fv2MXpFYAEA0Lp69e4t/OAH98WWlkQi//mfC8qa4z52795l/6HbXzs/3xa0/iyxL4iNiRF+94c3LvNEd/HqmlYpjCRJEh1OZ3lDmfZIV8i6mijVeohRlmX9g1XLGb0isAAAaMWwGjxE+PaU/4iefPN13RIu6Rm3ecOar6yLy1rq/hXZITz2eEp8VEzXHpFIqFJcKYoql0X8hX/+w2vHr7pqhFuN6RJ11ZBr3IK/zGmKZ3rAPkxo6IYpiIIpyZJUkF9Y8sVnOwL8ZgksAABa3LBh14p33f0D35Axk7v5RDUmEPCLpaXFpj8QcLTUY4j2+YQXlr3iu2Lw8N7FxQXCmVWxzpCsWtJ1rey5zDmHt2xcHxaE/yoVvJ7TVw4ZJop+v/PGm7/puuzyHr7+Awd5o6JjnIamO1wej7z3i60FR7/K5hdMYAEA0PJ+8pMHPEOHT+pfUJAnlZkB/cyk8bA0aNBAZ1JSopCdfajZH8OY8ZNc11w3NvHUyROyKEoVR68kny8qsnblm4fOxNXXyvzCzi0b7EODwR07yw8xFib37Sf4omOdN06eUn56nr//9Y8cHiSwAABoHS+99J/aK6+N1ozyT/OdGTmyP83XJf4SNTYuXhaEQ3pz3v+oMePlhx6blXg6J8dZJa7E6Jg4Y+W6dw8tzpxb59LtB8+sexXavu1je3J9Eb/ZiyexCQAAaBxnlCcsOtSwaZrnjsuJomBGNF0JBILNOpgxadIkMSN9aR+n4vBZ919p3pXT5RZXr3zn6KJnnioKhyP8oggsAADaj/37dps7d2wLO52uihebpmAql/e8Qm2u+1VVh/CzB5+8THYo8ZFIpNIomcvtlnNPHT2RmfFUTiQS5pdEYAEA0L4ESkqEssKCgCRXe1sVp972bWezxJXiEJ5Jf6FrQrfLegQCAb1yeKmyHg7k/fbVpce0SMNHrsaMGSOnpqZHqSoziS4WWw4A0CbJsty+3lAVpcblDAKh/CYPLIdDFZ5++tmYiRNu6lVSUmhW/MSgKEpyRIuUZKbNOLzlo4/Mht72yBEjpLlpzybFdukW43R7slLnzS6MRDR2SAIL6DymT58ubN++nQ2BDqm97dvvvv2P0LDrRlULGsM0mjyw5s2b75lw4y2JRcVFkpVU5+ZdGYYpde/eNZg2d0a2FVcNnlhvx1XagqVJkuyJyz2dZ4ybMDU5PVM4SGQRWECnsmnTJmHLli1sCKANOHHylGYKon08zp5zZZ4JHkPoEtdFjYqKEkpLS5vkfkaOHue4ZuT4pJKyUvt+zsWVad15bFystmPb2uwN61eGGhFXXSKRsG6fZaewsFgksi4Oc7CAdsztdrMRgDZCcTkioiprgnn+eF04FBQGDxkq9xswuEnuY8zYsVLG/CVJDkX1GLpeaTmGmJgY4aO1Kw4//OBPS4uLGxZzVePq3I2Kgnk+shbFMieLwAIAoEWZkaChh/xa5RMsi0JE02RNizR6Qtn4adPE1GW/6WO9dUdX/cSg0+kW13644sjcZ2YWhBs4qb22uCKyCCwAAFrdrh07hU+3bAk53ZWXarAay54n1ajAUhVVePDeBy+TAlq8FWyVIsjtcUt5p746kZE2M8cKuSaNKyKLwAIAoA28qcrV5j6JpiDb506++LhyCHMzllyScEnPHsFAoPIJnFVZ9pfKeb/+9a+PRZpw5MpeMLXioqlEFoEFAECrcbkdVQPLNAXBXjbhokawFEUWUtKWxk6YcHPPUChQ6ROKquqQJcMsykx76PDaNcsbtBzDheLKMAzJ5/OF4mLjgqIoSkQWgQUAQKvy+wuqDSOZgilOuflHDQ4sny9KeGrWPO/4SRMSS0oKJOHrTyaeCR1RikRCZfOemZG9dct6oynjKiE+PnTgi61ZmalP7jd1M6CoKpFFYAEA0Hr+53/+RxcrrEt1VmJiQoNPl3PD+Jtc37zr3uTC4hKl4lpXpmlKlyR0Db/y0uLsLVs2NOi4YL3ias+nWb/4xSOBFSuWhzPTZh4wNYPIIrAAAGg9iqLY0WJ/VZq/FAmHG/R+O3LkOOXBR55OOp1z2iWJFYPNFH1RsfqKTzZkb1j3YaA54uqhh+73+/1nbnrLlvWhtHkziCwCCwCAViSKupVW1T6NFxYMsb43MWbMGClj4dIk1alGmaZ5/rZMQYyOiRHWfLjicOpD95cUl5TU+2FNmDBBWvDsS0mi5K53XJ1FZBFYAAC0cmAJhmkHlll5BEsylXoF1vjx48V56c/3FkQpVqu61pXLLa75YOXRBfNn5ut6/Y8M2nGVNn9JkmaoXTQt0qC4IrIILAAA2kBfSYZoyoa9NkNFcpVDhjVRVVV48NFZlykOb0LVhURdbpeUl/PVicy0maci4YbHVSBkXnRcEVkEFgAArSpPDwq5kTJTrry6gaAJF56DpTpUYW7a890Sul5aba0rezmGcNDI/fUrzx2LRMIXFVd6lcVJGxpXRBaBBQBAqzm2c6eQ9fHHhuqqtJq7IMpSrSNYiiwL81Ke6zJh8s09Q4Gqa10psm4KBRkps79cu2Ztvde6ao64IrIILAAAWo3VUtWWaZAMscbA8njcwqJnl/omTLq5T0lhsX0g0TwfV6psmmJJ2rzHDm3evKLea101Z1wRWQQWAACtQ6weWLpZfQ5WtM8n/Po3v/eOtUKkqLhYrhhXsixLmmb4U+fOOLj1ow1aW4orIovAAgCgFdRwJE8yq0XX2BsmuQYOGZl0+nSOKlaOMsnldoW3fPR+9pZNa+s96aol44rIIrAAAGjpvKo2WmWaldfGGjFqnPrgY7OtuDrtliSp4irtYmxcjP7BtvXZCzLm+dtyXFWNrJA/4LeeCyeIJrAAAGiOwqo+oV2SlHPRM2rURDlzwS+TnKqj8kKiVo/ExMSZ6z5899DzTz5eohv1m3bVmnFVMbL+/L+//cp5ZnI/kUVgAQDQtAxDq/beqpqh8loaMWKcmJq5LNF6942puqK6LzpGXLt6xZGUubMKQqH6HRmcMGF8q8dV+fMaOc79g3t/0jMUDJYnZtXvV40sRZE7/H7ASmAAADSRIUOuFoZfN0oKBSvHjMfr0m666SYhJXNJ79LSUBerrSovJOpyS2s/WPFVRvrM05pWv4VE7ZGr9PlLEv2tHFfDrbhKmb+0ryJLLi0SqXXY7WxkjRl/a/KixY5D1kX5HXlfYAQLAIAmIqoOUXK6ZdM0K8aOEAgG9e/96IEeobBwia5XjitZVuQusd5Tf/qfV05YgVLvuMrIXGbFlRDf2nGVasWVWkNcSTZZrnq40Hp8khQRlA4/wENgAQDQVIFlGrIk6PaZcc4VViQUNqJjenTr3r3npcGAv1IMqYoqq4qe++SMnx3dt39/g+KqLGxYcRVpE3EVqRJXiqJKoWC4KGg9ggqfLhR90THC2nUrj8yb9Yucjr4vcIgQAIAmooXCiqmbld5bTev/evZK7BLRIlVOgaPKhqAVZjwz/fDGjR/Va5X29hFXiiyYasH81MeydCPiWPTcr/pZl3lcbo+xevWKowtSZ57SNa3D7wuMYAEAOiRVdQjPzHs2/omZc6JbalL19+69VzFF+9zOlSd6V40rRbUekG6WpKc8ddCKq3p9XLD9xJWjIH3e9IOfbttobt++tXwJB1V1lq1b/8FXdlxFIpFOsf8xggUA6JBxlZ6xNH785JuTdEPT3C5n1uJFGSVVpis1Obfb5z0z00iodURKFEUpEtHKMlOePLh1y4Z6PaA646pr24qrTZs+OPc9ewmHn953195jx77UO0tc2RjBAgB0yLgaN2FyYn5+nllcVKzceOu3k2fNTvE150hWVFSc4HXFRRlG7Ye/7BiKT+gaeuXlxXZc1WsthnrF1V4rrh5oe3F1VvbBffrXSzgQWAAAtOe4KiwutEeL7JEko7SkVL3xlm/1nTUnNSYqKqpZ7jspsa805MqhrnAoVEtcmVLXhK6RvTs3H9y49oN61Ua94+pnbTeuOisCCwDQMeOqwif57B4p8wcdd3/v3qikpMRmuf9JN02KiugBtyBUP9mzaQpiXFyMvnH9uwcffuj+suKSknYTVyNHj3WnLVhCXBFYAIBOGVfptcaVIEqy1O2S2ONznn70+I4dO5v8/n2+GGHwlSO76rpe03kIxeiYGHPd2ncPzXn6iZL6xFBbiit75EqRZOKqgZjkDgDoDHF1Mu2Z6UeXL1/eLI+he/fLxMuTk0xJKD8mac9yP/sYxNjoGGH92lWHU1NmFdRnIdG2FleSSFxdDEawAAAdI65KWieubAcOfGH+5L67Dm20QqpLbKxmL2FumqbodLnFD9euOJo674k8Ldw+40ojrggsAABx1dJxddaxg1nm/IynczLSntxjCuGC+PiuUs6pr45npthrP9X9gUHiqmPhECEAgLhqIpGIJqx4d3lo/94vDjzw4PTozZs/LGmvhwWJq8YRK56QEkD7MnHiRGHNmjVsCBBXbSCuLtaUKVOUOXMX9/GHjS5V48o+zOjz+ay4+iTrF48+FOhIcdXR+4NDhAAA4qoVjRw52a06o+O0SLjGcFFUxfjz669rjFwRWAAAtMm46tevn3Dz1G94f/mb/7105E03O9vC81q8OKXk/TXLD8bExtnDOpWWebAXSi0qLPbMeCqj38jrb3AQV+0Hc7AAAB06rq4ecqWQNGCQ68Yp02J69uwT54vu4nU4naomSsaWle+fbO3nFg4HhQVzn8wXFwnCxDFTkooLC8Qzqz2cYZqGoaqqNzVzad/0eTOytny0LtxU901cNR9GsAAAHTaubA9mPhs7c/aCQQMGXNVblp2+stISobAgX+9/aa/4Pn2S28T7YCQcEebPfjJ/9cYV2dE1jGTZ8SOJojc1Y2nfkSOaZiSLuCKwAADE1UUfFvzzf/8hEA6GjWDQb9ijQfZl1h+GLy7Oc8c3fhjdVp5rvSJLsiJrfuMji7gisAAAxFWjJrR/8vaboQP79xQ4nM5KwVJWVibcedc3EwYMGNBmnnO9IktpXGQRVwQWAIC4avSnBQORoHDqZHauQ3VUDgZ7DQTR4Rs8+GpXW3ruzRlZxBWBBQAgrppsKYbfvvZ7f2GBv1SSxIrve6ZuaOrkKVNj2to2aI7IIq4ILABAp40rxYqrF5p8nasvD+8xjx7bnW+fG7Di5cFQyOx5eVJcYmJSm9sWTRlZxBWBBQDo1HG1sNkWEf1wxTtFkijaSxycCxXTMMzo2HhP/wHXuNviNmmKyCKuCCwAQKePq6lWXJU0ywrtu3ftCJu6VipaKlxsanpEnnzjbbFtdds0JrKIKwILAEBcfR1XQrOc/mb//n3Cv/75j3yXq/JgVSgUEgZdeUVMYlKS2CEia+SZyCKuCCwAAHHVrHF11qoPlxeLshy27qXSYcKoqC7uoUOHN+rUOSNHjpJmz86IUVW1VSNr9tz5yff86Cexs+ctSiauCCwAAHFVJa4kwRflODFv1mNNduLmw4eztL17Py+tsiaWqeuacuNNU6Mu9navvfZacV7qc73u+NY9A1JSF3dvicjyWZFl1hBZDpfL+x8//UWyQ3USVwQWAIC4qkS0IsUoK84rWLHivSa7X39JqZCXe6JIViq//emGLmiGFOPxNLyx7LhKz1zWW3VFXZKbl2PcMPnWni0RWZutyIqtIbIMwzADgbLyP4krAgsAQFxVZIaCQdnt65b8+z/8yePxNN2H/Fa9/XapJMqaUOHThOFQyLzyqmHexMR+ysXGVSQS1kVRNEuKi007sualLuoRFeVtlnlddmSlXCCyqlJUVSKuCCwAQOeOq3J2rBQXFTn7Dbyu7yuv/q7JIivrqy9DucWFAVmSKh0mNEzN+d0ffr/ed1I1rireVnFxoTBl6ve6/eSnj6vNtS1DVmQ9U4/IkqwnGigNFs156uEs4orAAgB0wLhKS19Ua1wZhmm/J1WKBEmSjLzc3CaNrGPZB80vv9hTpDorz2m3AkVwqNH1OkY4zIqr1MwlNcWV/Uwkny8+8uY/1x587TevhJtzm4brFVmi9cx02dDDKnshgQUA6GhxlWHF1cRpNY9ciaJ4ySXxhU6XS2+JyAqGi0qFKo8hFAwK1w4bHnXlkKvqjKu0zBd6O13RNcZVlBVXq9799OCzi35S4vcXNPu2rSuyDF03PVHeqIXPv2Kvk+VkbySwAAAdgONsXE2YllhUXFTjUgyXdI09tWTxvAMfrnjvy+joGLO5I+v11/8UVGSl8qruFsXhdJmCqNQdVzEXjKvFi+4v0bRAi23juiKrfAkHWbAi61fJffsNlNkrCSwAQDumWHGVUkdc2etcZaQ8cfSNN/4qvPBcSv7qlSsONXdkSYJu9ZE/eG5VdytIJEkWHS6Xu2ev/u72FFf1jCzR5fYYGzevKTh16jjzsAgsAEB7jqtZVlyNrSOuyhcRfevMOlcRLSxkZsxs9sjauXOHsO2zbSVOt0dyu9yy1xetBwIlRZ9sWvNlSUlBoL3FVe2RVb79RF90jLBmzftHM+fOOFFSXGSyd7bA/s8mAAA0V1zdZMVVSV1xVWURUU2LlEeW/feJN01JLC4usiPBrCWysh5+8H6/39/wqJH0YInXJResXrW6YMWKN0sOHcoKHvnysNBe46pqZC1YJAijxtycpBumtHr1ii8XpM48FYlE2DlbiGh/agJA+zRx4kTrX6Vr2BBo03ElXOTpbxRFFealPN+lpsgqTxvDkOITEkIH9nxyUZHl9XqE5ORkYceOnbX+THuLq4ocDlV4fslL8YGIoM57+rGTbS2uOnp/EFgAgQW0ubhqqci6kPYcV2e5XGc+NBgMhtrcY+vo/cEcLABAm4wr29nDhXXNyeo/cHjfX7/2f5tsMdKOEFdnw6otxlVnQGABANpkXDUksnJzTzv7XXFdk0RWR4krEFgAAOKq8ZF1OqfRkTXs2mHEFQgsAEDHj6uWiqzycwsuWEZcgcACAHSOuGruyJo2bZq45MXf9lLVKOIKBBYAoPPEVXNFlh1X6QuW9QqGzG7WbRNXILAAAJ0rrpo6ss7G1amcQuIKBBYAoHWoqkOYnf5sq8ZVU0VWxbgyDJ24AoEFAGh59qKfKalLutw0cWqrx1VjI+v2228nrtC8/3thEwAA6pKQkCA8M++5+KHXjUosLi6wO6bV46pqZNl/r+3chWcja9mLv8pav/ZD/6MzniGuQGABAFqfaSqGlSvVRonqiqvZs+c6duzaLe/M3h84snt3q0bWgMHDk4aPnhg4duxUF+sHiCs0G85FCLRjnIsQLfovctkhpKS9FDvhxolJxcX5kv0WUldcRUVFCS/96g99Bgy+JiGnuKD4y53bi95b8Wbxvr2HAoeydzX9Y6zj3IXWe55oGKYoy5JBXLV2sHfs/mAECwBQL5oeFjLTHysUhJeyrchKLi4tUqy4On6hw4J9EpOVpL4Dffm5p0WnKMVcOXRk7NXXXa8VFfrLDh/eUfT+O/8u2rVzT+DIkQNN8xjrGMkSRdGUZdEkrkBgAQDajIh2JrJM4eVDd9411Ttn5oMXnHM15tbbvZquu6ywMQyrcwIBvz10ITkcUvSQK6+LuebqkVpeXqH/yNF9Ravee6vw0082B06ePNlkkTVu4uQ+fn+ZJFQZyTrPFBU1Krxi+dbs55/7GXGFJsMhQqAd4xAhWovD4Rb69+8v7Nr1ea0/4/P5hKUv/a5P78R+XcOhkFHb+5AkS6LD4RRlUdby806VbNm8Nm/lireLd+7crmma3qjH+dLLf4gfeNU1iaFgsMY3O0WRpZLCosP3//ju08Ul+fxiW1BH7w+WaQAANFg4HLhgXNkGDBisXnPNiNhIJCyaginW9j5r6IYRDAT0Mn+p5PHFxE2Zelfyspf/MPCVV/+35623TvMkJQ2+qMc4dOhQsUeP7t5IRKv1Z6zvmV27d+v+y5dfvOgTRAM1/suBESyg/WIEC21ZcvIA5dHHZnXrkzTAFxcX69aMiBoIBM3yoQtRuOCbj/VN0el0Sg5F1YsK/aUnju3P/2DV8sK3l/874g/UfRiv/MTNmct6q66azi1YmWEYUnxCQujAnk+yHn7wfr/fz2HCltDR+4PAAggsoFn16TNA6N+/r/vGm27zDRs+MlqxqkfTDUckHDZ1XTMFofbYsr8hS6JkH5L0+bzhf/7tjyefXZx6qhFxJVa4aSKLwCKwABBYaP8GDxlsHzp0TrnlG9G+uITYHj0ujzJ0TQ2FwqZh6MaFrutyuZVt2fsOP3Xf3acuLq5M0boNzf4sYTDol6sulkpkEVgEFgACC+1etx49hOuvH+e88ZbbY3t0vzwurktCVCSiSV9PiK/65iRGeX16ytL0L9b982+hmm5vmBVXaZlLejtd0TXElSFFRSVElv/7wyxVzVdunXZnck3rZBFZBFZTYZkGAECrOHXihPD//vG3kPV1qk+fPqcefPgX3viuPbsk9xsQaximywot4dyoliiK4ZC/NHf3jgvE1Qu1x1X5OlefHFz6/C9KBTEiuJyeQ7Wt+J6Xm+vsN/C6vq+8+jsiCxeNESygHWMECx3uX/2KLAwaco0y+dbbo2+adEuC2+PzRcJhWZIlYd++z7If+emPc2uPq5gLxFXlRUTrWvGdkazmxzINAIBOpWvXhFa7b3vdqx3bP9WWLUrLf+SBH+zftH7F3iNfHjwVG+sr++C95SVNEVdn7ufMYqSrV644FB0dU+38ilVGsljCAQ3GCBbQjjGChaY2YsQ419z0hZdlps8+9vHmDcG28JhcTqdw5dXXyJ9v/0wPh8ONjquKGMlqPYxgAQA6S1w50+YvTfZ6Y7rafw4fNdbZFh5XMBQSPt66pcnjysZIFggsAEBzx1VfSZE8fn9ZRJFkj/3fbSWyKmqquCKyQGABAFokrrRIxBBFUYhYf7bFyGrquCKyQGABAJo9rip+r61FVnPFFZEFAgsA0CJx1dYiq7njisgCgQUAaNa4EkVJakuRNezaYS0SV0QWCCwAQHPEleh0OE3B1IsVRRHbQmRNmDBBTF+wrMXiisgCgQUAaNK48vmihXVrVh6Z+/Qj+/NyTuY4nW65NSNr2rRp4pIXf9tLVaNaNK6ILBBYANAJ9evXT/iv//579+lPzokfNep62ev1NE1cffj+l4sXzs39bPs2MyP1iSN5p46fbK3IsuMqfcGyXqdyCrtZodPicUVkobFYyR1ox1jJvfPx+aKEOXMXdxl7w419Q+GQ6fW6Avv27i16/Y+/zzuwf6c/Ozv7ouMqI33maSugzn1jQP8BQnrmL3vFd7u0eygUqBQ5iqLIisNZ+uD9392Xtf8LvbniyjD0Vourys+3fiu+7//ik4MzHn+krKCggJ21DqzkDgBoM2644UbnjTff1rOwqMAIBgPG6dx8d4/LevaYNXfBwF+9+qf+T89K6ZKU1K/Sa/uIkQ2PK9u+/fuE1HmPVx/JMk3R5fEaH21al3fq1HGjo8eVrT4jWbmnT7uuHTG+z8BBg2T2VDCCBbRjjGB1LhMm3Cw+8fSCfpJixJqGWW3USJJkye12C6Wlxf6d2z/Ofevfb+S53VHyjJlpfRWn2qC4qqjiSFYw6DeiY2KF1WtXHVkw74mcSCTc4eOqotpGsqz3UjEuJk7/aP17hzIy5haWlpayw9aho/cHgQUQWGgHoqJihf99/V+Xde3avWdhQb5u1VStI0eSxeF0iZIgBOz3/2Ao5DIsFxNXVSKrd+++A7qtWPn24aaOqzu+cYeUkvFCz5ycojYbV7VFlv02GhcTa2zeuOLgnDlPFoXDEXZYAktQ+BUDQPvwxRc7imMuLzjef8Bgn1IWdGumLoVDITucqs4HMoIBv/3Xs5PQGxVXNvtwYWb6k0em3Pat/JdffLakKePK9q3v3N+1pDTSQ9e1iH2qnrYaV7azhwvtv0+ecluSJArGR+veJa5QCSNYQDvGCFYn5PUIg64cKt3zjW96ErpdHte/36BY3RRdVmhZYaWbVWOr6mv+xcRVSxh9/Y1KasaSREGMxGmaprfVuKo0QqGowpNPpXdxOQVj4YLUQuKqYThECIDAQpukKLIwePBVyi233R49dvyN8arTG6WFI1J7i6tzkTV6spSauSxZEMNWZIXNthxXILAILIDAQifQvXt34fY7v9/l7u/d2ycUDNmRde7F3fqLGH2BuOrZK1ma8VR6XKi0QDSdTj0u1m289+9/6wcPZZvWu6AuSqIumbIejviNL77Y3eyRlZa5tG9UdHTUu29tOkBcEVjt9h9A/IoBoCMEVi/nLVO+2S0S0arFVawVV2svMHL1ve8+5Bs5clSyP1AmnL3uozOu/vo90A4swbpRWY+EA/q2zz7VDFMPRXk8wXeW/yN4/MSJiCKrkXCwzNi1e2ejn8emTR8YCzKmZ18/5m7HC89P9xNXaK8YwQLaMUawYKttEdGzcWWPXKXVElcDBw4SXv3tX5NK/GXx1hVq+mTi2Rnnoj353OlynbtctN5CrP9vBZaihUP+0Oeff+bPyz1etvzNf4UUWQru2bPTDAZD/IJQI0awAAAdMq5svfokOwVZibGHqsTKa2dWuKmz74emEAxUG1FSrMtVUZTc1wwbHmtfMPmmb2pejzvy1r/++tXCBXML+S2hMyKwAKCTxlVCQoLwswceTRBF0el2e+xP7omRQFDQTHtg6nxY1TUQYV3fLF9v63x8ybIiKjt2fKrxWwKBBQDoNHFl6949UcjNLQkf2LfquCnLsiiIcuK118rd3B5JjxiyaZqKdZliCsa5eV3hULjO5SAkSRJLigtKd+78rIzfFAgsAECniSvbrl0fCw/85NunK1526ZAhQje3W9DDhhVWghKTmChPnXq7Qy0oc2iC4Bo4aLArOraLwzBM1bpH2a6sYCB4ZkLN16NeDqdT2LlzW9GXhw8zyRcEFgCg88RVbY7v2iUcP/NXrfzr80+FDf/6+7mRqMTERCEmJl7p3ae347bb7nYUFhV4ho24zquqLpeuGU5TMCWP22N+8N47RVVve+q0acL37rkv/tX/XFawceMGg98mOjI+RQi0Y3yKkLhqyri6WIOHDBFUp1vpEtfDeevUO72KbKrLXph/4siR7HOPcZoVV6nzl/UsLQtfakTKctPmPZG9fv163oA6MRYaBUBgod3HVd++fYXbHpkRYx7ODr/84gsturjU2bjKOV3Y3dA1Q1EdskPW84gsAqsj4xAhAHTQuIr2RQkDB14pjxl3c+yUW6cmREXHxRzs9kVOly6/O5yfX9DicWUaumGvpaVrET0sKPEZC5aJGakZh1evfpNPG4LAAgC0/biyPTL96YS77vpRj4KCIlcoHBLy8k6b/fpd4U1M7Cfl529t9jlQVeOq4vfsRUqDmuHWdFMWzsz3AjoUiU0AAB0vrmxdu/RV8gsKPcFgwDANw5AkySgtC7rv/Na3Pa0ZV6qqSrqpBVLnPH5g/bq3WOodBBYAoGWMGj3enZa5pFpcWUSPw2msfO+tw3VNaH/37X8WKrISFs6f7kYQJUF0uqJjWjOuNEMLpM+dkbV188Ygv2kQWACAFnHppZcKz8xbeInT7fJFwuGqh/JEySGHP1j/XkFdnxY8mLU1VFpcELAX/jx7WTgUEgYMHBLdq1dvkbgCCCwAaHdURRXmzH02dsy4iQ06JHf8+HFh0fy5x8KhSL7D4ZCrfNsIlAXds+cu7Ddy7NgLzqPNPvSluXfPriJ74c9zVzYMMzom3n3t8FFO4gogsACg3cXV3HkvdJn2jbv6zU17Lnnk9ePcDbn+Rx+t1tLmzjho6kKhFSeVIsueUKUIjujUzKV964qslSuWF0mCWDF2TE2PyDffNK1J52ERVwCBBQAtElcTb5qSlJeXY4qi5EqzY6iBkbVly1o9tZbI0rSILhlynZF17MSJkCQr9kTySocE8woKmiywiCuAwAKAZuX1+oRn5r0Qb8dVcUmBIIqiaU9Sb63I8pdqen6ePyLJ4rnACgYCwqjRY7xXXXUNcQUQWADQ9j3wwCOOad/4Zu+i4gLRPlnGuRhqpcg6dGiHsGfvpqDD4Tp3mb2CturyKrLqlokrgMACgDbvtddeCa94580jsTGxVsaYlQ7LNXtkZSzpO27y5GqT191OT6VT49ijapFwSNUioYtebJq4AggsAGgxpaXFQlrqE7nr13xwKDY6VmhMZN1ww51SStqLMYqq1hlZkUjYiImOjx47fkq1uVVfHtpfNXJMK7IUXYtcVGC1dlw5HKowf8FzUWPGTXawx4HAAoBOwoodITVlRl5jImv06Gni3LRn+0yZetuAOWnPdbtgZJmmGB0TK6xc9c7hpQtTq51k8P2V70YksfyThOcfhymIN95zX4MPEV4orpQWiquFi1+IuenWb9vbpe+I68er7HEgsACAyKozsuy4Sl+wLNEUChPy83KNyZNu6WXFxCU1RZZ1mRJlxdXqtauOLJj3ZE4oGKj2WKwQs0+vY1a8zHo8Qh9PfINGsC4UV5Isi2WlJWVzZj5yoLnjatSYKck5OTmiIgpRqfOXElkgsACAyKo5skZ9HVmjrz8bVwUJ1rd1e75USXGRaUVW71mpz3b3eKPEipHlVJwF69d/cHTBvCdy7PurkVl++kKz6sWaVlrvwLpQXH19H6IqS7rTIUWaO64KCgqk8nlkkYhuPQFf6vwlfUePnehkjwOBBQBEVqXImjV3QfKP7v25d868Rb3PxlXFfCksyBe//a3vdrvqqmvORZEdWff/+FsH5s974lStcXWmr0x7edJql8v166s640qwV4jXDYfLG7PouVf6jhs3Tm7KbVhTXJ39Xjgc1p2SEjNv0fMJSUmJ7HAgsACAyDofWQ7V5frx/T8dICv+qnFln95GSkhICG3/eM3B/ft2Vxohys7eb4ZCoQvevyjak9qFaoElGUaTxNW556FF9IgmxqbNX5bcVJF1obiyOVWHXChop+fMffJkdvYhdjYQWABAZFWKKDMQDFjNY5pV4yo+Pj58YM+nWY889JPS/PyCBt+3aN+VUf3l3jSrR1d940qWZdHpdEnNGVl1xZVDUeUS2czLmDc9e/vaNTp7GQgsACCyqkWWUHUiuilIXbt2LY+rhx+6v8zvD1zU/YYjEdk0zWqxYyiKfjFxZS/F4PeX+Xft/ewrt7t86pjY1JFV37hKt+Jqx/r1JnsXCCwAILLyVq1Ynu12uoyqcXKWFRSiJJmhTRtWHGhMXNl69uwpW/ciVw24OK9Lv5i4spdiWDR/dvYTj9x/Ys2GFYd9Pl+TRhZxBQILAHBRkbX6w035DofPLwiGWNvPqYpq/uXPr+uNiSvb7dPuVqsfDRSNt9/5V+Ri4spe5+qTrZuC9rcXpc7JW7Xm7UNNFVnEFQgsAMBFsde5mpOyMKm0LC/Knmpe08+YFt0wXWnzl/YfObJhp9WpqixY6rRuUBIFUXK53faX7PF4jKwDWdrFxFXFda60iNZkkUVcgcACAFx0XNnrXIlScULVCe1V6bpuSIpiR1bfxkSWw+MSomLiShWXXPzJ1o0Fn27ZdPqjLetPBEKBSGPiqikji7hCRyOaJvsp0F5NnDhRWLNmDRuincVVDetc2SNWoqKooq5r1Ua07FPQmLoRTLMCZ8uW9Rc8Xnh5z15Sj+6XiR9/vOnc7Sf17S/Fdkkwg4Fi84udu6pdp6nOLaioijA7fWH8jROmJpaUlJQ/rUrftyJJVczCtLnTD65fv14nrjq3jt4fjGABQCvHlb0UQ1RUVMhfWnTM6XSaNS5GKkv1Gsn6znd+4Fv6y9/1HzVq3LlVRLOz9hvbtn7UrHF15nE2YCTrhhvKR7KcDgdxBQILAND0cWWvc5V9YHv2ow/96PimDWu/rHXF9zoiy+OJEwYMGhGjCXpMhn36nQqRVZOmjKuGRta8tOeTb73lFiklLdNHXKEj4hAh0I5xiLDtGz/+VmVOyi97C2JRfG1x9fUiomVlfr/gcDiFtPQl8eMmTE4sLC606qRydFzocOHAwdfJ//nqnwb5/Xkuh+oURd0oTpk34+DmzeurfVrwjju+Ic1Lf/6ynNyiJouryo/zwocL7UUoon3u0nBEc/j9QZW46nw4RAgAuGjf+e431PiujuhgMFLrCu32Old2XNnC4VDd5y6sZSTr+9/7tlc0g05RkAz7RMim1TAZmUuT+/YdUG1i+bfuvieuNKBdalSZ89UUcXXmcV54JMs0DaOwqCwqEAgRVyCwAAANM/vpmYFd2zcd6HpJ14gdVTXFVdV1rup1gugqkRUVFSX0uCw5TjPOr6sV0SKm6nSoXo+n2uN67ZUXCyPBotMOh0Nu6riqb2SJomDHHXEFAgsA0DD24bGHH7y/9MCeT7ISuiZEIhFNuVBcXUxkDb1muKtb90vF/lcMiQ6HQueixOlyCXv37irYu293tRXbP/poo576zIxDohDJVVRVtj/h15RxVTWyVnzw1iHV4ah15XriCgQWAHRi14+b5Jozb2m0qjjrfR07oh564P7S/V98crBf/+SS/VZs1ef0N/WNrHnpzyc9MHNut7KyModQYURIURSjIO9kQSgUrvH2N23aZKY+M/2QKut5gmQ2eVxVjKxfLs7IK8g9mWMvRUFcoTNgkjvQjjHJvWWNHDnemTZ/Sb/omDjXqvfez5qf8XhhRAvV+/put0sYMXK0tHXLJiMQqH/HqKpDSM9YWuvEd0mWRVVRhFCF0SvJEg5rpb94+N69X36ZdcEX+ttuu00yTFF57923w82x3ex1ruYvfC7muhETE/2BoCJwWBBCx5/kTmABBBbqHVdL+4qy4ImEw2Z0dKy5ZtWagw2NrItVV2RVZZ8SZ/u2zUeffPyBk6253VhEFJ01sDhECAB1xtUYK65eKI+r8sNyViSUlBSK4ydPSE5Je6lLtC+u2R9DXYcLq/7jWZJl7YOVbxcSVwCBBQBtNK7skSupPK4qNIwZDJUp198w9pJLuvdokdfS+kaWfcgw7/Sp0o8/3hRsre1GXIHAAgDUEVdKlbg6u+CnWDpn5kOHsg58YbTUY6oaWULNkWXKkuJK7N3PRVwBBBYAtKO4EvxnVlNfF2rpx3Y2slatePuQ0+mqFiiGrpveqChXxsIX+9V17kLiCiCwAKCNxdXaUGs9RjuycnOPh2RZqeX79T9BNHEFEFgA0Onjytandx9h6h13XxoMBmp9HddaMLKIK4DAAtDBeb0e4c5vfc81a3ZmvMtV/wVB20tc2e66+wfRHq8v2rBc6OdaIrKIK4DAAtDB9ejeQ0hLX5wwa96iK+6487uJP/zR/d6OFle9e/cRJ940rbvfX1Zpgrssy4LT6bTqxmyxyCKuAAILQAfm80UJt99+l/ryr/+UNGzEhMScUyeVwuIi8Y5v3dtz/PjJYkeJK9td330k2uONrTR6Za/cXlpS7D+wZ8+RKI+3XieIJq4AAgsALujJmfN9KZkvDPL6ohMCgbLyxUANXTe8XrfvJz+f3s3hcXeIuLr00j7ipMkTegT8pZUCSnU6hXVrVp1+9Of35mzasO5wXSeIbmxkEVcAgQWgE/h8+xbNMHRR0+xIOt8VAb/fvPSyxB7jxk12tfe4ioryCo9Pn9HF6Xb4Ko5emaYpuRyOwMb1Kwt0XavXCaIbE1nEFUBgAegkVq58K7Dmg/ePutyeyocDrTf/YEmpMu+Z+ZdeMXBgu40r2623TpMn3Xh7DysaK13udLmEEyeO5Bw+fFC3/7uuFd8bE1n2CasXLCKuAAILQKdQUlIq/Ndry/JUWcq3okqu+D0rMAxTVrt845t3x9j/PWpU+4srO2zu/Pb3L8krLPBYUXP+MYuCKJlm8L9/+3J+fn7BuYubK7Kemp0SM+aGW4krgMAC0FkcOLBfWJg5+yuvxxMSKh4nFOxDhWXiyNGTe/zwRz/zzJq7KLk9xZVtyi1TXYl9B/UIh0KVwsXpdErHjh46/c47y7Wq12nOkayqiCuAwALQga1buzJ06uSRk25P5UOF9pwll8flve+nj/Z3OF3tKq5s+XnF2q4de/KifD7D/sTgmUtNUZa9wX/88+95tRVNU0fWc4syijaue/dgXFycYZpnIpa4AggsAB1cMBgSXnvlxdPBQKD0fIh8HVm6IQQCZYrVWmZ7iqvycFy3Unvoge98uWnD+/tMTSx2uTySqjrkg/t2576z/M3Iha7blJEVCASFZ2Y/WbR54worsmJ0VVYV4gogsAB0Ah9++L7x4ap/H3N7vDW94be7uDofQmFhztMzSh956J79W7eu//LynpeV/P2N3+RqWlmd123KyAqHI8KcWU8Wfbxp1SHd58whroDqRNPkfxNAezVx4kRhzZo1bIgaXDJwoPCr117vGxUIxemmWePpZOoTV/c//oRnaP+rfUePZgffefutiCAauio7I+FQmbFr985We3726YCuvmaYtO3TT4xgMFjv66mqQ0jPWBo/bsLkxMLiQnuOfA3BaQTPbJP1gQvdlj3xvluv3sLhffua5TkuW7ZMuOaaa9iZO6gJEyYQWAAIrPYoc+Hz3nHjb7uitLTEHq2p9GInSZJoZVcgI2XmBUeuXlj2X71GjxvfI+APGNaNGKZgaqri0LRwIPLJ1i1BRVGDfn9B8K9/ez3s83pCO3ZsM8vK/G16u9Q3slLnTj+wdcuGYGs9zs2bNwsjR45kRwaBBYDAaksGDrxCeOW3f03y+4MJ1mudXvG1z+XxaOlzZ+xbv3ZVraM0/fr1F5a++LsrZNVZcWFP+3VTFEVJcLnPrF1qBYp9yE2LsgJr547PQsXFJWV7ywr8n7zx10DYCrHdu3e1x8iSTUMvS5/75P7Nm9dFWuMxrl69usOPcqDjYg4WgDbr+utvVlJSF3tUVbmo6+/Zs1fIzHjmpMfr1YXKyzaYVk4og8ZPuOANq063wxsd56wyKd48sw6VaQQDgfKvQMBv/ynn5Jz29urTt8vVQ6/r9d2xNw1Y9vL/Hfjr37ze/4EHn+jS1rZt1TlZQvU5WboVkd7nlr5yecUFWgEQWADasREjJknPpD6XeMvtd12RlrE4+mIj6/jRg34rF4qsKKoUELquidf1GZjg8UTVet0f3nOv2zQNZz3vypQkyYiEw3Zs6XZ4lZSVOiKmGXfFoMFRbXEbn42sdatXHnI5y+e1V44sTdN1U4i/9//8JIo9EiCwAHSAuErNXJqsqFpcXu5padyEqUkXG1l79+wRlv/7jRyPN6rSIbBQKGQOuGJQzIgR16u1XTe2Sx/F5XIF3R6v7nJ7JJfbXf4lK4pkWj1VNUiqEstPE2gaYZ+ztK1uazuy0lKeyDt14ugxh9NZ7fnoui46nDEx7JUAgQWgHRs+fKKclrk0yY6rSETT7dOxFBUXKY2JrDf+8deS/JLCUkk8vy6WfbthLeyYfOMtcbVdb8nzafkP/+z7Xzz+8x/v3bJh1d5d2z87/PHWjSeLC/KKor3RAbfbY5wNL9k+Y01NwSUKxlv//mewLW/ziBYRXv/L707LihSqKRojetjJngk0jMImANBWXHXVlcKyl1/tWVxSlBCJGJHzjSJUiCwhOy1lVrEVX/W+3SMHs8yT2fvzrxgyLDoQOD+nPRwKmkOHTYjr1euKnCNH9la73sGsnfaol31H2s7PP7UvKrH/X/duPYQel/aUdUN3TJ16uzP+ksu8Pa++2tvd4XFpuuGwriQFg0HTNAxRkeRA0f4D4ba+7Xfv3m1ajVjjchZOxaWxdwIEFoB26vjxE0J21me5yf2HRefl5TrtOU01R5ZpRdbsBkXWqpXvFg66anj469e98sOFhmGaUdGq57prr3RagVXvRUZPnjphf9kT5wM7Pv/ULrbCHkMGCz0cbiW++6XOW26903fVoCE+Z1Ss119WGAmE/DU+UHsdqcsu6ylmZR1o1Y9zq6pH+I8fPx6nRyIuocpyFrIkC7mnvypi7wQahkOEANqM3Nxc4cGf3Vd6YO8nWfEJCSHDMCq9Rp2PrNusyFrYoMOFu3d/HhYMraTKZHdTNwxl8s1TfY197Cd27Ra2bftEW/nOm2VPPHrfyccfu+/A9Ed//MVf/vTa4ayDWdV+3uFQhYWLXoj97X//Y8CI0eNa7RCc/TgyMhf7Jkya0jMcqtyYoijJwWBpyZ//9Pti9k6AwALQjvn9AeHhB+/3H9hzocgq+Xokq/6RtX//PmH5m2/mO12uSpdbgSUYshzj8TXtB+Xsta8+/XRT+A9/+F2wxrha/ELM8NGTE4PBSIx9eprWiCxVdQopqS/Gjp14Y9/C4tOyUGEtLHutr9i4mMi2j9cdPXz4MAsmAgQWACKrZu+u+GeZLMsRocJE7nAwZA4eMszbJzG5RaZMnI2rUWOmJBcUFMq6FtEkUfK0dGSpiirMSV8UP37S5OTCgiLZnvR//rumGB0dJ6xZuerw/IyUMvZIgMACQGTVShaNcDgc8Fc6TCgKpqlpznu+93/cLRtXBdLZqLFPtNySkTV06DBpTtriHpMmTEksLM4Xq8WVz46rFdmpKY8XBAJBdkaAwAJAZNVu544dwo5tnxZXPUxoWr2lOH3NGli1xdVZLRlZ37n7R9477rj7srKyMqnyKXLOxNVqK67mZz6Zr2kRdkKAwAJAZNUdWaFgUZlYZUaRrmlCfJdob5cuca0SVy0dWWmps0tWvPP3fbpulrjdHtk0yzdjpbiKEFcAgQWAyKpvZP3lL38NKaoaFszz594LBUPCkKuGuvoPuEJs4bgSq74Ot0RkhcNBYc6s6SVLn527LyfnyFFvlMeIiYknrgACC4BNlmUiq4GRFQyWhIsKcsOSLJ+LKUkSzdLSgKOsNKS2XFyZosPh1twuX5kkSS0eWbbVq1ca937/mye2bVm7f/m//nGAuAKajmiaHfvTtxMnTuS3jA5r+/btQmFhYbt87C6ns7yKgsFQg67n8biFV179naffwOv65uVWXoy0PFusW42J9mnr17ydnZYyp8bFSBcuejlpxJgb4u0TMp99LXS73cbPH/jBnj17dgdaIq6io7sYK95+7+BHG98vfXJWWrKiSrGRSESveBuKqkqGafjT5s7I2rppfaiz7d8d/f0JBFb7foKiyG8ZaGPs+HhhyUux/rDgmTfrseNWWLRoZC1a8splw4ePubRCYAluj1fasmHt3jmzf17SEnG1ZtXq7MyMXxRGIiFh1Kjx9vkXk0VZaJLIGjXuRuUHd39fmfX0z4P2yB+BBbQ8DhECaPG4suNj2IgJSVZY9Hwm7fnLVbVhR+Yae7jQ7fCG3V+fpPnsl2kaktMZ62ixuEp/rDyubJs3r9VT5844aOpCobUtKh33bejhwpETJ0mpC59PGj1u8hW//s3vPXaMAiCwAHRgToejQnwUSaWlxdrESVN6tHRk5eUcKdi5bcOBzz7edOTTrR+d2LplY67b6S5yuIVGDZk0KK60yud/3rKl8ZFlx1V65tJkKaTHHj9+TO038Nq+RBbQOjhECKBFREVFCZkLno0bPmpSYkFBYaX48EXHSKs/XHFiQdrMry72cGH/gdf1zb3IOVm2q64aJoRCYWHfvl0tHleVImnkeDl9fsMPF56NKzGoxUV0rfx6dnTa8Zm1d9uhJ6b/vMQ+12N7wiFCtGeMYAFoMcGg6bTe+pWq60CVFBcZjR3JytrzSVbXRny6cMeOba0eV7aLGcmqKa7KX+Ct2MzPz3ePvH68LzExkR0QaEGMYAFoMarqEOalPNdj/OQpl5eUFNkvPpVegBo7kvXq1xPfTzdiJKtp40oQnU6PtuaD1YeeWzSzqK64qqg+I1lzZj58QHCpkcXPvdK3alyV37kkS90uiT2ZOufxr95+++1292LPCBYILAILQL0jS7Ui6/kOEVn1WKFd8nq9Ramzf75/3fq1Db79uiKrrKykTFTkiNfhiY1oEaOmuEp7ZvrR5cuXt8t9hcACgUVgAehkkVXf099Y92+9CoXzMlJmHt60aVODX3AvFFmyJFt3aoqGpaPFFYEFAovAAtDJIqu+cXWWoqpWCYVPp82d0eSRVe01r4PEFYGF9o5J7gBahR1NmRkzT6z9YMVXPl+M/S+hSv8aauzE9we/XsKhaxOcILoBcSXKsiKZFc5zaNOsKDJFR9e0+Uv7jB49usH/6js78T3oDxVKVkB1hrgCCCwA6CSRVY9zC+qFeQVfxfiiw1Xvryki689/+a/DLqczUnU7EVcAgQUA7TKy6rMUw4a1Gw7NePzHJw7u3559ScIlTRpZ9lIMP/iPn/UKBoP2gzSJK6BtYw4WgDah9edkRWvrPnzr0KKFGUVlZWXV42qRFVdj63duwTP393+j+g+8LjknN8dR9f4aOiertnWuOnpcMQcL7RkjWADahNYeybLCyXHHnT+8/KqrrpGrxdVCK66ur/+5Bc/c332l+/d8crCxI1mdNa4AAgsA2nlk2X/v1rVb6LNP1h/Zt+8LvVpc2YcFixq2QntTRNYI4gpotzhECKDNacnDhfZldgDZIWQHkR1GjY2r6vfX8MOFdlylWnElW3GlddK44hAhCCwCC0A7jKwBg0f0EwRJ3Ld7a1ZzxNXFRpZ9WDDFiiulk49cEVggsAgsAO0wshYtWuq1XyVmz55ez7g6d27B7OcWzSxuyLkF6xNZ4WBxzht//+PxO+/5WS+vKXfp7IcFCSwQWAQWgHYYWVXVEVflLykejy+cMuuxfRs2fhBq6O3XFVmSJFsBp4RDwYjDMI1OvxQDgYX2jEnuABpt7KRJSsqCxZ6GrIheX8058b2BcVX+nh8MljlnpyzoP3LkOHdD76Ouie+GoZuBQIi4AggsAJ3d6NGjpZS5C5JumfKdK9IyFke3x8iqZ1x9HUGGIauqK23+0r7NEVkCi4gCBBYA4ip9wbJkU3DE5uXmSGdWRG9fkVXXhHanyyXKslz13IKGKEuNjqxd2zdmxURHB6ueu5C4AggsAJ0+rtQ4K350O0yKiouUsVZkZcx/zuqG6FaJrAkTb+4xL2NJT3tuVmPjyu2O1vd/sfdQOFhcYEWb3NSR9cd//c0vux1hweTcggCBBYC4qhJX56LAqpKA3+8cNeamS7t3v7RZXl/qiqxgwC/eMHaCr3v3HlJj4speimHj2vWHHnvkh3kLM2cfEoVIk0aWvc7VjKcy+hadLogWJdEgrgACCwBxVS2ubFaASKZg+Gc99fDh/fv3Gs31GGqLLMW6f1EwS2c/9cjBA/v3ao2Jq7PrXOmGJmzZstVIfWb6waaKrLOLiDojZpwpmMQV0AGxTAOAJosrTdeCGSlPZG3ZtCHQEo/n/BION18eCPhFO67S5s7I2rRpfbgp4qrqOlcXev523Jm6EbTvf8uW9YG64krh9Dd1YpkGEFgEFkBcWXGVPm9G1tbNGwMt+bjsyEpNX3rZ2HETYmY/9XCdcTXfiqvRVlwVXuQK7Y2JLOKKwAKBRWABaPNxdZbT6RJ6Xt5byjq4z6grruyRq6JGnv7mYiKLuCKwQGARWADaTVzVL8CcQub852JGjZ2SZMWVXMPpb/QNazccWpj5eGF9T39Tn8iyt8vmzesDnFuQwAKBRWAB6FBxZUtd8kv3zTdMHZifl2vHVZVzACpSbv7pr372o7tO+ANlTbZ97MgKlvkDb/zzj4e//cP/6OY15Xji6v+zdx7wUVVZA7+vT09v1HQCoVjpnQBSLcu69q7YVgUBkZZGUUEs64q6+qGuLuqund6LVCtCSEgHEiA9U9+8/r0XSJhJhZBASM6f3xjzZl6d+yb/Offcc0GwgI4DjCIEAOCqyVVkXBzWp0/fVj+XI/v28DSplOO1CoZqiIKohASGBL+8YOElF0jdv39/o6MLaR2je+Shp2N1EgaRKwAAwQIAAOSq9eVK6zZ796Mvo//92TfdJk+e3Krn883XX0vq8Z4IDvIrwnCcqPW04uZ4asToKZFJKUtbVLJkWVZYN4vD3IIA0PGALkIAAC5arrQIEMs63csWv5zzy8H9lyVXyakroxAr+kmqfIQG+p5NXDSz1WVDFTkscfEb3YpLKkIUWfY6N/WTEPOxmMU9O9flJi2aZxMEscWuG8hV84AuQuBaBiJYAABctCRQFIWdys8tbQm5wtyinyiLkqKaTlFpZWhyyutdb506tVW/EalCoyQvmHGyvkiWVoXearOT5+ZTbF4k6+VZT2e7XXatKxIHuQIAECwAAICLisBwbrfSu8+NQUPHjG/WbM6ecuWZkyTJklxmdXWa8/Li0MjIiFY9z9aULEmnRwpBaqEXkCsAAMECAKA9MXDgQHL1J18G3H77XRRJMi0mV+dRFEzR3/PAY6Fa7amWkCsNmqZxQRRdM2Y+a8vNzWv1a1QtWWFBAUWqY7WIZGnn98pr/4zW0zp/WQXkCgA6NpCDBQDtCJIk0fv/92W32B69w0Rech8/nlZZVl5Q9q93Vzny8zMvWa5U+dA+IzCtG8/ztjIZzXJq0uz0bVvXX1RXYWNydS5pXj6fNL/nipZ7mDx5Cpa6+M1uZ0rKQ2RZanZOVmPnB3LVfCAHCwDBAsECgKuO2WxC85a+7ndzv0FRbtalaNXJaUaHqwIjOx2sY8fW9SU/7dlSmXbkN8nhdDUpV1odJ5fL7jQaDQ6kEMHq8zUfFgRJ4i67tfypJ+7JKS4uuiblqqUkC+QKBAsAQLAAoB0zcfJtdFLqyriioiK6VqVyhKvQNIN0eh179lRO2cefvF/KOh3SrDkpUTip8xPEeiqRK7J73pyns4w6vfvlxBW91FvJ6Nn1ZTKZsQ1rv8x6dVmK9VqVq8uVLG36G/WaRxEgVyBYAACCBQDtj8ioaPzNdz6NIkjCX5GVBvuy1OdwmmEwmibdOFJEJ8ur0iTJ9clVkio+B/edE59Zs5dbJt82MdbhsCue0qZu0PrU43dlnjiRf83K1aVKVvKi+TZeEFD19DeaXIkgVyBYAFALSHIHgHZA794JlJ+vD9LrjJxOb9CiVbiWO1XnCweOyYLAS06ni7Y52YuSK411az+yKTJXrn5fqfnM0KJZeoPZMu6JZ83XulxprF37o7JwwQsnw4L8G018nztvkXnk5En4gqTlVXMLglwBAFAfEMECgHZCr169EEUb6RGjbjH26dfXN65HvJkTBB3Pcco5kWr8XmhIrqoZPWaybn7Sq3Gsy0ZqHx3nbzDcbGTKpj92V25GesY1K1eeNBXJ0uloHqcpnrOzZlmB0YKtCUSwgGsZEi4BALQPjh07pv3gD//xM69jmIopU2+nRo2Z4BfaKdrfaNIbBYFvtlxp/LRnm/tMYV5RcGjnrqq0SdV/AWVE+nbtGq1XBYu91uVKQ4tkqT9OqpKFakuWFsni3DyNWJ5RfwG5AgCgQSCCBQDtnE6dwtHKN97wDQwJj3BznNb1pdQWH7kJuapm6q1/pV6YndLL5aykqqNYNMMQx4+ln/l63ZrC2S8lRZG8cs3KlSeNRbLqfM6AXLUKEMECrmUgBwsA2jlhYX643uTjL4hivXIlydJFyZXG+nU/CpkZxypUqar57OA5txwVHeO3aN4rMZhb8m0PcqVRnZPlbzGexRr5pgZyBQAACBYAdDC0OlfLlq+K0ul9AiVJUuqKj+hOWjDjouRKQxTd6H9fri6hKEYbqXheOjBFViTaZbdZauckXaty5SlZ//r4nUKjUc+jepLYQK4AAADBAoAOKFcNFRGtlqtz4rP3ksSnsCCbVWTBVqv/XVF/b1dypaHVuZr4l/sjXE43jWpF/0CuAAAAwQIAkKsWkSuN9PQM9O3/Pis26AxyQ69pL3KVmLoyyoQof1mRQa4AAADBAgCQq9aRq2qOHPndhQhFQPV0m7UnuSKhQjsAACBYAABcCbnS9jF3bkq4m63bbQZyBQAAcA6ogwUAIFeXto8UdR845SeLQrsYLegtV6OIpNSVETC3IAAAlwvUwQIAkKtLliuhHcpVbHwf9N6n/4viy22BoiyJIFdXH6iDBVzLQBchALRjucJxHHOxDhbkqmmKCgrQ/k1brAaTyaMEBcgVAAAgWAAAcuUNxuj00prPVueBXDWN1VqBEhfNKN2xdVOexeKjqOAgVwAANBfoIgSA9ilX575B4Thys27nT7/sPrvp6y8q09KOglw1AUlSaOGi5f4JEyZFMjQqVuXqJMjV1QG6CAEQLBAsAGhzcuUhWbjBYFRvdqFi/94dZxYtnOvkeQ7kqgnJSkl90/Dzoa3st99+C3/lQbAAAAQLBAvo4HJV3eBr3dhKVTKRyWgSM48fL/3fmjVnt29fx4uSC+QKAMECABAsECwA5KqRhHacYRheMymWZSn1r5NUuwyoghRMRzM4jhm4orP5RR9+sKJk+/atEsgVAIIFACBYIFgAyFU9pRh4gXO//mpS9vARI7FRCRM6Y4j2cbmcmCzL9Uxpo2B6gwF3O13OPTs3nP7qy88qcvNyQa4AECwAAMECwQJAri6Ij3edq/je8WjylGl+I0ZN6sTodEaWdWmSVedmP5+fpdgqyq1FZYVnQ0K7BDOEPkCQQK4AECwAAMECwQJAruqtc5UwZjzx8PRng0JCuobIssJwHCert4TXTa+o/wicxBmaVjieR7IstbvpbwAQLAAAwQLBAoAWkatqSAJH4yZMoqfd+WBoZFRcoMPpJJEiS/XM01wHkCsABAsAQLBAsACQq0agaQqlLHnNMGDQmE4Ywv1crAvVn58FcgWAYAEACBYIFtAOGZ4wlpw/LyVC1aIWn1swPr43mjBxqs+AIWM6GU0WoyxJCsgVAIIFAC0LTJUDAG2QESNH0RafQAvP83JLypWGVs19857tVpKmBfUvGAZyBQAAAIIFAB2C5alJru2bv8vy9fWR1C/xWEvJlcaAUaPx11a8F2NgDP61uwhBrgAAAFoG6CIEgDYKRZEoOXWZZejIiVEup5uWZNHVEnKVnLoyCnOLfoIkQikGoE0DXYQACBYIFgC0mmSlLnnNp//AMZ3nznk6D+QKAMECABAsECwAaAF0OgZ17twNy8nJavbNCnIFgGABAAgWCBYAtCAgVwAIFgCAYIFgAQDIFQCAYAEgWCBYAAByBQAgWAAAggUAIFcgVwAIFgCAYIFgAQDIFQCCBQDXElBoFABaCUanQ9HRMVd0n4PGJBBJqa9H1idXOEFgDqfDlTj/eZArAAAAECwAuPagKBotSlrR+aOPv4ocNGjQFQmjRkZGoJSk1zpRIhbIi97zF2qQJIkVFJ4o/+XQPpArAAAAECwAuAblKnF5p6HDR3diOTkwOeWNCFWyWv1ey83NQ4kvvVAsiryNommi9vM8xyl9el7XKTX17QDtGAEAAAAQLAC4puRq+Jhxne12myKKgkQwhsAnps/qrNPpWn3/+/bt5pIWzMxGsuwgKaq2ZCkutwsbMWZsxKJFK0CyAAAAQLAA4BqTK5tVy86tytBlWZccHh0XPH9BivFKHMeBAz/xSQtmNChZNrsVgWQBAACAYAHANStX1VLDul14v+sHhXXt0vWKHA9IFgAAAAgWALRnuapCliTZ4uvve8e0x3yu1HGBZAEAAIBgAUB7lCuv0YMulxMbO358p25dI6/YfQeSBQAAAIIFAO1GrjAMx3SMTlCX1EiWrGK0mE1//dv9/lfyOC9JskiQLAAAABAsAGiDckXiOCGY6KJPf/wyk6ZI2VOyWJcTjR47Mbh798greu9dlGSNHhuRmLzCn6YpeIMBAABAsACg7cgVpspVQJBf0QeL5536/K3X2LwTORU0w9TcZ1oUy2AyGqfd+bDPlT7upiTLWiVZCRFLl77uQ5IEvNEAAAAgWADQNuQqWJWr5AUzTq5fvx5pM9UUnz5RTNO0VlXdI4rlQmPHjw2OiIi44hNlNiZZGIaUSqsNv3nwmMh/vvehyWw2wRsOAAAAggUAbUOu1q5dW7P8889XO2WFr8Q8Zh3XoliM3myefOu0q2IwnpJF1ZUs2WqzkdffNDJy+IixenjXAQAAQLAAoE3JlUZGejpa/8PXpYze21WcDjt+132PhfW77nrsapxPtWTJSt1IFo5hcklxie6p5+ZGDhoyioR3HwAAAAQLANqMXFWzYcOPDgLHWaQo5+43DCOMRqN0/FiG2+nkmt4/yaBbb7tXP3HSrS0qO5pkJc6fmSPwvAvDMK/PAkWRJYokjSmpK7qPHj0ag1YAAAAAggUAbUauNPJysqSs9KNWncFImIwmzGDQlS1bsiB9+iPTTmZnHVMa239CQgL+6ZrvQucuWNxrytQ7Alv6/A4d2MOteueVnODAIF6RZa/PA0EQJIwkA554enYYRTPQGAAAAECwAKBtyJWGy+VCZaVnKggcle/fu+n436ffk7N5w/cuQRQa3feTTz5vmjV3SWxwaOduFRUlRHBYuH/XruEtfs/+tGs7+9uR/TmmwECxJsp2HjfLyoHBXTrNXpjiR+DwcQEAAHCxYIqitO8TxKB3A2hZudIalZ+PsXhZ6txTTclVNQaDEXXqFIays7MbfR1NG9DohCn0tL9MC43u0TPIxbpwLSlee85oMmPffvW/7LffSqxs6fMlDHqUlPqq3/DBCVF2q00b8+hVkd5oNApJC2ek79qxlYfWAVwp2vvfJwAECwQLaHeMHDmG1AK4O3duES9JrtQmpcqS+J9P/nnsww/fazHZMBoNaMhtfyEnTbo76LquUcGc5GR4jpc9900QBO5yOqx/f/r+rNOFBS1+41IUieYnLw8dOmR0V7eblb3uIxwnjEZd2RMPTcvJzMyEBgSAYAFAE0DMH+hQaBKx7NWVhgVJK+MeeeL5MIZhLkWuqj7zWdZF3X3vo5169ux12cdDqmI17O57qdc//iY05YWFcXFhIV3trnJKlSup9r4lScK7dOvOhHbq3Coj+wRBRO98vOqsiyFK6FqVRhVZliQR+T/w4JPBer0OGhIAAAAIFgCclyeSRImJKwKGjZzUg+M5Q/fw7v6Tp9xKXYJcVX+rlgnaGHjb7X9rdjX2+F7xaMKkqbpVH67pnDxzUc8I/+BuxaVlOoEXJC2w7HWTqhiNJtyk05UsfOm5zMz0o0JrXaPSzEz06otPnVJlzqnt1/M5l8uljB4/pdPwkeMg4x0AAKAJoIsQ6BBMmDiNeODhhzsFBXUOcXPuKk/S6Q1ERvrvJ56d/mBRExM34xiOKbIkKZ7So0jIPv3Rv2UUFOZd1DH07h2PKMZAjRyZYJ56+53+qtKZRUGgOM4tqzup70bE9HoD7nKzzl1bt57esG5NRVra0StyvZYsXm4aPHxCDyfrwLxFEyPMRn3pk4/flZuefgwaFtCqQBchcC0DRQSBDkHsuAn68MgeoaUlJQp2XmZ4zq2EhUb49+jRu/ivdz4QWp9cEQSpypVYbHe4DEa9yVSdcK791Bv05keemOG/fu2aCt5tV/48ckF+4uN7IUqnx2URUaGhXahbJkw19ekbb6Z0Jr0oyIzTxap74bT9SKjOlwAFYxid5nDu06fzi//vw3dKdmzdLF3J65WSutCx+t89T4eEdevCulwef+UUScEI/6m33VmWnp5khZYFAABQPxDBAjoE3cO7Ye+s+jyOIJkaSdLACVwpLS22hoV08eV4t1e0proUw/zZT5+I7dnPd9pdj8Q47DbZ4+s1Ruv0kkGv5zjWLv78yy+iNvhO3Tp+40034OpzpCRilPpCSkEK7mbdigaGoYZuOozR6XCKoPn03PSS/365unj3xvWCKMlX5ZqNSUjAZs1dHCcruEnxvGbaRZMFx1OP35Vx8uRJCDEArQZEsAAQLBAs4BogZfHrwYOHJ3TXajt5LidJChdFoc6oOc86V93De2Kr3v8iBuFuH1lW5Fr3UFUhdJ1H8rfb7UZIVqrLHTR8kynqrtS1Gb0BSZLozsk8Wvb9d/8t3bZ1Ey8I3FW/Zs/NmGO+Y9qDsQ6H3Us+jSYT/uM3/8lZ+frScmhZAAgWANQFktyBDsO2zRsqCIzitS44z+VNyZW27ER+urJty1dFFF1nBJ1mV7I2zk4Tt+qHNteMKldyA3KFaf1/Or2eMJrNsmhkrOt//Dpvxt8fSn9q+v2nN274oUauzGYT6hnX66pdsw9WvW3PPp5WSjO012cF62LRmLGTQ7t16w7fYAAAAECwgI7MoUP7hfRjh+00wzQoBY1VaN++fZPDqNexSq1q59Wrnn/UWaZ+CcdpmtGEquphMppESeTsvx/55dTSV+anP/vkfZmvL08qTTt62Ksml8GgR++t+sj4r4//Gztg8LCrUhtBi8R99cWnZ2lK7yWmsizJBrOPcdqd9/pBywIAAKgLJLkDHQbW7UR2h9OB42QAQvwlyZXGifwcKTMnrSIsNFwv8N7r4wQm0oxeK7CAV31xwRRZFSsZx5BMEoSYlvYn77I73AWFZxw7tv/octgqueychqu6V8nVex8ZImOvj6qwWvVJqSvppIUzsw7u23PF+w137drOTcs4WhoeFd2J57iaZHvW5UTDb7ktaM3XX1ScycuFvhwAAADPvymQgwV0JBLGTjW+vHBxT5Z1eTV8LVsqKNCnZHHi7EbnFnzw0enmBx56Jo51uWq6FWmGwXOyj5549x9vWNXWRqi3FFaVe6UKFnZOsIS0tMMKx11c4fdquYrpeVN0SWkpg+O4TFIUrigye7Uka9y4W+gFSa/3stntJPLMxTKa0U8712csXDDbCa0LaGkgBwu4loEIFtChOHPmJIcTuCYoTLUoyLKMd+0S5lj52qImJ27+5eB+/sGHn9FMiapeX6vHWVbhII4c/u2yxac+udKWi4KgSZYWyYq5GpK1e/cOPiPtaGV4TGwQz3E110gQeTysc0SA2Wx22u12aGAAAADngRwsoGM1eEwWJYHjMI/QplYWy+nE5D//zGny6zKmYLwkSJpgeYVGMVnSt5ZcVaNJFobhVZI1YPCwK1pN3e3mUHHxyVKaor2OiXNzSmzPXj7hkdHwZQ0AAAAEC+ioHDnyJzp4cL/I6HRet8G5mWHEJtfPykpX0o7+Lnmu72bdaOCAAVS/fn1bTa7agmS9/3/vO8sdlV5T6Gg1vXheYEYMH22A1gUAAACCBXRgCBz3qoquBbN4ScB5iW/yfuB4HrmcLtkzt0+ryKDTG7WRgq0lV1hbkKxTOdlKztEMK11rgmxJkrD+/Yf5+PvDgEIAAAAQLKDDgqE6oSoF18YQIvzi7gdMqRNd4tSlPLr0ERVNyFVVAVNGp5fbimRt2fyDDVXV/boAz3EoJi7eHBPTC0aUAAAAgGABHRUZKVJd6aoqqN7k/RAREYniesZTvEeZBkJdrZJjJavAXdKQpyblCscxs5kqzMs+nMXoGLH2/Xo1JOvM6XwXieNubeofDwtUnCxLW+12BloXAAAACBbQURt9Qxp0EUPCfXwDSf+AUEqWpJoX0wYdyjiwX8j/43CLylVwkE/hK6nzzj752AP23dvX5pgtZuFqS1ZOTpZy9M/fWYbxqnuqaPMtTp44BQQLAAAABAtob5AkgfpdfxOx+JXl5rdXfdJ1QP/B9Y/sI+qWJ1FwTEIE3uSsyhznpiRJpFEtvdDp9GxLy1XyghdPr1+/oWpKw2WLk+xbN35z1SXL5XIhN8+7jEZTTWV6vd6AG4xG1D06Tg+tEAAA4PzfJLgEwLVORGQk9sT0Z41+AZ38Y+PiLYqsqL6jJ3mX23Xw0L464iNKMlVLrzBcwbR/TQrWmDG36hRN0RDyem1ZccFFCdalyNXatWs9jlmqkiz1f3MSbrkjym6zU57HcCXrZKnnWrFv/x6Zd/BiUJBJWrfuW+nEyZOKzWYVoDUCAACAYAHXMAxDo8lTb6MTxt/qFxra2d/XL9AoCALucjq1rjtZQYrES5JR8wHP9XQMg0xGEy3Lck1CtqJgiCBkmcDlRgXLYrGg627o4yvJXjnyGEmQwnfffdukYDVXrtqaZC1bkqhttxhaIQAAAAgW0E7o3bs36h4epf/rnfcFRsT08hcEkeE5XnE6HJpo1CSv85wb9Y6/WR8d3RdlZ/9Zs3732BgUf8MNPCFiPKHHCW0GQlmScGNICKL8fBrdd3h4FBnbo7fZarMq1WUaVEnCHLYKt8C5uNaUq7YmWQAAAAAIFtAOiO8Vj+69/xHj4GGjQxBO+6pSRdqsdm2uP6m+18uyopgtOr3BRGsCUtN1dSIzCz3/+H35pGohiiKTt0yYRIV1jtKXbNsgZ/72e6PHMCbhFjMvCgzmUaZAqwn1yx+HKzOzMpstV4xOh/n66JuUK5AsAAAAECwAaDGiomLI9/61ppuo4H4Op5NQFLdW6FOqr+qUoii4Kj0YgROyxddH1NEU4SlYbo5DaUcPa92IWp0F/s/Dv2mLrU0dg06nQ7163+Ane/ciYiRBSNu2rLM2V67MFh9s17ZNhV+s+dfpY2lpF31NLlGyslXJckNLAgAAuHLAKEKgzWPy8SV5Gfd1Oh2qUimSVnfpglFVddNpo9kITYIC/PydZwryzuzbuynzqSfuTs/OzmgRsRg6dIw+tke8r+dEx1r3oMtpdWZl/s42V652b9tcmJo855LkqrZkNTq6EOGGZa/9MzqmRxx8mQIAALiCwIcu0OZhKILT6wi3y6kYPeQK0zKXjCajZK2w2tOPHrGtX/eN1W4rd6WlHVacTleL7V9LjL/z7gdCOIHT7peaLkltapwfv/uhJD//RLPlKiV59mlB4Jt9bE1FsvQGvbJ715bKojNn5Iv+UGBodFP/AUTm0aNSeUUFNEAAAAAQLKA9kp11XDl29E+2a3iMkec5jKEZnKIZAZOE8n17NpV88N779vz8zCa3o82V9+TTLwb6B4WSioAJvr6MuH7999Iff/7hzsvOanCm56Gjxuhi4+L9HOcS6atQFAUz6Gn3np0bbFdLrpqSLJPFgu/csen04sQ5hYLQdAWF7jGx6MlHppv8Q7oFDRw6mJz+wLTsAwf2K9ACAQAAQLCAdkh5eQWqLLc7e/UxhwhuE5uenVb+9VerS86cyHUfTTt60duJi+uB/nbXfcHFpVYzhp+L8szqNwA/cGhn7ovPPF5S3zo6nUFd55Fgnhc0abkQvWJoPCMjvzT/RK54NeWqXskaf3sUUnBm+7bNBUuS5xSKjcgVca7cBTVh7BTfwC7hAYE+/iae54niwhKuwmrXCqpCgjwAAAAIFtBe+ebrNXaECflrf/yhbN/eXQLPX3oXoNPpxspUWeM4TpOeGvERWKHBKM2w4aP1sTG9Am12q4zVZNUrmI4xc5998mqpJn9XW65qSxZh8cnFKYNxSfLsMw3JlTYqs0u3GP3td98fFNMjzhfxIqNeF2R32LUCYaJOb6AeuP9hZv68F0GwAAAAQLCA9sq+fdtY7XE528AwCsNxCqsdlMFxsl7B6tK1C3puxpwuTtZBeJZmoGgaz0w/UrJv7zrhcuSqd98+KDMzE/HulnMYTbJSk+fbFAXZ5HrkKjIiEj32xDPmQUNGByGc8lUFjGQr7TLCzgnnhYGZCqJ0FoP6PzZofQAAACBYANAgsizi2qPKHjxvAgzVK1h/mfawn9knwNdht3vlXpmMJvd3331S4nY7my1XN944GPvH+x923751G7s46aUit7vlkvIlm73OsvDwaOy++x/0GTIsIVhnsFicLgeOFO5ccdZ6yl3IkoT5B/iaLRbLWZsNHAsAAAAECwAagBMEQkEYUXu5KNad5Ln/oKFkwoTJnV1Op9dybWLjs2dOFO3euUNorlwNHTqcXJj8RkRlhctv5KhbxJKzhc633nzF0RrnHBkZg98x7T7/kaNvCTKqZsiyLHI67V5V72vkUf1H4MS5OmIYwROIZkNCuiCb7Rg0HgAAABAsAKifuLgeJMIwEnlFsDC0ceN/64wgvP+BJwICA4KMZaUl8rmXY1X1ttxu1vGPN14ttdvtVXK16hLkysdkRMNH36Kf/szsCHVzJlkWJZutghg38bbwA/v3Hj94cE+LTZYcERGD//XOB/xHjBkXYjAYjSzrUpxOR/2lGhQFU6UKpylGqnBa7b8dOFi+Zd33lXv37uJFEeZvBgAAAMECgEYYf/udlOpKmLdgIenM2bo1ot58fXH57XfcK06ecluAgpFmQeAIiqKUbzd8fXrnzm2SJlfvqnIVfQmRq/lv/1OfcPPoHqfPnKEEQaiKIMkqNEEYXnp9VdfHHr49tzwr67LOMSoqDvvb3ff4Dxl2S4jqVapYOZEqVvVOJ4QTOM5QDMINOndG5jFrZUFe2ap/vec8mZ0JjQUAAAAECwAujsqzFbQS7pVuhWFIkSiSrCMgOdmZworXEss2rPtvWecukca77348MCg4BH2+6h+V1XKlRa7KLmG04Bdf/I/v3SXeRVGkr8BfiAzxkiSZZSlg7vQXranJs8rs9kvvLYyMiMRuveMBv7G3TA7RG/Qm1uWs7gr0RhVMLVpF0ZTstLns6zd8U7L1p83WtKOHRbEFi7MCAACAYAFAR0EWmTq+oWCSImMNVjlPSzuqPZy7d+1whoV1Q06XA733wepLliuN3zavlVLsFXkLk9/ooa6nlz0mNnS7XMrIhPFdd+7Y6Fi/7ruLHlYYHx+PJk35i8+o0RNCdQazhWVdyOmoK1aKKlaMJlYMJWSlp5WXlhSUvLfqPfvJE1nQLgAAAECwAKB59O3bB908sL/ezV6YmlCRZcxo1Et6o15san23245OnkxDH63+T7PkqpoD+/cK3/+6K+/BhKk9yssqcOz8CEZtCqCioiJ6zktJXfJyj+ekp6c3ejwURaPRYyYYXpqXFIYRlB/rYrH6cqxkWakSK0ZHu7PTM8r/9/Xnpdu2rnV7RtAAAAAAECwAaBY4yRAUY6DdbgeqrhdK63Qo7c8/+OzMtCang2lut2B9fJq8wNlJxk8PGza2q5Z8XrMRbWQfTvlPmnxHeXr6knonASQJHI2bMIn+y18fComMigtSpUq9hzmti9PrHLRyElq9LovJyBaeyilZs+bjsrU/fCfwIFYAAAAgWMC1jTb3X3R0HI1hmHT06B+S8yrm+HBujpZ4mcY8al6RJImKis9yntXYW1uuNNxuDq1+/62igf2HWNRt+Xh2FbpYJxo5ZkqnX34+YNOS6T3XmzBxIvHgQ08GBYZ0C5EVhXE6bep6mNdr1OXaXI2Y0WBwnz6dW/LJh5+X/vD9t6IT8qsAAABAsID2QfeIGOKfH34RLXJu4sifhx1IkWwb13/r+uP3w2xu3vEreizjxk1jEKZoNbA8i4YivY5xX0m5qubEyZPKzwd3FwwdOdmkilJN8VNNtnR6veH5F+YE/vLLgSKH40IdrtFjxhu6dO/RrbKy4nwdK88KoRhG07QqVnr2TEFeyer3Py9bu/Yb0QFiBQAAAIIFtC+GDRvnU1lZaWRdLtQ9MlpHEETQc3F9BJvNxh4/lm7dvPnHyuMZ2ezJk0db/Vi6dgsz1O4H1PTEzVq5Ky1X1SxOXeR6J7RbUbeo2M4Cz9dEorRuw+BO3UImT7617Isv/lOTH/bx6tX8zf3HaMdLXZBEhOl0OlyWJbbgVE7xlg3flv34w7cgVgAAACBYQHskKioSmzhlagjPcQjHMFkVCKRl/6iSQ5AUab6+/02WmwYODCsrdTqKi45X/LRns23zxg1caWlpldgse/UfujWffykeOLBFvNxj6du3H7r+hhtMrNtrKkNMUTDhk0//zV0NudLgODf6/vs1xfMXrQgsLSultET3qo2rP1k3rxs2Ypy/KljFNTcroag7ErWd0ecuJUZYLCYhJzPtzOeffVi8fetmQYGmBwAA0CbA4RIArcGdf5uv9/UL0jMMU5VsLctKVVvDqgbvybKbZSWn044bTIpPfN+bIm//ywOhkiSdE5tVHxkHDR/Tc1HKiogB/UdfdhuVEUYRlE6naH2C56maU9DA8L4WA3+JcoVaQq6q2bVzu5CVcbhYq03luVwVUyWsc1RAt64RNcsz0tOVw3/8xun0BsJgNCGDni5ZmjI3/cnH7yncBnIFAAAAggW0PxhGhyJjetT8/u3X77rnzHgs/ZcDe3ILTuWWBgUGuHR6PVJli1D9qrrdKbKkyEiWpcO/H6xw2G1VchXT88boM4WnSYIU/ZKWvBl5uZI14K9360RRZDCE1TiIKjTo6NHD7qys415eEhgYqNW5MsXE1S9X2nob135XkJQ487LlSkObcufTTz8qY2hGQB5JVZqE+gf4mcZNf8pYvYzjeSQpyEURyLp/z+bMZ5+6L2/Txh/dvCBCAwQAAGhjQBchcNlQJIUWLFwROGTkKL95s57OPXBgl5Rx/Fc54zhid+/axhqNhtI+fa7H9T6++gcefNy3Z0y8j8PpNCiKgguigM6eLbJ/uvpD2zur/lUlV2VlZTRBELIgCIiikH/S4jfQ0tSX8/fsWd8sk7guMMyiNxiJmvoMKnqDAa+wVjhrjyDs1CkMRcfcEFhptRpUuapT0wBTIQm8RY1mz+6dfGb6MWt4dHSAFrnyFKph4T18v/H3s1cf56p3lpcgJBVlZWZCwAoAAKANQyQlJbXrE0xOToZ3ufXlyn9EwtgIjnUZRyaMN2RmplkLC07VRH40USooOKXk52QJWzf+YP/j10Nleoawc4oihXXpTh8/8vPZkaNGKH1vHB6jyZVn1EiSZOQXYNFxrLViz54dzSridOMNfUWnvdKWl5VtO3P6pKOgsNBVXFToLi0pKP9p9y6vbRYVFaMjh4/aR42ZzJAkMsqy7CUykihi8X2u842KihV279rq8qiw0GwkSUTdY2NQr7g+/qIoKp776tK1O3bo4N7SwsJTVcvKy0qV8rIyaHhAh6C9/30C2jeYR1pK+zxBDIN3uZVgGD16ed4r/qPHjo+02SuqmhNFUYQiybbkRS9m79+/u/FID0mgAQOGEq8te9WA0z4RFRUVdZLJLRazvGPr97lLFydVchx/xc5N65bUuidxQvCvnpi5Gi1/y9fXD9uzc0t+4sKZJZpAXi5xvXrT76z6vJfbzWpR5eqbEtPpdcKzT92fkZF2hIMWB3Q02vvfJ6B9AzlYQLN57qV5pnGTpkRZbefkSlumyQhGEJakpW/G9B84jG5sfR1Boofuv5+RcWNkQ3K1U5WrxcmLrqhcaRw8tF1Omv9CrixR5Zo01pJ2pbKyQhk2cmx4curKIPX5y96fyWLi9SYdp8iK5zcCBSkYffff7qKhtQEAAIBgAR2EvVs3sOWlBaUkRXu1I0HgJfWbpzkl9fXoQYOG1isH2ki99z5Ybex7w7AYu91ONyRXqapcCeLVSeK+kpKVm3kcpR85zNG6WvNRq7rlExQE9ykAAAAIFtBR2Ldvn5Q4f0a+nsaKCYL0EhBR61YjCOOi1JUxNw0YwtSWq+rRgrVzrtqKXF1pydKS2M+eKRK16XtqgyEL3KcAAAAgWEBH4tdff1VWvLrwRFCQpQjD8dqSJWM4YUhZ8kb0gMHDqiTLZDKif6768JqQqystWapcybVzTjD1X27ZaQlaGgAAAAgW0MFYu3adkjR/5snQYL8i1bHqSBahStbC5BUxQ4aPZJIXv2KIi+9/zcjVlZQsSZHq605VNv9ntQytDAAAAAQL6JCStVb5uypZRJDvWRInauVkqZKF4fqFSctje/S6Kbq0heSqS3Q0Wv76m4Zu3bpfkXbcmpIVG9sD9etzHa1NLeS5WfVaijpaJ0ALAwAAAMECOij71v6o/GPBjJOBgT5nGJ1Oa1s1I+IkSZIlUWYwhNOYNntNM+VKp2PQdTfcRM5+KSXwnfc/7zFk5OReDz78dACBX5lyHK0lWTRjoE0+foxn3S3VU7Gy8gp3pdUGJRoAAABAsICOzNq1a9ED991WsO+nXYVmsw/mKVnKeZorV0FBQeiVFf8MffvdT+NvmXRbBCNjlvLSUmz0uElhg4eNo67UObaGZI0ZM8kkSeL5SZzPSxfNoJycY468vOPQsAAAAECwgI7OsbRjKGXRi6c3rP/2JM0wDeUPYQyjkzb8+GV2UuL8i+oWLCkpQRVlpbwkKgzLumTpXBl1WRRF3b0PPBHK1C5xcI1IVlzPnui2v0zzY1m313KCIBSRc1RCiwIAAADBAoAqtOlfSksK7ZpsII8olidaMIum9UStwYeN8tWaT8pxxJeqFlOzEud2y3G9egQvTFxivJLneJGS1T055fUgk8nc4Ha6dInVIYzy8SxbjatYK6zO91a964TWBAAAAIIFAFU29dQzzxvvvveJGM7NaeJR33wXCse7iYTxt0UlJi2/6K609Ix0tCT15UJfXx/OQ9wU1uHC+9w8onNwt25X9FwvQrKwcRNu7X77HQ/q61tfqwl2z70PBfIC5zlFDmJoBjtdmF124kQ2zBUCAAAAggWAXCH0pCpX0+56NNrt5mgtTlXraezCL6qAWCvRiDG3hC9IXh7WKz7+ovaxe9cObvu2TWf0BsOFJHpZlo0U5TPz2ZcCtFpbbUSyMB8fX7Rh3Tenvv3mY3d9644YOZqJ6REbyHPcha5URcEkg47dsHNLObQoAAAAECwA5OqCXLFuWlFk+YIzKJhez0h6nU6UZaWm3WlRHqvNqgweMrLLp59913Xy5MlN7kcVN/TBuytKeJfDrnWlVS9nWVYZnTCh08QJU8krfe61JUs7X4vFB9u9feOJlKQ5RQ6Ho04kSqfTo2nTHgx1qSJ6viu1Coqm8dMn80rW/vitCK0KAAAABAsAuWpQrvz8fOX9P23KOfbngazQ0BBOFQrcY11Fy6MqKbOGzl2wNLz/sKFN1lwoOHVK+eXnvYV6g1HxlLVKm1U/YfLtAeRVuAaekhUQGIircnUyOWlOsSDUX8ZqwaIUQ1SP+ACB57yvlb8/u+6L1aWKA9KvAAAAQLAAkKsG5MpXlauf92/LTVo03zZ79vPOPTvWZ0mSxJKkd86SJImy3ckHJ6W8FT1gwLAmHekfby+3l5ecqSBIsqYda11tnbpFhVw/YdLVcKwqyVqcNCtv/fffZqpyVdSQXHXu3AW77sYhXV0ul3oNLkSvtG7P7ZvXndmwYS1ErwAAAK7lv4215z5rdyeIYfAuXzW5Qpifn0+VXM19aWYlx/E16/UfOJROWfpGJIYIiyDwXnPtUap4iQJvf3/VirxtWze4nU5Xg/tPXfqqYejISXFOu0OTrKrGTDMMkV9RenLWg3ectdnsbe6aacVS5y1YGjxk+NjuWrmJmm87OIHLEm+f/sidxwtPF0JyO9Dhae9/n4D2DUSwgFaRK1RVRNQkH9i7uY5caRw68BOfuOD5bEXmKimK9IpkCaIgqbZhXpC0PGbGjJeM6vMNHsPilETX8eNHy2iarmnLWndjv87dgocMGU62xes2dESCbvS4yZ1UufIaAGA06JTff91bAHIFAAAAggWAXDUgV2Z517YfcufOqStX1Rzct09MTZyVjSSmVKc3EMi76rtUVFSkGzfxr7ELE9/0pSi63m2oMoW+/O/nZym9ntdG31XtXMvFcjp1U+74WxBNty3HGjNmNDZz1sLuNqtVq0txoWtQb8CPHz91dknKIge0LgAAABAsAOSqXrmqnv5GFKVGt7V371556ZKX84rOFhQyOp13GQcMk612GzFidELUwpQVwb161V/GYe/OrVx2xpEymmFq2rPA83KvntcHDx9+K9VWrpsmiY89OTOMYfQ+snzhmmE4jnMc5/jo/bdOuzk3NDAAAAAQLADkSm72xM3V7Nq5Vnnw3lsLf/ppW77F4utV+V0bYWi3V2BDBg3vvmrN9937jxlTp83yLhZ99cXHxZSOEZByofiopCjM2PFTA9rCdSNwHM2evdQnKLhbGMuyHtdMK19hlH/7edfJgwc3ydDCAAAAQLAAkKvLlqtqREFASxPnlmzdsDHHx2IRtYRvj00rLOeWXSWVIakLlkb3Hzy0Tn/h7l3buePHjpZ7RrHcbrfSMz4yIDw86qq386HDR+nGTRof7uZcNcn4Gjq9AS86k3dmccpC6BoEAABoT38zYRQhcLE8rcrVX1pBrjwhVa9KSX3V2OfGYREUSRlELeHd83mKIgSBd63940D+/82f6xBErua5hLGT9AuSXuvpcNhrJMZoMuHfffV11ltvJV61SZMHDx6OL0xeEas2RrMkSbJH41TPVq5Y+drC7K1btzbrRnzjjTfQddddB40TaJeMHDkSLgIAggWC1X7R5st75u8zjeMn/jWa4/hWkytP+g8YSi999c3uGE77saxT8pwvWqvebrH4STu2bixY85/3io+lpVUt1+l06O13/x0ZHhkdUDP1DIbhRh1T8fT0u7LT0zOu+LWL7dEDffzvr8Otdnew5JGQpt53eEhoMJc4f2bGhnXf883d/oEDB9CAAQOgkQIAALQxoIsQaFKu3l31kfGOvz4U7Xa3fOSKoGl006DBpI727vU7dPAn/rWl87KLzp46o9MZcC1Xqfo5LUG8srIUHzhsePd/rf4qYujQEVVlHtTjQ8Vn80toir7wrUH7BkGQlk6dI/WXclxarar+AwaRvXrFN9vQSYpC9zwwvZPLLQdJ3tn+mNnHR96zc0P+3t3b+ct5f1iWhUYKAADQBoEIFtAggYGBaMXKf5hj4m6ILCsro3Ec95IrHaOTt235JvvVZak2Wb70dkQyNHr51Td8b0uY2n3Hlu9PzJ07s1KsVdJBG3k3b/5rgWPGT+zqcFaSsuQleIggSEKSZMefv+85kbjgJWdAYCi26oMv4hg9baoeqaflZeXnZp+Z+dzDBQ5Hw6lO4X37outj4phbbplkkhDpc+NNA825WcfLHrxnagF/ifKoCdrc+UsDRiVMjLTbrNrF8ajWrsNVsTqVnDTnrCRcXsRvx44d0I0CAADQBoEIFtAgERERaODA4eby8gpdLbmqQjMGirSQOEY0W67GDhwTefrkKeamwQmRc+e94UsQ3pEsQeDRktQ5pf/esTZLFmVWEyrP5yVJlHAcMw4fNbHHwsRXg3FMUnJyjpaeL/lQBc9xSo+4OL+IiKgGi2KFhnbCVr7xYfcXZqXER8deFxkd3SuguKiYDgoOC3152Qo/3Gy6pPOb89IKn8lTp0XarJXIU64IFYYylHz2yXuXLVcAAABA24VISkpq1yeYnJwM73IzOX36NMrLPe6YOvV2zOXizAryDneKkoDH9+7nFxPdk9u9ewsrSdIly5WtsgLHVHnj3Swe16Onb48eUa7du7ZxnrngsiKh37Zt4vNycsqnTLmNQjhu1Ob4q45OKipuN4dHRPfwG5NwC1NcfNYaFBxqVhfXCBWu9ddJgn3fvj1cfcfkcNjRdT1i5PCo2AC7w4HJkqRoBUtFUcRi+95kzs/NrszPzJAu9trJSMRDQkLlkLAwklD3rW4I0+ZMJAnKOv+lF/P++ONgi4SOH3roIRQeHg6NFQAAAAQLBOtaIisrC50uzLNNnnQr4WK9JQtT/7ndLBYT19MvOjLuoiSrtlyplqRUb40T3HhcXLxfWHSkc//OrVyt3kBUUJAvHzyws8IvMFDsHd/PzHEcoXj0casypNCMwRQS2smkKLJqXxdCaziOYxRBS9u3b7DyfP1pT3v37ea7d4txx8b19Fe3fc7eVImTXS5q4KChzPadWyqcVutFXbeTJ3LFDWu/tv3668FyTBZdYX2uU/cui4vmPZ+7f//2FgtdgWABAAC0TSAHqwPRp3dvxDBGxIk8RhAUUmRJtRstTiNXNQVVQxSSJJTycifKyzvite7kyZNRcsrKrkWllaGyd6K7FkHCfHz90L5dO/IWLXy+rCGBaViuam/LRzr8657sGc89ZRelurU3GXU7qYtfM/bsPaC7wWg0nZ8w2Wtev+rNeSzDLWaT++np9x47euRwgxZIURRamLw8bPDQUV3cHgVBtXpVB/duP7Ek9eVil+vSE8s79+mLGBdL5OZkSS35nkIOFgAAAAgWCFYrExkVS/fr14++9dbbiJISKyUoMq1aDKlgOIEpGHHzzTcRNGPANcEicVWwFBmrevvVn5gqV1pzUIUF7dm97+ysGfeW197+5UhWE3KFecqQZnoWo0n4Ne3n7JkznnagBoRmwIDBxPRnXuwUERkXzLJO3HP6mfpQJQn79qvVmf985w1bY6+LjY1FH/7n2whnJRuk5XhVn19gYKC8a9v36XNfmtVmhu6BYAEAAIBggWC1Msvf/DB6yNAR/i6Xq9431c26Nak6f028ZqSpgdHr8F8O/XTy5VnPnqlvG82RrMbkisBwjKIo2c25vaVLUXB9YBB//Nih7Jeeme602+31nrMWcXo29VXz2BuHdGUYvcnlcspYPZGxqtfSNH628GTR09PvOel0uhq9lgOHjSQWLXwlDmG4oVrccFw9WEVnffyRaZkFBVkgWAAAAECDwCjCdkLv+HjUr3dvory8XNG6tup7nAtVYZosqI/qn94PTFuuEA1a99q1a1HiopmnQgJ9z2rZ6bVkVrFWVqDBI0ZFpCx+K4AkSIRRRINyReEEYTcyJXuO/5ZFWiyC6mu4x8ZkV0kxfXPvAdGLFqUYGjoeLdn9jbkz7ckLZhzPy04vtFh8FKzWcVXDcxyKjOnhO+W2u/QUSTd6PQ/s2Sn99sfefB9/P0mVvSoTlVWjpBjk89zzMwNNJiM0OgAAAKBBIMm9nRDWNRZNvPWeQIFzMOfyqZoHSVHY2dMn7Vs3r2uwYFRmZmbDie/YucT32Niefp07d3X3H5NATRh+S1R9csUF+ZWkJr544ov3/8kNHjrIGdMt2tfpdJLVESjtp4t1k4HBXcy52cetBQUnG8xfKiw8pWxY/4M9JibC1rlLN4Zm9Dpe4L0imNr23Or2+g8YFjB0yDBalET3iRP5kiTVn3O+d+9PQpeu3eSIyFhfLYG+Wuh6X3edvrjoVPmxtKNXfXJmSHIHAAAAwQLBakVCuoWh8VOmBIlOnjkvMtj5By4rCkYzDEbTNKYJVGMPrRstPyfHtn3bBntj+7sYyYqKifOJ7hbl79TmBqxHrpIXvJD/2/r1ChJFtGvTer5TZLgzOr6fj+BykRderygkTdGjRo0zZamSVXjqRIOSJcsS2rplk3Bw367ysNBQvm/f642siyVrH5sqVLh/UIh5+MhbAgYOHMrwPK96k1uw1hohKKkylZed4Zo0+XaTgnBdVR+our76erprlx7Cxg3rHOp6IFgAAABAHSAHq51www03Yqs+WBNvd7mN6imLiiKLGIZLCsIko46W044elktKSiWMwCRVE2Rc8xdVVRRCawCqgsg4gavC3aVbV0oW+bL7772j9GL221hOFqpnNJ+nXP26dq1X4yMMepSU8oplxOCEKJvdRnhG4rRJnjEFsyfOfyHzwIHdTY7EMxoNKCHhFurBR5+N1OlNlvoS4DVfYhgdroqnZLdV2HZu21q+bfta27GjhwXVuWpeN33630133ftEDyfrrF4TMxj8+b8/ef+xtLRDV7VaKORgAQAAtE1IuATtA5vNhg4dOFhw2FoiH/rqM1FVJm2CZAmpkmVkaOXI0T9QU4ndGhazGcX1jLvo/Wo5WSqnVMlC9UiWl0Dhqu2y/j4lqfXIlYbkYlHq3Jk2csnKnMHDxkfb7BU4dl6yREGQKJI0Jya/GZmaNDNn3/6djXbPaef6/fffCEOGjyu/4eZBFnc9c/ZpXYY8z0k878YIkvGdMPUO38m3/4U7duxPO2t32Nev/9qlSWlMbCwpyVX1Iohz56QNvmSZ0QmjfVXBKoXWBwAAANT5GwMRLKAlaCKSpeXX44aQEPv81NkZ+7/5pnHrJ2i0MHGx76ixk6OsVivmOSqQomlCEd0ly5bMy9+1c2eTjfexxSssdw0f28OzplW1750XwNrbwGiawXAC1xpOlaTKskRoCfKeUDSDn8zPrnjx+UezNbm9WkAECwAAoG0CowiBFqFmdGGI71kcr2cUH4Yrss1hmNBvaABNNz6CT5S0+QfnVe78aWOun5+f9h2gxpIFnpdIxhj45JOzOlMk1eRx7f3PJ1qmu9aNh3lJFEnYdXqDoMoUISuK5/FqUS1t1KWkRb3crIusLVcaPOdGPXr0ZKKje8A9BAAAAIBgAa0sWQsalCyFZV34yPETI1JS32pSsnhBRIvnv1Sxe/uWfB+LD/IUJC0aFRjaNWx+yuvBNMU0uh2dTi9QOCko50staGgJ/2kZh4uWpczJKCrKPxUYEODS6QxYVXRMrpItTxmrN0qGqdaGUySSMRneeAAAAAAEC2hlyfpRlaz59UuWV52si5EsXkCLFs4s27Flw0mz2QfTksurn+M4Vhk9alzXBYtSfM715tVPSdEZqaiogCfJC+mG2mGxDla3betG7slH7z0z4+8Pp+/ftynj9Jn8M/5Bfi6dXi/r9QZC/YlXhd5QjXRpXeq4JmK+fn7Sjk3rSrKPHwfDAgAAAOoASe5Aq0gW0hLfl6xERUWVoZ4j+M5LFnZeslBjcxdqiKKAUlNfKkYEjg8ZNqqr281WR5QUm70SHzZ6YvjQ7duO79qxud56CQWFp1B2Zhbff/BQJHkkuisKqrI7LRn+4IG9svpwGI0GR3zfflhoSJhuwtQ79NaSStON/fvradpCSLKES7KMGRi9mJ2bzp0+lVuUkjTXKYgCvOEAAAAACBZwacTE9MJ1elI58ueflzQa4mIka8iI0RHJqW+ihfNfKBPFxiVrcfKcs//+/FsyMLRLWE3CuoJkN+um585f1p3Escxt2zbVe4w4SXpFmbQBgf4BAbTZbEaeU/BosnVo/35tG+wP332j2Vi5ViGfZoyYKEmErMhIT+vEY+l/qq91QuMAAAAAGgS6CIEGGTIkAX/vX19Ff/rvb7prowQvlaa6Cysry9GQ4aPDUxa/4scwjXcXCgKPVr37WqHIOcu0Lrrq5ZIkyTRD+jz65HNhDK2rv5ErilfdLI5zo969r6diY+ObHGJ6NC0N/fbbIeXPw7+KR//8Xfz5l/0gVwAAAAAIFtB8uUpJfSNKkNy+p4vKgpNTXu/WGpJltVZgw0dPiJi94k0zjjfeHHft3KWkJM7NF3nB7rkt1sXKIaHhoYOHj9LXt558bp5Fz/0iQRQxURKghgcAAAAAgtXRGDp8DJOy+G1LUyPlWk2uFM5PFEVJURSpqNQa2lqSVVlhJcbcMCxy0aJUQ1Pb2rdvt/z7b7tO6I1GCV0o36CIIkc+8PATgf7+fnXWUXBUp/K7Nq2O+gDBAgAAAECwOhL9B4+g5icvjxo/cXKP1KXv+F0pyaotVzVCosgtJlkEWSdUVZVLdfPghMiBg4Y3WdwqNWWRKysjrVQrt1C9jOc4pWePXj4xMXFE7deTMqo70g/DMQWD5g8AAACAYHUouUpe+mY0riim4uKzypBhwyOrJKuBHKPWlquWlKy/T3/olMuhFFM04yVCWi4VThCGpcveCr9x3LhGI0sc60YFJ7LKCZLwnMRZsTtZyqmKWp3jJlBt6VIwpGi5WRDBAgAAAECwOpRcybJZEAQJw3ClorIc0yTr1dfeDbBYLFdFrlpKsvbt34eWL1twEpNRGUlS3pKl7lfGcb9HHn2+M0k2nvS+a/d2rX9P8ZImDCfUR502rShyPaNltfl3oPkDAAAAIFgdTq4uqACmiLJIsIKLao39NiFXGPKubH7ZknXgwBZlwcsv5GMKZqUob8nSpqjpFdo1dGHqKwF6ff0RO22KnPvuf9xfkiTP9ouRBC4SBF6nMBUm4bUFC5MxRVIwBYqEAgAAACBYHVGuNBkwWSz49u0bTy6aN+NsS08s3JhcaQnper2BZxid5FlFvSUk69ChXVJS4oxcQZJctRPfHawLjU2Y1G3osDG6+uRqwaJlIRHRPcM4jpM9j9Vptzkc1oo6BbVEWfISLFlWkEWvl80GHQgWAAAAAILVbuWq/xAqOXVlvXJltliwHds2nFqaPPesKLRs1fDG5IqiKFxSJDYlafbxXdu25lss2ui8lpWs/Xt3Cd//75M8X18f0XNCZwxDSkWFlZo1O7H7OI98LIokq+RqZMLErm7PquxIwf18ffm3Vi4uyM7J9trHddf1QwMHDSA9X8/oGHTkyB/i8ePp0PgAAAAAEKx2K1dL3ozGMVSvXO2+SnIlyiKbmjgre9f2Tdyrr8yr2LVtS25rSNZnn37k3LFl40mDwbuElaJul9QxPg89/kKINoLSYDCjxcv+ETp63ORwm816zqvOvRIzm/ykjes25+3Zs73OdDmiiAiK0pGKciFdS5uX8ExRsVheXgENEAAAAADBardyRRANylWKKldCC8vV4MFjiKbkKnnBzOxD+/dWCYtWRT0l+cXy1pAslnWjxMRZZbk5BUV6vd4rH4t1ueTQsO6d5i9KMWh1q8rLi1mnw1ZpMlswrUtQUY/DZPaTt27clrs4daZV21ZtoqKiaUGQGS2P7YK8Kaqw6XhogQAAAAAIVruWK/6KyVW/fv3QW2+919UtsQGNytWBvV620pqSpUXn/rXqrULOzTtwwjMfC1PcrJPoN2hkF9/QYOzVZYnWZ5685/imdf/NUYWL9fcPlrdu2Jb7yrIZlZJUvy/dMuEOvYIpmrh5jDjE0Km80y5ohQAAAAAIFshVi1BYWIjSM34p8bNYnLIs4xcjV1dCsg4d2iz/cmhXPk0bJOQxalGbJNpHb/K5++4Hq0q052Rno1eWJpW/vTIl/c9fd6drctXYRNHl5eXGWoswdePipk3/c0NLBAAAAECwQK5ahNLSUvTk9EecWRm/5gT6B7i1+p4XI1dXQrIWp8x3nT2Tf0Zv0Hu1S9blRAkjJ3QaPSqhpgtx86YN0lNPPsw2Jld9r+uHho8ZZcIQhuv0+qoHTTMESRCCXs9AFyEAAAAAggVydYHBQ0cx8+a/4kOSzSuL5XKx6KmnHnNlZfyS0zksjBck0X0xctXSknX9DTfi99x7P0lR56oo8DyHVn/wdpGb5RyepRu0KJZObzA89tTzwQxJXvR55ubmoaWp804ePnIw69dD+0/9cmh/UX5eduXJE5nWrMwMKNEAAAAAtBqY5+iqdnmCWNuYDaWl5Eqrl5W4eGWMv8XHuHn92pzUlNnloti8aJc2cm/58rf1/1nzOdr70072UtenKBotSnzdf8SYsZE2W0VVc/KydwwnQgJ9ziYuevHk2rVr66zf94abqQ8++iI6Pyut8oP3/lG0ffuWKumZM3ehz4Qpf4txOhye28O0mlwLly86tu/H78Tmvg80TaHu3cNRVlZWu2jfO3bsQCNHjoRPMgAAABCsjidYLSxX0SRCZp7nZR8fX2XHlk15lyNZl8vlSFbfvjeSK/+xuieGKQaWddt279h7et2PH1lFUUTvffRVlMvl9lfbp3xBjhgi11p8YtZ9dxQ5HE64e0GwAAAA2izQRXj15Arp9XqlOXJ1bo5CTLHZrNioseMjFi5a7t/c7sLL5XK6CxXNxTCksCwr4ThmmjB5XMx7//oi3G5z4QsXzDptMJk0uarZHse5les7dQ+eMuVWAloWAAAAAIIFclVHrmiGwTOOHilduODFS5YrT0e5liULU1+GnfcnLc/K6XQgVR39zT4+1OlTOSySxApVJGvaqPr/st3N6UaMmuQLrQsAAAAAwQK5qj2BMtK6wUK7djNeP3I00Uy5uuYlS9Y6qM/1KNa8VlEkWZvKJjcnF+3dvanIYDR5nTPP8ygotFNAl65doJEBAAAAIFggV97IkqTlUJmefebFUJ1Od0lyxTA6nMAJ7FqWrHFjxyJrebmC104B1FY5n3X12WernUgWbMgjiqVeN8U/INjUK/5mPbQ0AAAAAAQL5Aqp4lOrvpNLju7ULWT4iNH6i5UrvV6PHcs4fNbpdjm0+lXXqmQtTHqt6/33P4DcbrdSq0Uq1WtkpKejr7//slw9Zy8FkySRSEiY7AetDQAAAADB6thyhTEMg0qKTlvV5y4sxJBid7rIefOXdurZs2eTcmW2WPA9e7aenfHMw6eWLZ6XKyqy81qVLJuTD51y2z3dZORdjgqTFYRdGDiIdm3eaKVwglOUC92IPMehmLielq5dozBodQAAAAAIVgeVK60Uw85tGwpSEudkCbzo8iyiiRRFxgjK9777H62a0qX/kIbkygffsX3zmSVJcwtkSUa/HtzLa8VBr1XJ0sovlJRXBCIFaf2jF4wKwz17BFF+XrZ4NO0PG6NjPKfPUfz8ffU397+JgZYHAAAAgGB1ULnSSjG89kpiUVZWuvLTrnWFRqPRM2yj2J0O/KYBQ0Mef+o5eu78JQ3I1SZVrmYXeI44PLR/zzUtWTiG1SnCJmOylvxe87vdbkckLtoI3GssgCKJIjl27BQjtD4AAAAABKuDypVnnau1P3xtwxSp3CtMoyiyJOM+d93zeA8dRZsuRq48JWvRy89n2x0OB0Fce4nvdRskppVv8BKvjevXObX5A5HHaENREhFB0RZ/f0jFAgAAAECwOrRcaaSnp2uTGp81nis/4NnthbMuJ6PVg7pYuarm8K8HeCQ7TxPn5um7tiVLwZTagvX7779wDkelG8NxrzysPv366mJi4yAPCwAAAADB6shyVc2unZvZrIxj5Vqx0dp6calypc0n+NHH/zaEhHbvyrndXttoy5KlKPVKFoZjmKT+x2v0ZV5eLvrjj985baBAzQsxTHG43FRFpY2E1ggAAACAYLUDBg0aTqYufavZcwtyHIc++/d7RTiBe3V7NUeuVr3/oSGm501RFRVWPXY+p6mqfKe3wLQtydq+JddgMCl1Et+rrqCoXk9Rrr2uzmRw6/UGXKfX1zwMeoOuX9++kOgOAAAAtDng238z5CplyZsxclUievMnblZUk1B1SDr/HjQrclUtV6UlZTocx6ukROtq9LFYWJwiZFulzegxWXKNZGm/XK0JoqskK+nF8o8//4YJCu7Uhef4mnPXCq7+8fvvUvqxtDrr5WUesWEyKuHdnIghRZIJTKZpnXzTjTfy//1qDTRMAAAAAATr2pcrpfa0NZckV1qdqzkLlkZzHKdFXy4556oxuQoMCODS/tib899vvxGffWFBDENRRnVbbU6yvvj0o7IX5iSHIMTXCCaGYcjpcgkcz9dZ55233nCqP3KhFQIAAAAgWCBX9cpVw3WuLl+ustJ/zX7+hWdYl4tFlVZrdmLqymiqDUpWTm6eiCFcVBSFVsWq5jrgJCZAawMAAACudSAHq53J1VNPPerS5Erj0L62WydLljnZoMPsJrNZomiaUNRzqLqgMggWAAAAAIIFctVG5aqa6mKkLjfrxD3KHHhKVmLyykCz2eeKXteMjHT06MN3nnhtyaJjRacLCgOCgli9zkAEBwaDYAEAAADXPNBF2Dy5QteCXHlK1ppPV+c9+fQLcS7WqZVEr04sV1ysixw8ZJRfSHCnMrvdqlzJ65uWlqY92N27Nhb27nvD2ZEjJ/v88ftuFloeAAAAAILVThk8eCSTvPj1yPrkSqvHtGntNydfXZZYJMlSs+TKoNNfEbnSGNB/NH7vfdM7uTnWU64QRVGEJCgVLy94Ki87J125Wtfa6XShg/t/ktRHObQ8AAAAoD0AXYQNMP3p53xJnd7C83y9BqV6joCwxp2k/5CRTOLi1+vIFcPo8F9OZJ9Omv/CFZGrpCVvRuoMRIA2SXItuapMWjAj59DPe0R4xwEAAAAABKvV+fq/nxSbjdRpnCDrXCOO47DxE/8Smbr4lQCKajgI+NRTz/kbGUMdSZMkCQX4+eLR0dFXRK5w4v/Zuw8oucrD0OP3Tp+t6hIgVBCo0IyJwWDAFgYEBGFjzEvsHL/Eac4zTlxwowtRTFwS8hzbIfZJs00g+BlTTRMIixKDYwPqXQJkVSRtnz73zQgEu6uVkDBFSL/fOXN2NZo7O3N39pz/ud93v1sa0jvw+sVVxW8bAATWW+LOO+6IrrrsCy+MHDFofRiL73BJm7aOzuCUqeeMn3n113YaWbff+h8bWhrT6+PxRLz3/eVyqTqmYdABM6/7hzETJ04UVwAgsPYfd999d7CzyAp3I7LuuPOO6pWXf/75A4YP2RCLxftEVqFcqowYOXrUjGv+vk9kiSsAeOeLX3XVVfv0G5w5c+bvtP3SpUuDtWtWdUz/0Hnx7p5ic/1Cf70iK8gXiuGkSUcOPmT8mMKcObNztRDaYfvf1rY/99yPJLp7Cs1R8Or2lUo5am0d0nLc8SfGn336yfZ8Lhfc+P1/eVviKpPJBp+96LKRf/pnf9UUhkF10KAhlba2zcFrnSHJ2+uTn/xkMG7cODsCYC8T9uqFffMNhuEb8jzTp08PrrruhoM3bGwbFVUrfSqqtgfDQS3NwaOP3LNqxpWXbi6VygNtH868+oYxG15sG1mNKv3OSszEV69asi6bDraOO/To8Vs2b33Lj1ydMe33MzO/9u3De3q6k7U3VGpsaMgvXryge/7c5W2zHry1e8H8Z8vlcsFfzF5m9uzZwdSpU+0IAIH1zgysNzuyEolEfRSyUsgX4rXXHL1RcRWrPWm1HLVffeUXdxpXmUw6+M4//ceYMeMmjSoWC/XHhNUoCtPpdJiIx6NYmMgvWbKga+mixVsf/sXPa7H1dKmUF1sCCwCB9Q6IrOClUcc3LK7qz9eQbSxccfHnFj7+xMM7nXN11ofOS19y8bWHd3R01eIuGOADEYWpdCaMhfEgkUoWli1b0DHvhVVbnrzz9q7585+u1texQmAB8CpzsPbQGzEna+1va9ufc16iJ1fsMyfrlZyJorC1uTm/ZMFTK/76rz/1euPqpdcUj8XDeBT98vE5nf1fy3af/fKM4aMPHDu0ltthNarWorv68rt59Z1VKpWoXC5FxXw+MXTIiKZJYw8d+qEPXzDouPednOop9FRyqWSpa9Mmf1FvMXOwAATWPhFYb0VkhbGaoNpx7TWXbHzhhTWvO67q6mtuHX7Eu1rHjDskfHzOwwNG1pIF8wrDBrds3bTpxVJz06CwddCgRCweT0TVWmzVH9/7KGD4UmxVyuWou6cnNXjwsJZTp5455IPnnt944KDBtTSrFNu2bolMjhdYAPuz/XKIcNSokcGIAw6slUIYr09SiqpR/GMf+8N4U9PweBRV4vlCOVGNVeK1/6ztn1ozxYIwlcrEvvMP129YuWJpfvvzvJnDhbXAib24ce2Ga6/68vP1IOvv+FpczbzuhlpclfvHVeylH993qK+5pSX2yOz711474yu/3VX8jB17aDDliCnZadPOaT148pGtw1oGN9ZiKlHIF6KoXmcDj7jWdmQYS6TTUbYhnXtxw7pNM6744sZnn3k68if25jJECCCw3hbvevd70uPGjk18+CMfTW/Y3JmuveH6v1MjDzgoEVWDWhfUOiqqxqMg2uWaYI0NTbFP/+XHFj7z9K86+0XSm3p24cYNa9bPvOKiPpFVj6sZ1/z9hHiyPLhcKld6R1kqke6uVivpYqkQf72Rtd3oQw8Njp58RPbMM6e3Tph4+KDGptamYrEYK+YL1TA28HWCap+nxJChg9su/MuPLxVYAgtgf7XPDxFOOurEw05439SDWgePGHrQQQe31G6NqXQ2UywUU+VyOV4uFWPlcimofR/t6lY/EnbvPT/btGHDumLv538zhwt7r5O1YO6v2zdv3hy8970vxVWiX1xtW4qhWG3/2jWXLisUyrkjjzpmcLFY6HO8qVgoRJMmH9Gyq+HC3jq2bAmWLV1Svu/eu7p+9eRjL44YPrQ9FsaqB405OFFLt2S1Gu0whNjQ0Bj89Gc3r7nztltz/rzefIYIAQTW22LxsudHlYrFeO9Yil666PEeHV1JJlPhfT+//cX+gfVWRdZRx7w7noxnez7zuUvHpzPRkFL/uCpFbTOv/OKKJ554qPLUk3PyBx4wLj/58CN/58jabsuWzcGsB+8rPXD/ne1P/+bJLeVCtWfM2INjza2D0vURwnLt5dQ6K8xmksXv3XD9mo0bN1T9eQksAIG1j1q2/Lcj6+9zNx8e9rvFXv5aD6xYLbA2DRRYb3hk5WuRFfWNrJbWIU0nvm/q4CgoNVUqrw5FDrSIaP25n3ji4Tc8surqQ4u/XfNC9YnHZ+cef+yhLQeMHN5RKBajAw8cnc42NKaWLV646eab/31rsVj01yWwAATWvmrpihdGbZuDvW2+WRCrr+KZzmbDRDL5yq1+dCqRSES1r9VUMllJpJKV2tdSMp4ox5PJcjKVLjdkM5Wf333b5vXr1+508tIbFlkfqkVWT9/Iqg/FlcrFRO/7drVC+5sZWdu1t7cHs2bdX7r/3jvat27ZuHXosGGlRQue3vLIIw85hVBgAezX9vlJ7g/PmXtsEAtjQTUo13qkvKXYU1r8q18Xw3hUrGVIKZseXups31i+5ZZ/rY9xVcMoqGVYsO1rFNXXMw+3nYpYP5S1YtmSSld312vusNea+N7a0hzMmf3gyquv+vKWYrE00PbhzOtuGFPbfmS1Whlw+YXdvXBzIpEMLr7k64NPP+vsQ7q62l9ZyHS7PZ34zt7FJHeAvVNiX3+DTz3z+MrZP7+nvH7dulIyES9vLuYqq+fPf1N/5t13313/8kItsoL+kVUrnKi9vTP8wAfPHD8jSFRnzvhCW7Ff2NS2r0fQ8zNf2n6HyNrduKqrT+D/2+u/urX27cqBIquzo6M69dQzD6x/L7IA4I2xzw8RnnLC8fkVK5YVN2xYV1m3bm3UtnHjW/JzdzlcWEucfL4QTpwyedCJJx7XNevB+4r9l3DotX2f4cI9iavt3orhQt4ehggB9k4xu+DNUz+SddVlX3hh5IhB6+tXcu79f/Vr/rVtbY8fcfT7JvzTjf/S2NLcPND20YzLvvB8bfsNYSwWT7yOuNpu+5GsWffdu7KpqbUea30ia/uRrMtnfuOgWsT55QGAwHqnRFasz9mMsVhY3bhxY3Lyke+dcNIHTs3uZPttkXXgAcM2ReWw/bXi6tAJh21bi0pkAcDbJ2EXvDWRVfPCzOtuiG/c1DaiUnl1TlUsFqu++OKLmc/8zSWHbNm0eemTTz5eGiiynnvu+dXd3flw5cqlA47fJeKp4NRp52Qvuezq0U8++uC6Sy65qGtXkRWYkwUAbxpHsN7CyLr4Sxc+l0nFNscTyT5HsqIoqiQTqcarvv7t8Sec8v4Br/Y3b97caGdxddppp4U/vOnOURdfcu3kfD4/9ISTPzhi8pQpO30tjmQBgMDaZzz44IPRFZd+aVUyDNuSiUSfyCqVS5WwEg365jf/cczEiRN3+zmvuOLa7Fcu+dqkkQcdOCaX64hXK5VSFEsO/qNP/Fnjrrbbg8g6MJkQWQAgsPZijz02u3rFZZ9dUa1UO+uT1vtGT7lSKAYjPv4n/2dUIrl7o7fPPPNsLNPQ0tTT3V2/KOC2ob5cd1f8pPefPnJXR7F2O7I+cOZBl1/9zRHphqxfHgDspn1+odEwDH/n52hsbAimTDk2yOe7Y2G8HqVhPAzCWBREsfoypB/96AXh0KFDY4VCIuyJ56OmYcOCdGNj9XuXX9I9f/68AYf13nviKakrZ35jYhjGstVq1PsxYXNLS/DIrPtWXH/dJVvz+cIuX1s6nQm+e+NN48aMP2REsVDYPrcrbGxqih6d/fPFV17+le7Xen+7XIw0isJBQ4dVZ15x0aIH77vLBZz3MhYaBdg7meTez5Ahg4MT33dK9rTTzsyWo2SyWq2mhw4dnKoFViKf74kF8aAWVy9FVi1DXr5eYdT/ytFhQ0NDOZFKL6h9P2AhPfnfjxZ/89STKz9w+ocmdrRvSNY22R5ZUWdHR3j6tHPGJuLl/GWXfmWXUVMo5IP/uvnf11965fVDaoEVezmOolKpFB81cuzwbCrVnXuN6wJuP5IVSwSrpp522vierlytH19+S2EY9XR1Jj72h3888pePP7K6s7PThwQAXoMhwn4mTJgQXHXN3409+tiTDzv2Pe8d857jTxw5Ztxhg7e2bWrOF3KN+Z5cOteTS+Z6emK5XE9Qu1VzuVw13+9Wv/+1Fuy85urLe56Yc9+qltaW+gN7H2qL2jrak+8+7tRxJ5/8gde8UPUvHnkgv3zp4s2pdPqV56jFVnXiEUcMOv7cD+/WBKp6ZF1/3Ve3rFjx3Prez/NSxBWjQydOaTzs0Ek+LwAgsPZcsVgNujpzQT7/aiyVaneGYaweQfVb1Ov2O/6sruCKy/6m/dGHZz3f0NDUJ2qiWp2FYdj8jW999+BJrzHpvVgsBLfe8sNNyWS6d9FFlXI1NfWM6YN39/WUiqXgx//2/S3xRLxP8NUv71MNg7AS+rwAgMB6HarV+Lbb6+inMOg3SXy3oqZUCa6a8eVNK5YtXJ/NNvQ5WlWplCu5YnX4x//k08PT6YZdPs/SJXN7cl3tnbGa7fflC/noPQePGzpu3Ljdfl3vf//xySiK+szDCuOxMN/TVcp1d5R9QgBAYO2xeLwcxBPlsNYY24KpGlVjyVQqlslm+90aYplMQ1iLoiDb0BBksplq7f7qtn/X/q9+69U6rxFZxeAHN/7fNfl8oT0Mwz4b5XLd0RlnnHvwFVdes8vCeu651cF9D9y1OZXOvHJf/ShY86Bhjeee9wfNu/M6jj/xxPjxJ51xULHQ91qFDdmG8P577t68dMlSHxAA2A0mue8gFabTLWGlGpSDMFZsyDRU5i/4n+LmTVuKYVQp15q0nMk0lru61pdvueW/ahlWXxohiqovH/ap9VH97MLwrLPOqpVStNvLoD/11OPRd7/ztdUzZ/7d5HUb1qdiLw1J1p8xam/fEn/3e04Ze/TRxy6ZO/c3O53YNfuBe9sv+OgnCrmo9iZenqReKBbC9xx3UuuQIYM7tmzZutOff8IJpySvvvbvJ0RhrLlUP6y2/QOSTMbz+Z72n932o80+GwAgsF6X5csXBZ/+1B+uqq/XWQuscmMtpubN/5+gu7tnj55n3rO/2eOf/djsBwuPnnrf6qOPPenQWtSE29e1qs+WzzZkm//iwi+M+tLn/2JtcSdLN6xevby8ZMn89rHjDhtRLBa2bVt/7MTJk5vHTZgQ27Llf3aIs8aGbHDa6WdnPvXpLx0ShfGmUqnYO65iUbXSPePyi1Y999xzkU8HAOweQ4T9dHV1RM88/VRu3tyn8/Oe/XX5l0/O2eO4ei2pVDI4/4L/lfy3//jJ8PdPPe2Vs/w6OruCr3z5c+2bN65dWx+C7L1NridXPepdv3fA5Vde07Sz560voTD32QXt8V6LxIexsNrdnc+ef97HdhhibGxpCS79zvdbLp/5zYlhfMe4qkbVnhlXfHH5U798rOiTAQACa6+UTqeDs88+N/Pdf/7x6M9eNGPKoZOOmvD5z395aH3tre3qyyXc+IMb1hcrpfZYGOs96T3KdXXFjv2994859dTTdrp0w+yH7uiOx2L1IOo9jyqWzQ5q6f/Yj//RJ7JnHX/qoZs2vpitXw+xf1xddflFy5/670cLfnMAILD2SuPGHhZ8559uHn3x5X97+NhxEw/s7OhKtbVtrYw8YOzwceMm9Amm2Q88EP3D12c81zqotRRFr4bStqHCbLbprz7zpZE7u3RNGFRKpWKuJ+y1hH2xUAgOmXR4yyGH9L10zi0/+mH+1h/984qoWu2sn8FYn0aWFFcAILDeKTZsXBPEw2JUKBUTxWKhUp+EXmugaq5QzJz8wWk7rFX16C8eys966L412YaGPmf05Xp6qiMPGjvyA1PPyAz0c+bNmxc88+yvO9KZV/+71mVRLdbSmcZ0qvdju7q7oq9//Zr2S7964ZIli59ZM2Tw4KgSVXPiCgAE1jtCLpcLbvnJTZuSmUwxeOmEw22KhWIw7YzpI8aMHdtveYZ8cOM/fm9TvrvaFov3WrohDKPujo7EZZdefdCUnVzMuZRr7+m38FUUVSqpT/zRHw8YZXPnPl353Gf+bO03rr9y0XUzvrpMXAGAwHrH+MUjDxWXL120JZVOv7Lfq9VKtbGppfGjn/jz1v6PX7d2SfDtGy5d05xpqC/w2buZqtUgOfjssz82aKCf88Mf3VSIgrDvPKywPrm+ZadraZVK5eCO22/tefyxh8UVAAisd45CT09w603/vimVzvQJplzt/mlTzxgxfvz4HVZcnzPnodyza1dtyPY/qzDXHX5w2rQDx4wZv8PvsKWxqdSQyRbrc6qqUbRtodT63KoDDhrVPGzYML8IABBY+5YXnl+Wq1aL7UGvSej1yeuZhpbm6R++YIclGPL5QvD97397Q67Q09V7afj6No3NLY0X/MH/HtJ/m+UrFkXLly8utrQOioYPHdLz/Orlm//7qcdW3fL/frzGbwAA3nwWGn2LLV60KLj9pw9sPP+CcwZ3dXW+cn+pVAyPPPq44el0urNQ6DtKN3fWrMpD7zpu3YfP/8ShvbfJ9XQHp0/7/VFP/+aJrbMfnvXKMgv1Fdvn/mb+b++6/eZ1zz+/Oj9/3jPVN3otLwBg5xzBehvcc+c/d3V2bu0Kex2RKhYK0cSJh7eedPLAZwfeftstbblcZ3vY7yhWKpPN/vUXLu6zllbdt751Sf4nt/5nz5O/fEJcAYDA2vetWLEiWrN65YuZdLr33VGxVEz+8Z9+aodYqlu1alU064G71jc2NPa5ZE19/tbIUaNHjh0/IW7PAoDA2q/dO+vutjCZLAS9FhItFgrViZMmDhk37pABh25/ftdtHVG12BaGry7bUF9LK58rZE4+6fRB9ioACKz92j133VFeumjB1lQ6HfaKpainFksnTT2jdaBtFi1aFDw+Z9aGhsbmPkexisVCcMZZHxk+evQhoT0LAAJrv1UpFIKf3PRvm5PJZLX3/fUJ7uf8/vnDJ0yYMGAs3fivN3Z15Lv6nlFYqVabW5uazjr7rCZ7FgAE1n5t7dpVPWFQ6ew95BdtW7KhqemTf/7pAWNpzYoV0f333LYp2Xf+1razEI8/8dRhqVTajgUAgbX/qg/53X7bf76YzvY9cbBYLITDR44emkqlBtzul3MebmtsbMjVYmyHsxCnTz8vZc8CgMDarz3wwMMdsTCbD4Le1ycsRIdPOar13HPPSw60zeqVyyrLFsxvS2X6hFlUqZaT06ad1WyvAoDA2q+tXrm8vGLxwrbek93rsVSqVFKnT5s+4JmB9YVEV65c1JaIx/su2ZDPBxMOO3zQ5MmT7FgAEFj7r56ercHGjUu3plKpPrFUKOSDESPGDx09euDJ7nff9dPuwYNac5lMJpHJZmPbbulM2DJ4WOsx7z7ORCwAeBu5VM5e4Ac/+F73Ucec0J1IZprqq7PX76ufGTh0xJDGCy+8sOHSS7/Y3X+bVatWRj/5yU0bhw0bWSiXKqUojCphGFQyyUz13cccE91y84/tWAAQWPuv1atWR0uXLNx6zO+d2JzP5V65v1gqxkYeMGZIU1NTd1dXV59t6sOE119z2abat5vsQQDYuxgi3Es8POvetng8Wap922ey+4SJkwePGz9BCAOAwGJP/Wrlsvy6YndXPAz7THYvV6L0GdM+4sxAABBY7KlNixYG7UuXbEllsn3ur1YrwaQjJw9JpCxvBQACiz324P13diTisR2GCSdOPKp5+rkfVlgAILDYUwsXPlsqFrs7g37DhFGlkjzz9HNb7CEAEFjsocWLlwQrli1ry2b7DhPm8rlgwsTJQ6ZYQBQABBZ77r4H7uyMxeN9hgmDKIrSmcamsePflbGHAEBgsYcWzn+2WMh1dfUaJgxr38eS6XRy+vl/0GQPAcDez/pKe5ml9WHCxQvbprzruKHVaiVMxOKlalTc+tNb/3XLz352a6c9BAACi9fh7rvv6DhgzIS2FUsXtj94/51blyxZWHjuudV2DDuoVCp2AsBeKIyiyF4AABBYAAACCwBAYAEAILAAAAQWAIDAAgBAYAEACCwAAIEFAIDAAgAQWAAAAgsAQGABACCwAAAEFgCAwAIAQGABAAgsAACBBQCAwAIAEFgAAAILAACBBQAgsAAABBYAgMACAEBgAQAILAAAgQUAgMACABBYAAACCwAAgQUAILAAAAQWAAACCwBAYAEACCwAAIEFAIDAAgAQWAAAAgsAAIEFACCwAAAEFgAAAgsAQGABAAgsAACBJbAAAAQWAIDAAgAQWAAACCwAAIEFACCwAAAQWAAAAgsAQGABACCwAAAEFgCAwAIAEFgAAAgsAACBBQAgsAAAEFgAAAILAEBgAQAgsAAABBYAgMACAEBgAQAILAAAgQUAILAAABBYAAACCwBAYAEAILAAAAQWAIDAAgBAYAEACCwAAIEFAIDAAgAQWAAAAgsAQGABACCwAAAEFgCAwAIAQGABAAgsAACBBQCAwAIAEFgAAAILAEBgCSwAAIEFACCwAAAEFgAAAgsAQGABAAgsAAAEFgCAwAIAEFgAAAgsAACBBQAgsAAABBYAAAILAEBgAQAILAAABBYAgMACABBYAAAILAAAgQUAILAAABBYAAACCwBAYAEACCwAAAQWAIDAAgAQWAAACCwAAIEFACCwAAAQWAAAAgsAQGABACCwAAAEFgCAwAIAEFgAAAgsAACBBQAgsAAAEFgAAAILAEBgAQAgsAAABBYAgMACABBYAgsAQGABAAgsAACBBQCAwAIAEFgAAAILAACBBQAgsAAABBYAAAILAEBgAQAILAAAgQUAgMACABBYAAACCwAAgQUAILAAAAQWAAACCwBAYAEACCwAAAQWAIDAAgAQWAAAAgsAAIEFACCwAAAEFgAAAgsAQGABAAgsAAAEFgCAwAIAEFgAAAgsAACBBQAgsAAABBYAAAILAEBgAQAILAAABBYAgMACABBYAAAILAAAgQUAILAAABBYAAACCwBAYAEACCwAAAQWAIDAAgAQWAAACCwAAIEFACCwAAAQWAAAAgsAQGABAAgsAAAEFgCAwAIAEFgAAAgsAACBBQAgsAAAEFgAAAILAEBgAQAgsAAABBYAgMACABBYAAAILAAAgQUAILAAABBYAAACCwBAYAEAILAAAAQWAIDAAgBAYAEACCwAAIEFACCwAAAQWAAAAgsAQGABACCwAAAEFgCAwAIAQGABAAgsAACBBQCAwAIAEFgAAAILAEBgAQAgsAAABBYAgMACAEBgAQAILAAAgQUAgMACABBYAAACCwBAYNkLAAACCwBAYAEACCwAAF6f/y/AAMA4h/+QHdnFAAAAAElFTkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAlgAAAPoCAYAAAAC24AdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjNDYwZTZiOC00ZjcyLTQ1ZmQtOTJjZC1hZjZkNzZjM2EwNDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0FFOTdGRTEwOUFGMTFFQUE4NDFGODI5OURCOEQwRTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0FFOTdGRTAwOUFGMTFFQUE4NDFGODI5OURCOEQwRTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRjBGQjc3RDA5QUExMUVBQTg0MUY4Mjk5REI4RDBFNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRjBGQjc3RTA5QUExMUVBQTg0MUY4Mjk5REI4RDBFNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl/I3lAAAK7BSURBVHja7N0HfFX1wfDxM+/MzSBBQGUkYchwgLIEZKmooK2ttcPWtz62dVUrKAoImSwHUPWptfZp3z7P09a2tn1bxYGgbBkqIkNWCAiyQva484z3nCCQSRKyk9/3+eQBb3LXyem9P/7nf/9HNE1TAAAAQNMRCSwAAAACCwAAgMACAAAgsAAAAEBgAQAAEFgAAAAEFgAAAAgsAAAAAgsAAIDAAgAAAIEFAABAYAEAABBYAAAABBYAAAAILAAAAAILAACAwAIAAACBBQAAQGABAAAQWAAAACCwAAAACCwAAAACCwAAAAQWAAAAgQUAAEBgAQAAEFgAAAAgsAAAAAgsAAAAAgsAAAAEFgAAAIEFAABAYAEAAIDAAgAAILAAAAAILAAAABBYAAAABBYAAACBBQAAQGABAACAwAIAACCwAAAACCwAAAAQWAAAAAQWAAAAgQUAAAACCwAAgMACAAAgsAAAAEBgAQAAEFgAAAAEFgAAAIEFAAAAAgsAAIDAAgAAILAAAABAYAEAABBYAAAABBYAAAAILAAAAAILAACAwAIAACCwAAAAQGABAAAQWAAAAAQWAAAACCwAAAACCwAAgMACAAAAgQUAAEBgAQAAEFgAAAAgsAAAAAgsAAAAAgsAAIDAAgAAAIEFAABAYAEAABBYAAAAILAAAAAILAAAAAILAAAABBYAAACBBQAAQGABAACAwAIAACCwAAAACCwAAAACCwAAAAQWAAAAgQUAAEBgAQAAgMACAAAgsAAAAAgsAAAAEFgAAAAEFgAAAIEFAAAAAgsAAIDAAgAAILAAAAAILAAAABBYAAAABBYAAACBBQAAAAILAACAwAIAACCwAAAAQGABAAAQWAAAAAQWAAAAgcVWAAAAILAAAAAILAAAAAILAAAABBYAAACBBQAAQGABAACAwAIAACCwAAAACCwAAAAQWAAAAAQWAAAAgQUAAEBgAQAAgMACAAAgsAAAAAgsAAAAEFgAAAAEFgAAAIEFAAAAAgsAAIDAAgAAILAAAABAYAEAABBYAAAABBYAAACBBQAAAAILAACAwAIAACCwAAAAQGABAAAQWAAAAAQWAAAACCwAAAACCwAAgMACAAAAgQUAAEBgAQAAEFgAAAAEFgAAAAgsAAAAAgsAAIDAAgAAAIEFAABAYAEAABBYAAAAILAAAAAILAAAAAILAACAwCKwAAAACCwAAAACCwAAgMACAAAAgQUAAEBgAQAAEFgAAAAgsAAAAAgsAAAAAgsAAAAEFgAAAIEFAABAYAEAABBYAAAAILAAAAAILAAAAAILAAAABBYAAACBBQAAQGABAACAwAIAACCwAAAACCwAAAAQ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";
undefined;

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
		toGetCaseType:function methods(value) {
			if(value){
				var res ='';
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

	htmlTemp=htmlTemp.replace("../watermark.png",backgroundImgData);

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
		};
		infoInput(data.A10101);
	}else{
		var infoInput2 = function (source) {
			htmlTemp = htmlTemp.replace(/{info.name}/g, source.name||'--');
			htmlTemp = htmlTemp.replace(/{info.number}/g, source.number||'--');
		};
		infoInput2(data.B10101);
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
};