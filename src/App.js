import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import ChatBox, { FancyButton } from './components/chatBox'
import GrowthBar from './components/growthBar'
import BigText from './components/bigText'
import LogoutButton from './components/logout'
import Sword from './components/sword'
import Baddie from './components/baddie'
import StatBlock from './components/statBlock'
import WindowListener from './components/windowListener'

import { backgrounds, getMathQuestion, gameStates } from './helpers'
import { useInterval } from './customHooks'

import * as FromStore from './reducers'

const Container = styled.div`
  background-image: url(${backgrounds.countrySide});
  height: ${props => props.windowHeight}px;
  width: auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const NameInput = styled.input`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 10px;
`

const EnterButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 10px;
  border: yellow solid 1px;
  margin-right: 10px;
`

const App = ({ 
  currentAnswers, setCurrentChat, setCurrentAnswers, damage, dragonsDefeated,
  setMathType, mathType, setBaddieHp, resetBaddieHp, baddieHp, baddieMaxHp, 
  dealDamage, location, setLocation, setName, playerName, gil, setGil, level, 
  setDragonsDefeated, playerSpeed, playerMultiplier, setPlayerSpeed, setPlayerMultiplier,
  setSavedPlayers, savedPlayers, ...props
}) => {
  const [ doingBattle, setDoingBattle ] = useState()
  const [ currentBar, setCurrentBar ] = useState(0)
  const [ multiplier, setMultiplier ] = useState(0)
  const [ timerIsOn, setTimerIsOn ] = useState(null)
  const [ text, setText ] = useState(null)
  const [ answers, setAnswers ] = useState([])
  const [ victory, setVictory ] = useState()
  const [ delay, setDelay ] = useState(100)
  const currentBarRef = useRef(currentBar)
  const multiplierRef = useRef(multiplier)
  const nameRef = useRef()

  useInterval(() => {
    if(timerIsOn){
      setCurrentBar(currentBar => currentBar - 1)
    }
  }, timerIsOn ? delay : null);

  useEffect(()=>{
    multiplierRef.current = multiplier
  }, [multiplier])

  // componentDidMount
  useEffect(()=>{
    load()
  }, [])

  const load = (name = '') => {
    const playerName = name ? name : localStorage.getItem('mathDragonName');
    const gameData = JSON.parse(localStorage.getItem('mathDragons'));

    if(playerName && gameData && gameData[playerName]){
      setName(playerName)
      setGil(gameData[playerName].gil)
      setDragonsDefeated(gameData[playerName].dragonsDefeated)
      setPlayerMultiplier(gameData[playerName].playerMultiplier || 0)
      setPlayerSpeed(gameData[playerName].playerSpeed || 0)
      setLocation('welcomeBack')
    }
    else if(name){
      setLocation('intro2')
      setName(name)
    }
    else {
      const oldPlayers = gameData ? Object.keys(gameData) : []
      console.log(oldPlayers)
      setSavedPlayers(oldPlayers)
      setLocation('intro0')
    }
  }

  const save = () => {
    let gameData = localStorage.getItem('mathDragons')

    gameData = gameData ? JSON.parse(gameData) : {}

    gameData[playerName] = {
      level,
      gil,
      dragonsDefeated,
      playerMultiplier,
      playerSpeed
    }
    localStorage.setItem('mathDragons', JSON.stringify(gameData))
  }

  const endBattle = victory => {
    const reward = victory ? ((5*(level*mathType.gilMultiplier)) || 1) : 0
    setText(victory ? `Nice job ${playerName}! Here's ${reward} gil as a reward!`  : 'Nice try!! Maybe next time!')
    if(victory){
      setGil(gil+reward)
      if(level === 10){
        setDragonsDefeated(dragonsDefeated+1)
      }
    }
    setAnswers([])
    setMathType(null)
    setLocation('town')
    setMathType(null)
    setTimerIsOn(false)
    setCurrentBar(0)
    setMultiplier(0)
    setVictory(victory)
    setTimeout(()=>{
      setDoingBattle(false)
      setMathType(null)
      setDelay(100)
    }, 2000)
    setTimeout(()=>setVictory(false), 2000)
  }

  useEffect(()=>{ // once a battle begins, this should be the first thing ran
    currentBarRef.current = currentBar
    if(doingBattle && baddieHp > 0 && !timerIsOn && mathType){
      setTimerIsOn(true)
      setCurrentBar(100)
    }
    else if(timerIsOn && currentBar <= 0){
      endBattle(false)
    } 
    else if(timerIsOn && baddieHp <= 0){
      endBattle(true)
    }
  }, [currentBar, doingBattle])

  // set Chat and Choices to battle things
  useEffect(()=>{
    if(doingBattle && multiplier - (playerMultiplier * .1) <= 0 && baddieHp > 0 && mathType){
      // Do the math things
      const current = getMathQuestion(mathType, level)

      setMultiplier(3 + (playerMultiplier * .1))
      setCurrentBar(100)

      setText(current.question)
      setAnswers(current.answers.map(answer => <FancyButton
        key={answer}
        onClick={()=>{
          if(answer === current.correctAnswer){
            const damage = currentBarRef.current * multiplierRef.current
            dealDamage(damage)

            setBaddieHp(baddieHp - damage)
            setMultiplier(0) // at the moment this causes a reset at "Set Chat and Choices"
          }
          else {
            if(multiplierRef.current - (playerMultiplier * .1) === 1){
              endBattle(false)
            }
            else {
              setMultiplier(multiplier => multiplier - 1)
            }
          }
        }}
      >
        {answer}
      </FancyButton>))
    }
  }, [multiplier, doingBattle])

  // set Chat and Choices
  useEffect(()=>{
    if(!doingBattle){
      // Narration
      const currentLocation = gameStates[location]
    
      setText(typeof currentLocation.text === 'function' ? currentLocation.text(playerName) : currentLocation.text)
      
      const handleKeyPress = e => {
        if(e.key === 'Enter'){
          enterName(nameRef.current.value)
        }
      }
      const enterName = name => {
        if(name){
          load(name)
        }
      }

      if(currentLocation.input){ // for entering name
        setAnswers([
          <EnterButton key={0} onClick={() => enterName(nameRef.current.value)}>enter</EnterButton>,
          <NameInput key={1} type='text' ref={nameRef} onKeyPress={handleKeyPress} maxLength={15} />
        ])
      }
      else { // for navigating
        const choiceProps = { setCurrentBar, setMathType, setLocation, resetBaddieHp, 
          setDoingBattle, setDelay, level, gil, setGil, setPlayerMultiplier, playerMultiplier,
          setPlayerSpeed, playerSpeed, savedPlayers, enterName }

        setAnswers(currentLocation.choices(choiceProps))
      }
    }
  }, [location, doingBattle, level, gil])

  const logout = () => {
    endBattle(false)
    setName('')
    setGil(0)
    setLocation('intro0')
    setText('')
    setDoingBattle(false)
    setDragonsDefeated(0)
    setPlayerSpeed(0)
    setPlayerMultiplier(0)
    localStorage.setItem('mathDragonName', '');      
  }

  let swords = []
  for (let i=0;i<multiplier;i++){
    const percent = multiplier - i < 1 ? multiplier - i : 1
    const left = i*60 + 300
    const bonusSword = 1 + i + (playerMultiplier * .1) > multiplier
    swords.push(<Sword key={i} left={left} percent={percent} sepia={bonusSword} />)
  }
  const { url, name: baddieName } = mathType ? mathType.levels.filter(l=>level===l.level)[0] : {}

  return (
    <Container windowHeight={props.windowHeight}>
      <StatBlock 
        name={playerName} 
        onSave={save} 
        {...{level, gil, dragonsDefeated, doingBattle, playerMultiplier, playerSpeed}} 
      />
      {swords}
      {doingBattle && <Baddie 
        name={baddieName} 
        url={url} 
        hp={baddieHp} 
        maxHp={baddieMaxHp} 
        defeated={baddieHp < 1} 
        right={currentBar <= 0 && baddieHp > 0} 
        isDragon={level === 10}
      />}
      {playerName && <LogoutButton onClick={logout} />}
      {timerIsOn && 
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
      {damage && <BigText text={Math.round(damage)} right />}
      {victory && <BigText text='You win!' top='0%' />}
      <WindowListener />
    </Container>
  )
}

export { App };


const ConnectedApp = connect(
  state => ({
    playerSpeed: FromStore.playerSpeed(state),
    playerMultiplier: FromStore.playerMultiplier(state),
    mathType: FromStore.mathType(state),
    baddieHp: FromStore.baddieHp(state),
    baddieMaxHp: FromStore.baddieMaxHp(state),
    currentChat: FromStore.currentChat(state),
    currentAnswers: FromStore.currentAnswers(state),
    damage: FromStore.damage(state),
    location: FromStore.location(state),
    playerName: FromStore.playerName(state),
    level: FromStore.playerLevel(state),
    gil: FromStore.gil(state),
    dragonsDefeated: FromStore.dragonsDefeated(state),
    savedPlayers: FromStore.savedPlayers(state),
    windowHeight: FromStore.windowHeight(state)
  }),
  dispatch => ({
    setMathType: value => {
      dispatch({ type: 'MATH_TYPE_SET', value })
    },
    setBaddieHp: value => {
      dispatch({ type: 'BADDIE_HP_SET', value })
    },
    resetBaddieHp: value => {
      dispatch({ type: 'BADDIE_HP_SET', value })
      dispatch({ type: 'BADDIE_MAX_HP_SET', value })
    },
    setCurrentChat: value => {
      dispatch({ type: 'CURRENT_CHAT_SET', value })
    },
    setCurrentAnswers: value => {
      dispatch({ type: 'CURRENT_ANSWERS_SET', value })
    },
    dealDamage: value => {
      dispatch({ type: 'DAMAGE_SET', value })
      setTimeout(()=>dispatch({ type: 'DAMAGE_SET', value: '' }), 1000)
    },
    setLocation: value => {
      dispatch({ type: 'LOCATION_SET', value })
    },
    setName: value => {
      dispatch({ type: 'PLAYER_NAME_SET', value })
      localStorage.setItem('mathDragonName', value);      
    },
    setGil: value => {
      dispatch({ type: 'GIL_SET', value })
    },
    setDragonsDefeated: value => {
      dispatch({ type: 'DRAGONS_DEFEATED_SET', value })
    },
    setPlayerSpeed: value => {
      dispatch({ type: 'PLAYER_SPEED_SET', value })
    },
    setPlayerMultiplier: value => {
      dispatch({ type: 'PLAYER_MULTIPLIER_SET', value })
    },
    setSavedPlayers: value => {
      dispatch({ type: 'SAVED_PLAYERS_SET', value })
    }
  })
)(App)

export default ConnectedApp
