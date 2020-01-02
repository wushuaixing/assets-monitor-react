
const _msieBrowser = /msie/i.test(navigator.userAgent) && !(/msie 10/i.test(navigator.userAgent));

const _tableCreateTimeText = '更新日期';

global.REQ_STATUS = '';
global.GLOBAL_MEIE_BROWSER = _msieBrowser;
global.Table_CreateTime_Text = _tableCreateTimeText;
