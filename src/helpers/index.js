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
		reference: '+'
	},
	{
		symbol: '-',
		type: 'subtract',
		calculation: (a,b)=>a-b,
		reference: '-'
	},
	{
		symbol: 'x',
		type: 'multiply',
		calculation: (a,b)=>a*b,
		reference: 'x'
	},
	// {
	// 	symbol: '/',
	// 	type: 'divide',
	// 	calculation: (a,b)=>a/b,
	// 	reference: 'by'
	// },
]

export const getQuestion = ({ symbol, type, calculation, reference, range = 10 }) => {
	const [ first, second ] = getTwoRandomNumbers(range)
	// const variance = getRandomNumber(3)
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

const getRandomNumber = range => Math.floor(Math.random() * (range - 2)) + 3

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
	{text: "We need your help! There's are Math Breathing Dragons threatening our kingdom."},
	{text: "Our strongest fighters weren't trained to parry math attacks, so they keep failing."},
	{
		text: "Will you help us?", 
		choices: ({ setLocation, location }) => ['Yes','No'].map((v, i) => <FancyButton 
			key={i}
			onClick={()=>{
				setLocation(location + 1)
			}}
		>
			{v}
		</FancyButton>)	},
	{text: "You probably aren't strong enough yet to take them on."},
	{text: "So you'll need to train, and take on a few smaller opponents before then."},
	{
		text: "What type of math do you want to practice?", 
		choices: ({ setMathType, setLocation, resetBaddieHp }) => mathChoices.map(type => <FancyButton 
			key={type.type}
			onClick={()=>{
				setMathType(type)
				setLocation(-1)
				resetBaddieHp(1000)
			}}
		>
			{type.symbol}
		</FancyButton>)
	}
]


/* example state:

{
	text: 'Hey there, DragoonFace. Great to have you',
	choices: (damage, type) => <FancyButton onClick />,
	connections: []
}





*/

{/*mathChoices.map(type=><FancyButton */}
  //     key={type.type}
  //     onClick={()=>{
  //       const newQuestionSet = getQuestion(type)
  //       resetBaddieHp()
  //       setCurrentBar(100)
  //       setMathType(type.type)
  //       setCurrentChat(newQuestionSet.question)
  //       setCurrentAnswers(newQuestionSet.answers.map(answer=>getMathAnswers(answer, newQuestionSet.correctAnswer, type, setCurrentChat, setCurrentAnswers, setCurrentBar, dealLocalDamage, timer)))
  //     }}
  //   >
  //     {type.symbol}
  //   </FancyButton>)