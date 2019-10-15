import TableBusinessChange from './businessChange';
import TableAbnormalOperation from './abnormalOperation';
import TableIllegal from './illegal';
import TableTaxViolation from './taxViolation';
import TablePenalties from './penalties';
import TableEnvironmentalPunishment from './environmentalPunishment';

export default {
	YC030301: TableAbnormalOperation,
	YC030302: TableBusinessChange,
	YC030303: TableIllegal,
	YC030304: TableTaxViolation,
	YC030305: TablePenalties,
	YC030306: TableEnvironmentalPunishment,
};
