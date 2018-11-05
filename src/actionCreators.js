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
}

export { setToken, setQuery };