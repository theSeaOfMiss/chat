import { combineReducers } from 'redux';
import friendsList from './friends-list-reducer'
import chatRecords from './chat-records-reducer'

const allReducers = {
	friendsList: friendsList,
	chatRecords: chatRecords,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;