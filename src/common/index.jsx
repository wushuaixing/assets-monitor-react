import Tabs from './tabs';
import Badge from './badge';
import Button from './button';
import Input from './input';
import Spin from './spin';
import Download from './download';
import Table from './commonTable';
import SelectedNum from './selectedNum';
import Ellipsis from './ellipsis';
import Icon from './icon';
import NoContent from './noContent';

const timeRule = {
	disabledStartDate: (startValue, endValue) => {
		if (!startValue || !endValue) {
			return false;
		}
		const _endValue = new Date(endValue);
		_endValue.setHours(23, 59, 59, 0);
		return startValue.getTime() >= _endValue.getTime();
	},
	disabledEndDate: (endValue, startValue) => {
		if (!startValue || !endValue) {
			return false;
		}
		const _startValue = new Date(startValue);
		_startValue.setHours(0, 0, 0, 0);
		return endValue.getTime() < new Date(_startValue).getTime();
	},
};

export {
	Tabs, Badge, Button, Input, Spin, timeRule, Download, Table, SelectedNum, Ellipsis, Icon, NoContent,
};
