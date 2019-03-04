const primitiveReducer = (state = null, { type, value }) => {
	// console.log(value)
	switch (type) {
		case 'SET':
			return value;
		default:
			return state;
	}
};

export default primitiveReducer;
