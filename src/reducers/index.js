import { combineReducers, compose } from 'redux';

import primitiveReducer from './primitive';

import { withPrefixedAction, withDefault } from './utils';

const rootReducer = combineReducers({
	mathType: withPrefixedAction('MATH_TYPE')(primitiveReducer),
	player: combineReducers({
		name: compose(withPrefixedAction('PLAYER_NAME'), withDefault(''))(primitiveReducer),
		hp: compose(withPrefixedAction('PLAYER_HP'), withDefault(100))(primitiveReducer),
		maxHp: compose(withPrefixedAction('PLAYER_MAX_HP'), withDefault(100))(primitiveReducer)
	}),
	baddie: combineReducers({
		name: compose(withPrefixedAction('BADDIE_NAME'), withDefault(''))(primitiveReducer),
		hp: compose(withPrefixedAction('BADDIE_HP'), withDefault(0))(primitiveReducer),
		maxHp: compose(withPrefixedAction('BADDIE_MAX_HP'), withDefault(100))(primitiveReducer)
	}),
	currentChat: compose(withPrefixedAction('CURRENT_CHAT'), withDefault(''))(primitiveReducer),
	currentAnswers: compose(withPrefixedAction('CURRENT_ANSWERS'), withDefault([]))(primitiveReducer),
	damage: withPrefixedAction('DAMAGE')(primitiveReducer),
	location: compose(withPrefixedAction('LOCATION'), withDefault(0))(primitiveReducer)
});

export default rootReducer;

export const mathType = store => store.mathType
export const playerName = store => store.player.name
export const playerHp = store => store.player.hp
export const playermaxHp = store => store.player.maxHp
export const baddieName = store => store.baddie.name
export const baddieHp = store => store.baddie.hp
export const baddieMaxHp = store => store.baddie.maxHp
export const currentChat = store => store.currentChat
export const currentAnswers = store => store.currentAnswers
export const damage = store => store.damage
export const location = store => store.location