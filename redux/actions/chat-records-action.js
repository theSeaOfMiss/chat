export const INI_RECORDS = 'INI_RECORDS';

export function iniRecords(records) {
	return {
		type: INI_RECORDS,
		payload: records,
	}
}