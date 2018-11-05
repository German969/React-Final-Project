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
	} else if (action.type == 'ARTISTS_LIST') {
		return {
			...state,
			artistsList: action.artistsList
		}
	} else if (action.type == 'SET_ARTIST') {
		return {
			...state,
			artist: action.artist
		}
	} else if (action.type == 'SET_ALBUM') {
		return {
			...state,
			album: album
		}
	}

	return state;
}

export default createStore(reducer, { token: null, query: null, artistsList: [], artist: null, album: null });