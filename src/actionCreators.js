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
};

const setAlbum = album => {
	return {
		type: 'SET_ALBUM',
		album: album
	}
}

export { setToken, setQuery, artistsList, setArtist, setAlbum };