export const ADD_TO_LIST = 'ADD_TO_LIST';
export const INI_LIST = 'INI_LIST';

export function addToLIST(name) {
	return {
		type: ADD_TO_LIST,
		payload: name,
	}
}

export function iniList(name) {
	return {
		type: INI_LIST,
		payload: name,
	}
}