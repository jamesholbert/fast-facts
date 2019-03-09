import React from 'react'

import styled from 'styled-components'

import LevelSelector from './levelSelector'

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
	margin-top: 20px;
`

const StatBlock = ({ name, level, gil, dragonsDefeated, doingBattle }) => {
	return name && <Container>
		<NameContainer>{name}</NameContainer>
		<LevelSelector {...{doingBattle}} />
		<StatContainer>Gil: {gil}</StatContainer>
		<StatContainer>Dragons Defeated: {dragonsDefeated}</StatContainer>
	</Container>
}

export default StatBlock