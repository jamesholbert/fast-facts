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
`

const Sword = ({ left }) => <Container style={{left}}><SwordImage src={swordUrl} /></Container>
Sword.defaultProps = {
	left: '20px'
}

export default Sword