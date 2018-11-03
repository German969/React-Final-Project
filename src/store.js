import { createStore } from 'redux';

const reducer = (state, action) => {

	if(action.type == 'FAVS') {
		return {
			...state,
			favs: action.favs
		}
	} else if (action.type == 'TOKEN') {
		return {
			...state,
			token: action.token
		}
	}

	return state;
};

export default createStore(reducer, { favs: [], token: null });