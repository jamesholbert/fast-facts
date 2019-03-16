import React from 'react';

import styled from 'styled-components'
import Typist from 'react-typist'

import Grid, { Cell } from './grid'
import { npcUrls } from '../helpers'

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
	height: 70px;
`

export const FancyButton = styled.button`
	border: solid 1px yellow;
	border-radius: 5px;
	background: ${props => props.disabled ? 'grey' : 'black'};
	color: yellow;
	padding: 10px;
	min-width: 100px;
	// min-width: 100px;
	min-height: 50%;
	font-size: 15px;
	margin: 0 15px;
	cursor: ${props => props.disabled ? '' : 'pointer'};
`

const Avatar = styled.img`
	height: 450%;
	width: auto;
	position: absolute
	bottom: -200px;
	left: 10px;
`

const ChatBox = ({ avatar, choices, children }) => {
	const answerColumns = choices.length > 5 ? 5 : choices.length
	const textColumns = choices.length > 5 ? 4 : 9 - choices.length
	return <FancyDiv>
		<Grid numColumns={10}>
			{avatar && 
				<Cell>
					<Avatar src={avatar} />
				</Cell>
			}
			<Cell span={textColumns}>
				<Typist 
					avgTypingDelay={10} 
					startDelay={100} 
					cursor={{show: false}}
					key={children}
				>
					{children}
				</Typist>
			</Cell>
			<Cell span={answerColumns}><Grid numColumns={answerColumns}>{choices}</Grid></Cell>
		</Grid>
	</FancyDiv>
}
ChatBox.defaultProps = {
	avatar: npcUrls.rayla
}
export default ChatBox

