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
	height: ${props=>props.mobileView ? props.maxHeight+'px' : 'auto'};
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

const Baddie = ({ defeated, hp, maxHp, right, url, name, dimensions, doingBattle, windowHeight, damaged, mobileView }) => {
	if(!doingBattle){return <span />}
	const [ left, setLeft ] = useState('150%')
	const [ healthBarWidth, setHealthBarWidth ] = useState('100px')

	useEffect(()=>{
		setTimeout(()=>{
			setLeft(mobileView ? '50%' : dimensions.left)
			setHealthBarWidth(dimensions.width)
		}, 5)
	}, [])

	useEffect(()=>{ // hurt animation
		if(hp < maxHp){
			setLeft('100%')
			setTimeout(()=>{
				setLeft(mobileView ? '50%' : dimensions.left)
			}, 100)
		}
	}, [hp])

	const height= windowHeight * dimensions.heightRatio * (mobileView ? .75 : 1)
	const style = right ? {left: '150%'} : {left}
	
	return <Fragment>
		<Container 
			{...{dimensions, defeated, style}} 
			height={height}
		>
			<BaddieImg 
				mobileView={mobileView}
				src={url}
				maxHeight={height}
			/>
		</Container>
		{hp > 0 && <LifeBarContainer width={healthBarWidth} right={dimensions.lifeBarRight}>
			{name}
			<Progress 
				percent={Math.round(hp/maxHp*100)}
			/>
		</LifeBarContainer>}
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