

import  { ADD_TO_LIST, INI_LIST }  from '../actions/friends-list-action';


export default function(state={list: []}, action) {
	switch (action.type) {
		case ADD_TO_LIST: {
			return {
				list: [...state.list, ...action.payload]
			}
		}
		case INI_LIST: {
			return{
				list: [...action.payload]
			}
		}

		default:
			return state;
	}
}