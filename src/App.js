import React, { Component, useState, useEffect, useRef } from 'react';

import styled from 'styled-components'

import logo from './logo.svg';
import './App.css';

import ChatBox, { FancyButton } from './components/chatBox'
import GrowthBar from './components/growthBar'

import { backgrounds, mathChoices, getQuestion } from './helpers'

const Container = styled.div`
  background-image: url(${backgrounds.countrySide});
  height: ${window.innerHeight}px;
  width: auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const App = () => {
  const [ currentChat, setCurrentChat ] = useState(null)
  const [ currentBar, setCurrentBar ] = useState(null)
  const [ mathType, setMathType ] = useState('addition')
  const [ currentQuestion, setCurrentQuestion ] = useState(null)

  const [ currentAnswers, setCurrentAnswers ] = useState(mathChoices.map(type=><FancyButton 
    key={type.type}
    onClick={()=>setCurrentQuestion(getQuestion(type).question)}
  >
    {type.symbol}
  </FancyButton>))

  useEffect(()=>{
    const firstQuestion = setTimeout(()=>setCurrentQuestion('Hello there! What type of facts would you like to learn?'), 1000)
  }, [])

  return (
    <Container>
      {currentBar}
      {/*<GrowthBar initialTime={100} decrement={1} onTimeout={()=>{}} />*/}
      {currentQuestion && 
        <ChatBox
          choices={currentAnswers}
        >
          {currentQuestion}
        </ChatBox>
      }
    </Container>
  )
}

export default App;

