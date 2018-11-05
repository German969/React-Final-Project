import { createStore } from 'redux';

const reducer = (state,action) => {

	if (action.type == 'TOKEN') {
		console.log('guardando token');
		console.log(action.token);
		return {
			...state,
			token: action.token
		};
	}

	return state;
}

export default createStore(reducer, { token: null });