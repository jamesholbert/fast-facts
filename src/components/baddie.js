import React, { useState, Fragment } from 'react'

import styled from 'styled-components'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const checkTallerThanWide = ({target: {offsetHeight, offsetWidth}}) => offsetHeight > offsetWidth


const dynamicHeight = ({ tallerThanWide, dimensions }) => {
	if(tallerThanWide === 'unset'){return ''}
	if(tallerThanWide){return dimensions.height}
	return 'auto'
}
const dynamicWidth = ({ tallerThanWide, dimensions }) => {
	if(tallerThanWide === 'unset'){return ''}
	if(tallerThanWide){return 'auto'}
	return dimensions.height
}

const Container = styled.div`
	position: fixed;
	height: ${props => props.dimensions.height};
	transition-duration: 1s;
	bottom: ${props => props.defeated ? '-200%' : props.dimensions.bottom};
	height: ${props => dynamicHeight(props)}
	width: ${props => dynamicWidth(props)}
`

const BaddieImg = styled.img`
	height: 100%;
	width: auto;
`

const LifeBarContainer = styled.div`
	position: fixed;
	right: ${props=>props.right};
	width: ${props=>props.width};
	bottom: 20%;
	font-size: 30px;
`

const Baddie = ({ defeated, hp, maxHp, right, url, name, dimensions, doingBattle }) => {
	if(!doingBattle){return <span/>}
	const [ left, setLeft ] = useState('150%')
	const [ tallerThanWide, setTallerThanWide ] = useState('unset')
	const [ healthBarWidth, setHealthBarWidth ] = useState('100px')

	setTimeout(()=>{
		setLeft(dimensions.left)
		setHealthBarWidth(dimensions.width)
	}, 5)

	const styles = right ? {left: '150%'} : {left}

	return <Fragment>
		{doingBattle &&
			<>
			<Container 
				{...{tallerThanWide, dimensions, defeated}} 
				style={styles}
			>
				<BaddieImg 
					src={url}
					onLoad={t=>setTallerThanWide(checkTallerThanWide(t))}
				/>
			</Container>
			<LifeBarContainer width={healthBarWidth} right={dimensions.lifeBarRight}>
				{name}
				<Progress 
					percent={Math.round(hp/maxHp*100)}
				/>
			</LifeBarContainer>
			</>
		}
	</Fragment>
}
Baddie.defaultProps = {
	defeated: false,
	hp: 1000,
	maxHp: 1000,
	right: false,
	isBoss: false
}

export default Baddie