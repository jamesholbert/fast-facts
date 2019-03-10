import { combineReducers, compose } from 'redux';

import primitiveReducer from './primitive';

import { withPrefixedAction, withDefault } from './utils';

const rootReducer = combineReducers({
	maxLevel: compose(withPrefixedAction('MAX_LEVEL'), withDefault(3))(primitiveReducer),
	mathType: withPrefixedAction('MATH_TYPE')(primitiveReducer),
	player: combineReducers({
		gil: compose(withPrefixedAction('GIL'), withDefault(0))(primitiveReducer),
		level: compose(withPrefixedAction('LEVEL'), withDefault(2))(primitiveReducer),
		name: withPrefixedAction('PLAYER_NAME')(primitiveReducer),
		hp: compose(withPrefixedAction('PLAYER_HP'), withDefault(100))(primitiveReducer),
		maxHp: compose(withPrefixedAction('PLAYER_MAX_HP'), withDefault(100))(primitiveReducer),
		speed: compose(withPrefixedAction('PLAYER_SPEED'), withDefault(0))(primitiveReducer),
		multiplier: compose(withPrefixedAction('PLAYER_MULTIPLIER'), withDefault(0))(primitiveReducer),
	}),
	baddie: combineReducers({
		name: withPrefixedAction('BADDIE_NAME')(primitiveReducer),
		hp: compose(withPrefixedAction('BADDIE_HP'), withDefault(0))(primitiveReducer),
		maxHp: compose(withPrefixedAction('BADDIE_MAX_HP'), withDefault(100))(primitiveReducer)
	}),
	currentChat: withPrefixedAction('CURRENT_CHAT')(primitiveReducer),
	currentAnswers: compose(withPrefixedAction('CURRENT_ANSWERS'), withDefault([]))(primitiveReducer),
	damage: withPrefixedAction('DAMAGE')(primitiveReducer),
	location: compose(withPrefixedAction('LOCATION'), withDefault('intro1'))(primitiveReducer),
	dragonsDefeated: compose(withPrefixedAction('DRAGONS_DEFEATED'), withDefault(0))(primitiveReducer),
	savedPlayers: compose(withPrefixedAction('SAVED_PLAYERS'), withDefault([]))(primitiveReducer)
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
export const playerLevel = store => store.player.level
export const maxLevel = store => store.maxLevel
export const gil = store => store.player.gil
export const dragonsDefeated = store => store.dragonsDefeated
export const playerSpeed = store => store.player.speed
export const playerMultiplier = store => store.player.multiplier
export const savedPlayers = store => store.savedPlayers