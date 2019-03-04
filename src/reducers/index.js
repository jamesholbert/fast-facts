import { combineReducers, compose } from 'redux';

import primitiveReducer from './primitive';

import { withPrefixedAction, withDefault } from './utils';

const rootReducer = combineReducers({
	// baseProject: combineReducers({
	// 	focusTileId: compose(withPrefixedAction('FOCUS_TILE_ID'), withDefault(null))(
	// 		primitiveReducer
	// 	),
	// 	rootId: compose(withPrefixedAction('ROOT_ID'), withDefault(null))(
	// 		primitiveReducer
	// 	),
	// 	locations: locationsReducer,
	// 	projectName: compose(withPrefixedAction('PROJECT_NAME'), withDefault(null))(
	// 		primitiveReducer
	// 	),
	// 	projectId: compose(withPrefixedAction('PROJECT_ID'), withDefault(null))(
	// 		primitiveReducer
	// 	),
	// 	defaultTileHeight: compose(withPrefixedAction('DEFAULT_TILE_HEIGHT'), withDefault('150px'))(
	// 		primitiveReducer
	// 	),
	// 	condenseNavTree: compose(withPrefixedAction('CONDENSE_NAV_TREE'), withDefault(false))(
	// 		primitiveReducer
	// 	),
	// 	gridColumns: compose(withPrefixedAction('GRID_COLUMNS'), withDefault(3))(
	// 		primitiveReducer
	// 	),
	// 	recentLocations: compose(withPrefixedAction('RECENT_LOCATIONS'), withDefault([]))(
	// 		primitiveReducer
	// 	),
	// 	unsavedWork: compose(withPrefixedAction('UNSAVED_WORK'), withDefault(false))(primitiveReducer),
	// 	haltFurtherActions: compose(withPrefixedAction('HALT_FURTHER_ACTIONS'), withDefault(false))(primitiveReducer)
	// }),
	// availableProjects: compose(withPrefixedAction('AVAILABLE_PROJECTS'), withDefault([]))(primitiveReducer),
	// userName: compose(withPrefixedAction('USERNAME'), withDefault(null))(primitiveReducer),
	// dragTile: compose(withPrefixedAction('DRAG_TILE'), withDefault(null))(primitiveReducer),
	// tagSearchText: compose(withPrefixedAction('TAG_SEARCH_TEXT'), withDefault(''))(primitiveReducer),
	mathType: compose(withPrefixedAction('MATH_TYPE'), withDefault(null))(primitiveReducer),
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
	currentAnswers: compose(withPrefixedAction('CURRENT_ANSWERS'), withDefault([]))(primitiveReducer)
});

export default rootReducer;

export const mathType = store => store.mathType
export const playerName = store => store.player.name
export const playerHp = store => store.player.hp
export const playermaxHp = store => store.player.maxHp
export const baddieName = store => store.baddie.name
export const baddieHp = store => store.baddie.hp
export const baddiemaxHp = store => store.baddie.maxHp
export const currentChat = store => store.currentChat
export const currentAnswers = store => store.currentAnswers

// export const focusTileId = store => store.baseProject.focusTileId
// export const rootId = store => store.baseProject.rootId
// export const locations = store => store.baseProject.locations
// export const projectName = store => store.baseProject.projectName
// export const projectId = store => store.baseProject.projectId
// export const defaultTileHeight = store => store.baseProject.defaultTileHeight
// export const condenseNavTree = store => store.baseProject.condenseNavTree
// export const gridColumns = store => store.baseProject.gridColumns
// export const recentLocations = store => store.baseProject.recentLocations
// export const availableProjects = store => store.availableProjects
// export const userName = store => store.userName
// export const unsavedWork = store => store.baseProject.unsavedWork
// export const dragTile = store => store.dragTile
// export const tagSearchText = store => store.tagSearchText
// export const notifications = store => store.notifications
// export const floatingTileWidth = store => store.floatingTile.width
// export const floatingTileId = store => store.floatingTile.id
// export const floatingTileOffscreen = store => store.floatingTile.offscreen
// export const floatingTilePositionRight = store => store.floatingTile.positionRight