const primitiveReducer = (state = null, { type, value }) => {
	switch (type) {
		case 'SET':
			return value;
		default:
			return state;
	}
};

export default primitiveReducer;
