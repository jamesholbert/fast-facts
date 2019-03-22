import React, { Fragment } from 'react';

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
	padding: ${props=>props.mobileView ? '5px 0' : '25px 0'};
	font-size: ${props=>props.mobileView ? '15px' : '25px'};
	text-align: center;
	position: fixed;
	bottom: ${props=>props.mobileView ? '0' : '20px'};
	height: ${props=>props.mobileView ? '100px' : '70px'};
	overflow: auto;
`

export const FancyButton = styled.button`
	border: solid 1px yellow;
	border-radius: 5px;
	background: ${props => props.disabled ? 'grey' : 'black'};
	color: yellow;
	padding: 10px;
	min-width: ${props=>props.mobileView ? '40px' : '100px'};
	min-height: 50%;
	font-size: 15px;
	margin: 0 15px;
	cursor: ${props => props.disabled ? '' : 'pointer'};
`

const Avatar = styled.img`
	height: ${props=>props.mobileView ? '45%' : '550px'};
	position: absolute
	bottom: ${props=>props.mobileView ? '100px' : '-200px'};
	left: 10px;
	z-index: 100;
`

const ChatBox = ({ avatar, choices, children, mobileView }) => {
	if(!children){return <span />}
	const textColumns = choices.length > 5 ? 4 : 8 - choices.length

	return <Fragment>
		<Avatar 
			src={avatar || undefined} 
			mobileView={mobileView}
		/>
		<FancyDiv mobileView={mobileView}>
			<Grid
				numColumns={mobileView ? 6 : 10}
				gap={mobileView ? '5px' : '15px'}
			>
				{!mobileView && <Cell span={2}/>}
				<Cell span={mobileView ? 6 : textColumns}>
					<Typist 
						avgTypingDelay={10} 
						startDelay={100} 
						cursor={{show: false}}
						key={children}
					>
						{children}
					</Typist>
				</Cell>
				{choices}
			</Grid>
		</FancyDiv>
	</Fragment>
}
ChatBox.defaultProps = {
	avatar: npcUrls.rayla
}
export default ChatBox

