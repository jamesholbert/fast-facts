import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import ChatBox, { FancyButton } from './components/chatBox'
import GrowthBar from './components/growthBar'
import BigText from './components/bigText'

import { backgrounds, mathChoices, getQuestion, gameStates } from './helpers'

import * as FromStore from './reducers'

const Container = styled.div`
  background-image: url(${backgrounds.countrySide});
  height: ${window.innerHeight}px;
  width: auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const App = ({ 
  currentChat, currentAnswers, setCurrentChat, setCurrentAnswers, 
  setMathType, mathType, resetBaddieHp, baddieHp, baddieMaxHp, bigText, 
  dealDamage, location, setLocation
}) => {
  const [ currentBar, setCurrentBar ] = useState(0)
  const [ timer, setTimer ] = useState(null)

  const dealLocalDamage = () => {
    console.log(timer)
    dealDamage(timer)
  }

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
        setCurrentAnswers(newQuestionSet.answers.map(answer=>getMathAnswers(answer, newQuestionSet.correctAnswer, type, setCurrentChat, setCurrentAnswers, setCurrentBar, dealLocalDamage, timer)))
      }}
    >
      {type.symbol}
    </FancyButton>))
  }, [])

  useEffect(()=>{
    if(currentBar > 0 && !timer){
      setTimer(setInterval(()=>{
        setCurrentBar(currentBar => currentBar - 1)
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
          choices={currentAnswers.map(choice=>choice)}
        >
          {currentChat}
        </ChatBox>
      }
      {bigText && <BigText text={bigText} right />}
    </Container>
  )
}

export { App };

const getMathAnswers = (
  answer, correctAnswer, type, setCurrentChat, setCurrentAnswers, 
  setCurrentBar, dealLocalDamage, timer
) => <FancyButton
  key={answer}
  onClick={()=>{
    if(answer === correctAnswer){
      dealLocalDamage()

      setCurrentBar(100)
      setupNextQuestion(type, setCurrentChat, setCurrentAnswers, setCurrentBar, dealLocalDamage, timer)
    }
    else {
      setupNextQuestion(type, setCurrentChat, setCurrentAnswers, setCurrentBar, dealLocalDamage, timer)
    }
  }}
>
  {answer}
</FancyButton>

const setupNextQuestion = (type, setCurrentChat, setCurrentAnswers, setCurrentBar, dealLocalDamage, timer) => {
  const { question, answers, correctAnswer } = getQuestion(type)

  setCurrentChat(question)
  setCurrentAnswers(answers.map(answer=>getMathAnswers(answer, correctAnswer, type, setCurrentChat, setCurrentAnswers, setCurrentBar, dealLocalDamage, timer)))
}

const ConnectedApp = connect(
  state => ({
    mathType: FromStore.mathType(state),
    baddieHp: FromStore.baddieHp(state),
    currentChat: FromStore.currentChat(state),
    currentAnswers: FromStore.currentAnswers(state),
    bigText: FromStore.bigText(state),
    location: FromStore.location(state)
  }),
  dispatch => ({
    setMathType: value => {
      dispatch({ type: 'MATH_TYPE_SET', value })
    },
    resetBaddieHp: () => {
      dispatch({ type: 'BADDIE_HP_SET', value: 1000 })
    },
    setCurrentChat: value => {
      dispatch({ type: 'CURRENT_CHAT_SET', value })
    },
    setCurrentAnswers: value => {
      dispatch({ type: 'CURRENT_ANSWERS_SET', value })
    },
    dealDamage: value => {
      dispatch({ type: 'BIG_TEXT_SET', value })
      setTimeout(()=>dispatch({ type: 'BIG_TEXT_SET', value: '' }), 1000)
    },
    setLocation: value => {
      dispatch({ type: 'LOCATION_SET', value })
    }
  })
)(App)

export default ConnectedApp
