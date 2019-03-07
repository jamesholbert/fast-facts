import React, { useState, useRef } from 'react'

import styled from 'styled-components'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import { baitUrl } from '../helpers'

const Container = styled.div`
	position: fixed;
	height: 100px;
	transition-duration: 1s;
	top: ${props => props.defeated ? '200%' : '40%'};
`

const BaddieImg = styled.img`
	height: 100%;
`

const Baddie = ({ defeated, hp, maxHp }) => {
	const [ left, setLeft ] = useState('150%')

	setTimeout(()=>{
		setLeft('70%')
	}, 5)

	return <Container defeated={defeated} style={{left}}>
		<BaddieImg src={baitUrl} />
		<Progress percent={Math.round(hp/maxHp*100)} />
	</Container>
}
Baddie.defaultProps = {
	defeated: false
}

export default Baddie