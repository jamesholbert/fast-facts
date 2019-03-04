import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import ChatBox, { FancyButton } from './components/chatBox'
import GrowthBar from './components/growthBar'

import { backgrounds, mathChoices, getQuestion } from './helpers'

import * as FromStore from './reducers'

const Container = styled.div`
  background-image: url(${backgrounds.countrySide});
  height: ${window.innerHeight}px;
  width: auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const App = ({ currentChat, currentAnswers, setCurrentChat, setCurrentAnswers, setMathType, mathType, resetBaddieHp, baddieHp, baddieMaxHp }) => {
  const [ currentBar, setCurrentBar ] = useState(0)
  const [ timer, setTimer ] = useState(null)

  useEffect(()=>{
    const firstQuestion = setTimeout(()=>setCurrentChat('Hello there! What type of facts would you like to learn?'), 1000)

    setCurrentAnswers(mathChoices.map(type=><FancyButton 
      key={type.type}
      onClick={()=>{
        const newQuestionSet = getQuestion(type)
        resetBaddieHp()
        setCurrentBar(100)
        setMathType(type.type)
        setCurrentChat(newQuestionSet.question)
        setCurrentAnswers(newQuestionSet.answers.map(answer=>getMathAnswers(answer, newQuestionSet.correctAnswer, type, setCurrentChat, setCurrentAnswers, setCurrentBar)))
      }}
    >
      {type.symbol}
    </FancyButton>))
  }, [])

  useEffect(()=>{
    if(currentBar > 0){
      setTimer(setTimeout(()=>{
        setCurrentBar(currentBar - 1)
        console.log(currentBar); 
      }, 100))
    }    
  }, [currentBar])


  return (
    <Container>
      {currentBar && 
        <GrowthBar percent={currentBar} decrement={1} onTimeout={()=>{}} />
      }
      {currentChat && 
        <ChatBox
          avatar={!mathType}
          choices={currentAnswers}
        >
          {currentChat}
        </ChatBox>
      }
    </Container>
  )
}

export { App };

const getMathAnswers = (answer, correctAnswer, type, setCurrentChat, setCurrentAnswers, setCurrentBar) => <FancyButton 
  key={answer}
  onClick={()=>{
    // setCurrentChat(answer === correctAnswer ? 'Right!' : 'Wrong')
    // setCurrentAnswers([])
    if(answer === correctAnswer){
      setCurrentBar(100)
      setupNextQuestion(type, setCurrentChat, setCurrentAnswers, setCurrentBar)
    }
  }}
>
  {answer}
</FancyButton>

const setupNextQuestion = (type, setCurrentChat, setCurrentAnswers, setCurrentBar) => {
  const newQuestionSet = getQuestion(type)
  setCurrentChat(newQuestionSet.question)
  setCurrentAnswers(newQuestionSet.answers.map(answer=>getMathAnswers(answer, newQuestionSet.correctAnswer, type, setCurrentChat, setCurrentAnswers, setCurrentBar)))
}

const ConnectedApp = connect(
  state => ({
    mathType: FromStore.mathType(state),
    baddieHp: FromStore.baddieHp(state),
    currentChat: FromStore.currentChat(state),
    currentAnswers: FromStore.currentAnswers(state)
  }),
  dispatch => ({
    setMathType: value => {
      dispatch({ type: 'MATH_TYPE_SET', value })
    },
    resetBaddieHp: () => {
      dispatch({ type: 'BADDIE_HP_SET', value: 100 })
    },
    setCurrentChat: value => {
      dispatch({ type: 'CURRENT_CHAT_SET', value })
    },
    setCurrentAnswers: value => {
      dispatch({ type: 'CURRENT_ANSWERS_SET', value })
    }
  })
)(App)

export default ConnectedApp