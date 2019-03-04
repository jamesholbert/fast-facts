// Create a higher-order reducer; functions similarly to a higher-order component.
// Takes a reducer function and returns a new reducer with all the action types
// prefixed with the given prefix
export const withPrefixedAction = actionTypePrefix => reducerFunction => (
	state,
	{ type, ...rest }
) =>
	reducerFunction(state, {
		type:
			type && type.indexOf(actionTypePrefix + '_') === 0
				? type.substring((actionTypePrefix + '_').length)
				: null,
		...rest
	});

// Takes a reducer and gives it a new default state value
export const withDefault = defaultValue => reducerFunction => (
	state = defaultValue,
	action
) => reducerFunction(state, action);
