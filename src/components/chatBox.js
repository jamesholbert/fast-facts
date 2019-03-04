import React from 'react';

import styled from 'styled-components'
import Typist from 'react-typist'

import Grid, { Cell } from './grid'
import { marioUrl } from '../helpers'

const FancyDiv = styled.div`
	background-color: black;
	color: white;
	border-top: 3px dotted lightgrey;
	border-bottom: 3px dotted lightgrey;
	box-shadow: inset 0 -1px 0 0 lightgrey, inset 0 1px 0 0 lightgrey, 0 1px 0 0 lightgrey, 0 -1px 0 0 lightgrey;
	margin-bottom: 1px;
	width: 100%;
	padding: 25px 0;
	font-size: 25px;
	text-align: center;
	position: fixed;
	bottom: 20px;
`

export const FancyButton = styled.button`
	border: solid 1px yellow;
	border-radius: 5px;
	background: black;
	color: yellow;
	padding: 10px;
	width: 100px;
	min-height: 50%;
	font-size: 15px;
	margin: 0 15px;
	cursor: pointer;
`

const MarioImage = styled.img`
	height: 150%;
	width: auto;
	position: absolute
	bottom: 10px;
	left: 10px;
`

const ChatBox = ({ children, choices }) => {
	return <FancyDiv>
		<Grid numColumns={10}>
			<Cell>
				<MarioImage src={marioUrl} />
			</Cell>
			<Cell span={9 - choices.length}>
				<Typist 
					avgTypingDelay={10} 
					startDelay={100} 
					cursor={{show: false}}
				>
					{children}
				</Typist>
			</Cell>
			<Cell span={choices.length}>{choices}</Cell>
		</Grid>
	</FancyDiv>
}
export default ChatBox

