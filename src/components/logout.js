import React from 'react'

import styled from 'styled-components'

const Container = styled.button`
	position: fixed;
	top: 10px;
	right: 10px;
	border: 0px;
	border-radius: 5px;
	background: black;
	color: white;
	padding: 10px;
`

const LogoutButton = ({ onClick, name }) => !name ? <span/> : <Container onClick={onClick}>Logout</Container>

export default LogoutButton