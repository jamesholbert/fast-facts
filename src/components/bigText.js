import React, { useState } from 'react'

import styled from 'styled-components'

const Container = styled.div`
	transition-duration: .5s;
	position: fixed;
	font-size: 150px;
	color: ${props => props.color};
	transition-timing-function: ease-out;
    transition-timing-function: cubic-bezier(0, 0, .2, 1);
    top: 40%;
`

const BigText = ({ text, color, right }) => {
	const [ left, setLeft ] = useState(right ? '30%' : '70%')

	setTimeout(()=>{
		setLeft(right ? '60%' : '40%')
	}, 5)

	return <Container style={{left}} color={color} >
		{text}
	</Container>
}
BigText.defaultProps = {
	color: 'white',
	right: false
}

export default BigText