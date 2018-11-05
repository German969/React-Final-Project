const setToken = token => {
	return {
        type:"TOKEN",
        token: token
      }
};

const setQuery = query => {
	return {
		type: 'QUERY',
		query: query
	}
};

const artistsList = data => {
	return {
		type: 'ARTISTS_LIST',
		artistsList: data
	}
};

const setArtist = artist => {
	return {
		type: 'SET_ARTIST',
		artist: artist
	}
}

export { setToken, setQuery, artistsList, setArtist };