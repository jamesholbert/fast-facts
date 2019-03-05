import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import ChatBox, { FancyButton } from './components/chatBox'
import GrowthBar from './components/growthBar'
import BigText from './components/bigText'
import LogoutButton from './components/logout'

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
  currentAnswers, setCurrentChat, setCurrentAnswers, 
  setMathType, mathType, resetBaddieHp, baddieHp, baddieMaxHp, bigText, 
  dealDamage, location, setLocation, setName, playerName
}) => {
  const [ currentBar, setCurrentBar ] = useState(0) // number
  const [ timer, setTimer ] = useState(null) // interval

  const dealLocalDamage = () => {
    console.log(currentBar)
    dealDamage(currentBar)
  }

  useEffect(()=>{
    const playerName = localStorage.getItem('name');
    if(playerName){
      setName(playerName)
      setLocation(1)
    }
  }, [])

  let current 
  if(location < 0){
    current = getQuestion(mathType)
console.log(current);
  }
  else {
    current = gameStates[location]
  }
  const text = typeof current.text === 'function' ? current.text(playerName) : current.text
  let answers

  const nameRef = useRef()
  if(current.input){
    answers = [
      <button key={0} onClick={()=>{setName(nameRef.current.value);setLocation(location+1)}}>enter</button>,
      <input key={1} type='text' ref={nameRef} />
    ]
  }
  else {
    answers = current.choices 
      ? current.choices({setCurrentBar, setMathType, setLocation, location}) 
      : [<FancyButton key={1} onClick={()=>setLocation(location+1)}>...</FancyButton>]
  }

  useEffect(()=>{
    if(currentBar > 0 && !timer){
      setTimer(setInterval(()=>{
        setCurrentBar(currentBar => currentBar - 1)
      }, 100))
    }    
  }, [currentBar])

  return (
    <Container>
      {playerName && <LogoutButton onClick={()=>{setName('');setLocation(0)}} />}
      {currentBar && 
        <GrowthBar percent={currentBar} onTimeout={()=>{}} />
      }
      {text && 
        <ChatBox
          avatar={!mathType}
          // choices={currentAnswers.map(choice=>choice)}
          choices={answers}
        >
          {text}
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
    location: FromStore.location(state),
    playerName: FromStore.playerName(state)
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
    },
    setName: value => {
      dispatch({ type: 'PLAYER_NAME_SET', value })
      localStorage.setItem('name', value);
    }
  })
)(App)

export default ConnectedApp
