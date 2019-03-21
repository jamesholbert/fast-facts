import React from 'react';

import styled from 'styled-components'

import { swordUrl } from '../helpers'

const Container = styled.div`
	position: fixed;
	height: ${props=>props.mobileView ? '75px' : '150px'};
	top: 40px;
	transform: rotate(25deg);
`

const SwordImage = styled.img`
	height: 100%;
	transform: scale(${props => props.percent});
	filter: ${props => props.sepia ? 'sepia(100%)' : 'none'};
`

const Sword = ({ left, percent, sepia, mobileView }) => <Container
	mobileView={mobileView}
	style={{left}}
>
	<SwordImage 
		sepia={sepia} 
		percent={percent} 
		src={swordUrl} 
	/>
</Container>
Sword.defaultProps = {
	left: '20px'
}

export default Sword