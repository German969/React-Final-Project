import { createStore } from 'redux';

const reducer = (state,action) => {

	if (action.type == 'TOKEN') {
		return {
			...state,
			token: action.token
		};
	} else if (action.type == 'QUERY') {
		return {
			...state,
			query: action.query
		}
	}

	return state;
}

export default createStore(reducer, { token: null, query: null });