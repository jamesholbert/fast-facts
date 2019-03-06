import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import ChatBox, { FancyButton } from './components/chatBox'
import GrowthBar from './components/growthBar'
import BigText from './components/bigText'
import LogoutButton from './components/logout'

import { backgrounds, mathChoices, getQuestion, gameStates } from './helpers'
import { useInterval } from './customHooks'

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
  const [ multiplier, setMultiplier ] = useState(0)
  const [ timerIsOn, setTimerIsOn ] = useState(null) // interval
  const [ text, setText ] = useState(null)
  const [ answers, setAnswers ] = useState([])
  const currentBarRef = useRef(currentBar)
  const multiplierRef = useRef(multiplier)
  const nameRef = useRef()

  useInterval(() => {
    setCurrentBar(currentBar => currentBar - 1)
  }, timerIsOn ? 100 : null);

  // componentDidMount
  useEffect(()=>{
    const playerName = localStorage.getItem('name');
    if(playerName){
      setName(playerName)
      setLocation(1)
    }
    else{
      setLocation(0)
    }
  }, [])

  useEffect(()=>{
    currentBarRef.current = currentBar
    if(currentBar > 0 && !timerIsOn){
      setTimerIsOn(true)
    }
    if(currentBar === 0 && location < 0){
      setLocation(7)
      setMathType(null)
      setTimerIsOn(false)
      setCurrentBar(0)
      setMultiplier(0)
    }
  }, [currentBar])

  useEffect(()=>{
    multiplierRef.current = multiplier
  }, [multiplier])

  // set Chat and Choices
  useEffect(()=>{
    let current

    if(location < 0 && multiplier === 0){
      // Do the math things
      current = getQuestion(mathType)
      setMultiplier(3)
      setCurrentBar(100)

      setText(current.question)
      setAnswers(current.answers.map(answer => <FancyButton
        key={answer}
        onClick={()=>{
          if(answer === current.correctAnswer){
            dealDamage(currentBarRef.current * multiplierRef.current)

            setMultiplier(0)
          }
          else {
            setMultiplier(multiplier => multiplier - 1)
          }
        }}
      >
        {answer}
      </FancyButton>))
    }
    else if(location >= 0){
      // Narration
      current = gameStates[location]
    
      setText(typeof current.text === 'function' ? current.text(playerName) : current.text)

      if(current.input){
        setAnswers([
          <button key={0} onClick={() => {setName(nameRef.current.value);setLocation(location+1);}}>enter</button>,
          <input key={1} type='text' ref={nameRef} />
        ])
      }
      else {
        setAnswers(current.choices 
          ? current.choices({setCurrentBar, setMathType, setLocation, location}) 
          : [<FancyButton key={1} onClick={() => setLocation(location + 1)}>...</FancyButton>])
      }
    }
  }, [location, baddieHp, multiplier])

  return (
    <Container>
      {multiplier}
      {playerName && <LogoutButton onClick={()=>{setName('');setLocation(0)}} />}
      {currentBar && 
        <GrowthBar percent={currentBar} onTimeout={()=>{}} />
      }
      {text && 
        <ChatBox
          avatar={!mathType}
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
