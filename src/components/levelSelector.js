import React, { useState } from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components';

import Grid from './grid'

import * as FromStore from '../reducers'

const Container = styled.button`
	border: solid yellow 1px;
	border-radius: 5px;
	padding: 15px;
	background-color: black;
	color: white;
	position: relative;
	cursor: ${props => props.doingBattle ? '' : 'pointer'};
	width: 100%;
	margin-top: 10px;
`

export const ChoiceContainer = styled.button`
	cursor: pointer;
	border: solid 1px ${({ color }) => color};
	border-radius: 10px;
	padding: 5px 10px;
	color: white;
	background-color: black;
	min-width: 30px;
`

const LevelChoice = ({ top, text, onClick, borderColor, focusBorderColor, onMouseExit, onSelect }) => {
	const [ focus, setFocus ] = useState()

	return <ChoiceContainer
		onClick={onSelect}
		top={top}
		color={focus ? borderColor : focusBorderColor}
		onMouseEnter={()=>setFocus(true)}
		onMouseLeave={()=>setFocus(false)}
	>
		{text}
	</ChoiceContainer>
}
LevelChoice.defaultProps = {
	onClick: ()=>{},
	borderColor: 'grey',
	focusBorderColor: 'yellow'
}

const addLevelChoice = (level, onSelect) => <LevelChoice top={level} key={level} text={level} onSelect={onSelect} />

const LevelSelector = ({ level, maxLevel, onSelect, doingBattle }) => {
	const [ open, setOpen ] = useState()

	if(open){
		let levelChoices = []
		for(let i = 0; i<maxLevel+1; i++){
			levelChoices.push(
				addLevelChoice(i, ()=>{onSelect(i);setOpen(false);})
			)
		}
		levelChoices.push(addLevelChoice(10, ()=>{onSelect(10);setOpen(false);}))
		return <span onMouseLeave={()=>setOpen(false)}>
			<Grid 
				numColumns={3}
			>
				{levelChoices}
			</Grid>
		</span>
	}
	else {
		return <Container
			onClick={()=>doingBattle ? {} : setOpen(true)}
			doingBattle={doingBattle}
			disabled={doingBattle}
		>
			Level {level}
		</Container>
	}
}
LevelSelector.defaultProps = {
	level: 1,
	maxLevel: 1,
	onSelect: ()=>{}
}

const ConnectedLevelSelector = connect(
	state => ({
		level: FromStore.playerLevel(state),
		maxLevel: FromStore.maxLevel(state)
	}),
	dispatch => ({
		onSelect: value => {
			dispatch({ type: 'LEVEL_SET', value })
		}
	})
)(LevelSelector)

export default ConnectedLevelSelector
