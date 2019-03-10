import React from 'react';

import styled from 'styled-components'

import { swordUrl } from '../helpers'

const Container = styled.div`
	position: fixed;
	height: 150px;
	top: 40px;
	transform: rotate(25deg);
`

const SwordImage = styled.img`
	height: 100%;
	transform: scale(${props => props.percent});
	filter: ${props => props.sepia ? 'sepia(100%)' : 'none'};
`

const Sword = ({ left, percent, sepia }) => <Container style={{left}}><SwordImage sepia={sepia} percent={percent} src={swordUrl} /></Container>
Sword.defaultProps = {
	left: '20px'
}

export default Sword