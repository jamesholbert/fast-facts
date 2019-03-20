import React, { useState, useEffect, Fragment } from 'react'

import styled from 'styled-components'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const Container = styled.div`
	position: fixed;
	transition-duration: 1s;
	bottom: ${props => props.defeated ? '-200%' : '175px'};
	height: ${props=>props.height}px;
	width: auto;
`

const BaddieImg = styled.img`
	max-height: ${props=>props.maxHeight}px;
	height: auto;
	width: auto;
	bottom: 0px;
	position: absolute;
`

const LifeBarContainer = styled.div`
	position: fixed;
	right: ${props=>props.right};
	width: ${props=>props.width};
	bottom: 150px;
	font-size: 30px;
`

const Baddie = ({ defeated, hp, maxHp, right, url, name, dimensions, doingBattle, windowHeight, damaged }) => {
	if(!doingBattle){return <span />}
	const [ left, setLeft ] = useState('150%')
	const [ tallerThanWide, setTallerThanWide ] = useState('unset')
	const [ healthBarWidth, setHealthBarWidth ] = useState('100px')

	useEffect(()=>{
		setTimeout(()=>{
			setLeft(dimensions.left)
			setHealthBarWidth(dimensions.width)
		}, 5)
	}, [])

	useEffect(()=>{
		if(hp < maxHp){
			setLeft('100%')
			setTimeout(()=>{
				setLeft(dimensions.left)
			}, 100)
		}
	}, [hp])

	const style = right ? {left: '150%'} : {left}
	
	return <Fragment>
		<Container 
			{...{tallerThanWide, dimensions, defeated, style}} 
			height={windowHeight*dimensions.heightRatio}
		>
			<BaddieImg 
				src={url}
				maxHeight={windowHeight*dimensions.heightRatio}
			/>
		</Container>
		<LifeBarContainer width={healthBarWidth} right={dimensions.lifeBarRight}>
			{name}
			<Progress 
				percent={Math.round(hp/maxHp*100)}
			/>
		</LifeBarContainer>
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