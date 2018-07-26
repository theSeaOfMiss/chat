import {INI_RECORDS} from "../actions/chat-records-action";

export default function (state={record: []}, action) {
	switch (action.type) {

		case INI_RECORDS: {
			return {
				record : [...action.payload]
			}
		}


		default:
			return state;
	}
}