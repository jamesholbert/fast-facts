import React, { useState, Fragment } from 'react'

import styled from 'styled-components'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const checkTallerThanWide = ({target: {offsetHeight, offsetWidth}}) => offsetHeight > offsetWidth
const dimensions = {
	boss: {
		height: '65%',
		width: '50%',
		left: '60%',
		bottom: '20%'
	},
	smallFry: {
		height: '30%',
		width: '25%',
		left: '70%',
		bottom: '25%'
	}
}

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
`

const BaddieImg = styled.img`
	height: 100%;
	width: auto;
`

const LifeBarContainer = styled.div`
	position: fixed;
	right: ${props=>props.isBoss ? '15px' : '10%'};
	width: ${props=>props.width};
	bottom: 20%;
	font-size: 30px;
`

const Baddie = ({ defeated, hp, maxHp, right, url, name, isBoss }) => {
	const [ left, setLeft ] = useState('150%')
	const [ tallerThanWide, setTallerThanWide ] = useState('unset')
	const [ healthBarWidth, setHealthBarWidth ] = useState('100px')
	const type = isBoss ? 'boss' : 'smallFry'

	setTimeout(()=>{
		setLeft(dimensions[type].left)
		setHealthBarWidth(dimensions[type].width)
	}, 5)

	const styles = right ? {left: '150%'} : {left}

	return <Fragment>
		<Container 
			{...{tallerThanWide}} 
			dimensions={dimensions[type]} 
			isBoss={isBoss} 
			defeated={defeated} 
			style={styles}
		>
			<BaddieImg 
				src={url} 
				isBoss={isBoss} 
				onLoad={t=>setTallerThanWide(checkTallerThanWide(t))}
			/>
		</Container>
		<LifeBarContainer width={healthBarWidth} {...{isBoss}}>
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
	// url: 'https://images-na.ssl-images-amazon.com/images/I/51lh93vBeRL._SY679_.jpg',
	// name: 'Baddie McBadderton',
	isBoss: false
}

export default Baddie