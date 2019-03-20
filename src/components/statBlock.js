import React, { useState } from 'react'

import styled from 'styled-components'

import LevelSelector, { ChoiceContainer } from './levelSelector'

const Container = styled.div`
	position: fixed;
	top: 20px;
	left: 20px;
	border: 2px solid darkgrey;
	border-radius: 5px;
	background-color: black;
	color: white;
	padding: 15px;
	min-height: 180px;
	min-width: 200px;
`

const NameContainer = styled.div`
	width: 100%;
	text-align: center;
	font-size: 20px;
`

const StatContainer = styled.div`
	width: 100%;
	font-size: 20px;
	margin: 15px;
`

const TextContainer = styled.span`
	color: white;
`

const StatBlock = ({ name, level, gil, dragonsDefeated, doingBattle, onSave, playerMultiplier, playerSpeed }) => {
	const [ saved, setSaved] = useState(false)

	const saveClick = () => {
		setSaved(true)
		setTimeout(()=>setSaved(false), 2000)
	}

	return name && <Container>
		<NameContainer>{name}</NameContainer>
		<LevelSelector {...{doingBattle}} />
		<StatContainer>Gil: {gil}</StatContainer>
		<StatContainer>Sword level: {playerMultiplier}</StatContainer>
		<StatContainer>Speed level: {playerSpeed}</StatContainer>
		<StatContainer>Dragons Defeated: {dragonsDefeated}</StatContainer>
	</Container>
}

export default StatBlock