import React from 'react'
import { FancyButton } from '../components/chatBox'

export const backgrounds = {
  sky: 'https://cdna2.artstation.com/p/assets/images/images/000/176/778/large/didier-konings-july-2014-didier-konings-skyship-cove.jpg?1408748863',
  countrySide: 'https://i.pinimg.com/originals/f5/c3/09/f5c30922330d28afb4406ad245ea50bb.jpg',
  city: 'https://i.pinimg.com/originals/de/7c/7e/de7c7eeaa04cab331a17827daa14e1ee.jpg',
}

export const swordUrl = 'http://vignette4.wikia.nocookie.net/elderscrolls/images/2/2e/Glass_sword.png/revision/latest?cb=20121012151804'
export const baitUrl = 'https://vignette.wikia.nocookie.net/dragonprince/images/7/7a/BaitFull.png/revision/latest?cb=20180916191227'
export const raylaUrl = 'https://vignette.wikia.nocookie.net/dragonprince/images/0/09/Rayla_Official.png/revision/latest/scale-to-width-down/161?cb=20180916011716'

export const mathChoices = [
	{
		symbol: '+',
		type: 'add',
		calculation: (a,b)=>a+b,
		reference: '+',
		levels: [
			{
				level: 0,
				range: 10,
				delay: 250
			},
			{
				level: 1,
				range: 10
			},
			{
				level: 2,
				range: 15
			}
		]
	},
	{
		symbol: '-',
		type: 'subtract',
		calculation: (a,b)=>a-b,
		reference: '-',
		levels: [
			{
				level: 0,
				range: 10,
				delay: 250,
				enforcePositive: true
			},
			{
				level: 1,
				range: 10,
				enforcePositive: true
			},
			{
				level: 2,
				range: 12
			}
		]
	},
	{
		symbol: 'x',
		type: 'multiply',
		calculation: (a,b)=>a*b,
		reference: 'x',
		levels: [
			{
				level: 0,
				range: 10,
				delay: 250
			},
			{
				level: 1,
				range: 10
			},
			{
				level: 2,
				range: 15
			}
		]
	}
]

const swapFirstAndSecond = (first, second) => ([second, first])

export const getMathQuestion = ({ calculation, reference, levels }, level) => {
	const levelOptions = levels.filter(l=>level===l.level)[0]
	
	let [ first, second ] = getTwoRandomNumbers(levelOptions.range)
	if(first < second && levelOptions.enforcePositive){
		[ first, second ] = swapFirstAndSecond(first, second)
	}

	return {
		question: first + ' ' + reference + ' ' + second + ' =',
		correctAnswer: calculation(first, second),
		answers: shuffle([
			calculation(first, second),
			calculation(first, second - 1),
			calculation(first, second + 1),
			calculation(first, second - 2),
			calculation(first, second + 2)
		])
	}
}

const getRandomNumber = range => Math.floor(Math.random() * (range - 2)) + 2

const getTwoRandomNumbers = range => [getRandomNumber(range), getRandomNumber(range)]

const shuffle = array => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const gameStates = [
	{text: "Hello! What's your name?", input: 'name'},
	{text: name => ('Nice to meet you, ' + name + '. Great to have you.')},
	{text: "We need your help! There are Math Breathing Dragons threatening our kingdom."},
	{text: "Our strongest fighters weren't trained to parry math attacks, so they keep failing."},
	{
		text: "Will you help us?", 
		choices: ({ setLocation, location }) => ['Yes','No'].map(choice => <FancyButton 
			key={choice}
			onClick={()=>{
				setLocation(location + 1)
			}}
		>
			{choice}
		</FancyButton>)	},
	{text: "You probably aren't strong enough yet to take them on."},
	{text: "So you'll need to train, and take on a few smaller opponents before then."},
	{
		text: "What type of math do you want to practice?", 
		choices: ({ setMathType, resetBaddieHp, setDoingBattle, setLevel, setDelay, level }) => mathChoices.map(mathType => {

			const levelOptions = mathType.levels.filter(l=>level===l.level)[0]

			return <FancyButton 
				key={mathType.type+level}
				onClick={()=>{
					setMathType(mathType)
					setDoingBattle(true)
					resetBaddieHp(1000)
					if(levelOptions.delay){
						setDelay(levelOptions.delay)
					}
				}}
			>
				{mathType.symbol}
			</FancyButton>
		})
	}
]
