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
				delay: 250,
				name: 'Bait',
				url: 'https://vignette.wikia.nocookie.net/dragonprince/images/7/7a/BaitFull.png/revision/latest?cb=20180916191227'
			},
			{
				level: 1,
				range: 10,
				url: 'https://vignette.wikia.nocookie.net/londorwin/images/d/da/Bullywug_-_Transparent.png/revision/latest?cb=20180509030739',
				name: 'Bullywug'
			},
			{
				level: 2,
				range: 15,
				url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/b4f32250-ec9e-4fc7-96a8-25239a95bf0d/d6ejp1y-c0a37490-522f-441f-8baa-62e877256f32.png',
				name: 'Gnoll'
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
				enforcePositive: true,
				name: 'Slime',
				url: 'https://i.pinimg.com/originals/20/fd/62/20fd62d743a9ad272cc94ac3c36c3984.png'
			},
			{
				level: 1,
				range: 10,
				enforcePositive: true,
				url: 'https://db4sgowjqfwig.cloudfront.net/campaigns/107464/assets/422158/owlbear__small_.png?1423274519',
				name: 'Owlbear'
			},
			{
				level: 2,
				range: 12,
				url: 'https://gamepedia.cursecdn.com/dragalialost_gamepedia_en/thumb/4/44/210050_01_portrait.png/400px-210050_01_portrait.png?version=f2a96b6f284b74d117651d19b8e94977',
				name: 'Roc'
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
				delay: 250,
				name: 'Korok',
				url: 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/0/05/TWW_Hollo_Artwork.png/304px-TWW_Hollo_Artwork.png?version=cfd166fab6c46a2d3f4c969005aef92b'
			},
			{
				level: 1,
				range: 10,
				url: 'http://3.bp.blogspot.com/-XI6QPAjn7BA/UqiNVE35eeI/AAAAAAAAAvw/JJAw16uuCRw/s1600/Chuffy+Lickwound.png',
				name: 'Goblin'
			},
			{
				level: 2,
				range: 15,
				url: 'https://vignette.wikia.nocookie.net/dundef/images/e/e9/Orcmodel.png/revision/latest?cb=20120217185721',
				name: 'Orc'
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
