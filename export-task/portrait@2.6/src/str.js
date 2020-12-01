const fs = require('fs');

let htmlEnterprise = fs.readFileSync(__dirname + '/enterprise.html', 'utf8');
let htmlPersonal = fs.readFileSync(__dirname + '/personal.html', 'utf8');
let htmlCover = fs.readFileSync(__dirname + '/cover.html', 'utf8');
let cssResult = fs.readFileSync(__dirname + '/index.css', 'utf8');

htmlEnterprise = htmlEnterprise.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g,'').replace("___style___",cssResult);
htmlPersonal = htmlPersonal.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g,'').replace("___style___",cssResult);

htmlEnterprise = htmlEnterprise.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`);
htmlPersonal = htmlPersonal.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`);
htmlEnterprise = htmlEnterprise.replace(/\/usr\/share\/fonts\/zh_CN/g,"../../_assets/fonts");
htmlPersonal = htmlPersonal.replace(/\/usr\/share\/fonts\/zh_CN/g,"../../_assets/fonts");
htmlCover = htmlCover.replace(/\/usr\/share\/fonts\/zh_CN/g,"../../_assets/fonts");

const dev = {
	htmlCover: htmlCover.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`).replace(/\/usr\/share\/fonts\/zh_CN/g, "../../_assets/fonts"),
	htmlEnterprise: htmlEnterprise,
	htmlPersonal: htmlPersonal,
};

module.exports = {
	dev,
	htmlEnterprise,
	htmlPersonal,
	htmlCover,
	cssResult
};
