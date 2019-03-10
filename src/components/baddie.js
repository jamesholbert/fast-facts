import React, { useState } from 'react'

import styled from 'styled-components'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const Container = styled.div`
	position: fixed;
	height: ${props => props.isDragon ? '70%' : '100px'};
	transition-duration: 1s;
	top: ${props => props.defeated ? '200%' : props.isDragon ? '5%' : '30%'};
`

const BaddieImg = styled.img`
	height: 100%;
	width: auto;

`

const Baddie = ({ defeated, hp, maxHp, right, url, name, isDragon }) => {
	const [ left, setLeft ] = useState('150%')

	setTimeout(()=>{
		setLeft(isDragon ? '60%' : '70%')
	}, 5)

	const styles = right ? {left: '150%'} : {left}

	return <Container isDragon={isDragon} defeated={defeated} style={styles}>
		<BaddieImg src={url} isDragon={isDragon} />
		<Progress percent={Math.round(hp/maxHp*100)} />
		{name}
	</Container>
}
Baddie.defaultProps = {
	defeated: false
}

export default Baddie