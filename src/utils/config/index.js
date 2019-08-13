import dropDown from './dropdown';

const _msieBrowser = /msie/i.test(navigator.userAgent);
const GLOBAL_UTIL_DROPDOWN = dropDown;

global.GLOBAL_UTIL_DROPDOWN = GLOBAL_UTIL_DROPDOWN;
global.GLOBAL_MEIE_BROWSER = _msieBrowser;
