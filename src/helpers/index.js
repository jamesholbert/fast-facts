import React from 'react'
import { FancyButton } from '../components/chatBox'

import { Cell } from '../components/grid'

export const backgrounds = {
  sky: 'https://cdna2.artstation.com/p/assets/images/images/000/176/778/large/didier-konings-july-2014-didier-konings-skyship-cove.jpg?1408748863',
  countrySide: 'https://i.pinimg.com/originals/f5/c3/09/f5c30922330d28afb4406ad245ea50bb.jpg',
  city: 'https://i.pinimg.com/originals/de/7c/7e/de7c7eeaa04cab331a17827daa14e1ee.jpg',
}

export const swordUrl = 'http://vignette4.wikia.nocookie.net/elderscrolls/images/2/2e/Glass_sword.png/revision/latest?cb=20121012151804'
export const baitUrl = 'https://vignette.wikia.nocookie.net/dragonprince/images/7/7a/BaitFull.png/revision/latest?cb=20180916191227'

export const npcUrls = {
	rayla: 'https://vignette.wikia.nocookie.net/dragonprince/images/0/09/Rayla_Official.png/revision/latest/scale-to-width-down/161?cb=20180916011716',
	callum: 'https://vignette.wikia.nocookie.net/dragonprince/images/4/4e/Callum_Official.png/revision/latest?cb=20180916011714',
	amaya: 'https://thedragonprince.com/wp-content/uploads/2019/01/general-Amaya.png'
}

export const imageDimensions = {
	boss: {
		height: '65%',
		width: '50%',
		left: '60%',
		lifeBarRight: '15px',
		heightRatio: .7
	},
	smallFry: {
		height: '30%',
		width: '25%',
		left: '70%',
		lifeBarRight: '10%',
		heightRatio: .45
	}
}

export const mathChoices = [
	{
		symbol: '+',
		type: 'add',
		gilMultiplier: 1,
		calculation: (a,b)=>a+b,
		reference: '+',
		levels: [
			{
				level: 0,
				range: 5,
				delay: 250,
				name: 'Bait',
				url: 'https://vignette.wikia.nocookie.net/dragonprince/images/7/7a/BaitFull.png/revision/latest?cb=20180916191227'
			},
			{
				level: 1,
				range: 10,
				delay: 250,
				name: 'Bait',
				url: 'https://vignette.wikia.nocookie.net/dragonprince/images/7/7a/BaitFull.png/revision/latest?cb=20180916191227'
			},
			{
				level: 2,
				range: 10,
				url: 'https://vignette.wikia.nocookie.net/londorwin/images/d/da/Bullywug_-_Transparent.png/revision/latest?cb=20180509030739',
				name: 'Bullywug'
			},
			{
				level: 3,
				range: 15,
				url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/b4f32250-ec9e-4fc7-96a8-25239a95bf0d/d6ejp1y-c0a37490-522f-441f-8baa-62e877256f32.png',
				name: 'Gnoll'
			},
			{
				level: 10,
				range: 20,
				url: 'http://dragon-mania-legends-wiki.mobga.me/images/7/72/Carnival_Dragon.png',
				name: 'Pythonagorus',
				delay: 40,
				baddieHp: 2000
			}
		]
	},
	{
		symbol: '-',
		type: 'subtract',
		gilMultiplier: 2,
		calculation: (a,b)=>a-b,
		reference: '-',
		levels: [
			{
				level: 0,
				range: 5,
				delay: 250,
				enforcePositive: true,
				name: 'Slime',
				url: 'https://i.pinimg.com/originals/20/fd/62/20fd62d743a9ad272cc94ac3c36c3984.png'
			},
			{
				level: 1,
				range: 10,
				delay: 250,
				enforcePositive: true,
				name: 'Slime',
				url: 'https://i.pinimg.com/originals/20/fd/62/20fd62d743a9ad272cc94ac3c36c3984.png'
			},
			{
				level: 2,
				range: 10,
				enforcePositive: true,
				url: 'https://db4sgowjqfwig.cloudfront.net/campaigns/107464/assets/422158/owlbear__small_.png?1423274519',
				name: 'Owlbear'
			},
			{
				level: 3,
				range: 15,
				enforcePositive: true,
				url: 'https://gamepedia.cursecdn.com/dragalialost_gamepedia_en/thumb/4/44/210050_01_portrait.png/400px-210050_01_portrait.png?version=f2a96b6f284b74d117651d19b8e94977',
				name: 'Roc'
			},
			{
				level: 10,
				range: 20,
				url: 'http://www.pngall.com/wp-content/uploads/2016/06/Chinese-Dragon-PNG.png',
				name: 'Brahmagupta',
				enforcePositive: true,
				delay: 40,
				baddieHp: 3000
			}
		]
	},
	{
		symbol: 'x',
		type: 'multiply',
		gilMultiplier: 6,
		calculation: (a,b)=>a*b,
		reference: 'x',
		levels: [
			{
				level: 0,
				range: 5,
				delay: 250,
				name: 'Korok',
				url: 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/0/05/TWW_Hollo_Artwork.png/304px-TWW_Hollo_Artwork.png?version=cfd166fab6c46a2d3f4c969005aef92b'
			},
			{
				level: 1,
				range: 10,
				delay: 250,
				name: 'Korok',
				url: 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/0/05/TWW_Hollo_Artwork.png/304px-TWW_Hollo_Artwork.png?version=cfd166fab6c46a2d3f4c969005aef92b'
			},
			{
				level: 2,
				range: 10,
				requiredOneOf: [2,5,9],
				url: 'http://clipart-library.com/images/BigEbEBi8.png',
				name: 'Drigon'
			},
			{
				level: 3,
				range: 15,
				url: 'https://vignette.wikia.nocookie.net/dundef/images/e/e9/Orcmodel.png/revision/latest?cb=20120217185721',
				name: 'Orc'
			},
			{
				level: 10,
				range: 15,
				url: 'https://vignette.wikia.nocookie.net/overlordmaruyama/images/c/cb/PDL_Profile.png/revision/latest?cb=20181004225837',
				name: 'Pascal Blaze',
				delay: 40,
				baddieHp: 4000
			}
		]
	}
]

export const getMathQuestion = ({ calculation, reference, levels }, level) => {
	const levelOptions = levels.filter(l=>level===l.level)[0]

	let [ first, second ] = getTwoRandomNumbers(levelOptions.range)
	if(levelOptions.requiredOneOf){
		first = levelOptions.requiredOneOf[getRandomNumber(3)-1]
	}	
	if(first < second && levelOptions.enforcePositive){
		[ first, second ] = [second, first]
	}

	return {
		question: first + ' ' + reference + ' ' + second + ' =',
		correctAnswer: calculation(first, second),
		answers: shuffleArray([
			calculation(first, second),
			calculation(first, second - 1),
			calculation(first, second + 1),
			calculation(first, second - 2),
			calculation(first, second + 2)
		])
	}
}

const getRandomNumberOverOne = range => Math.floor(Math.random() * (range - 2)) + 2
const getRandomNumber = range => Math.floor(Math.random() * (range)) + 1

const getTwoRandomNumbers = range => [getRandomNumberOverOne(range), getRandomNumberOverOne(range)]

const shuffleArray = array => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const buttonsForLocations = (choiceArray, setLocation, mobileView = false) => choiceArray.map((choice, i)=>(
	<Cell key={i} span={mobileView ? 2 : 1}>
		<FancyButton
			onClick={()=>setLocation(choice.location)}
		>
			{choice.text || 'next'}
		</FancyButton>
	</Cell>))

export const gameStates = {
	intro0: {
		text: "Hello! What's your name?",
		choices: ({ enterName, savedPlayers, setLocation }) => {
			const resumePlayers = savedPlayers ? savedPlayers.map(player=><FancyButton
				onClick={()=>enterName(player)}
			>
				{player}
			</FancyButton>) : []

			return [...resumePlayers, ...buttonsForLocations([{location: 'intro1', text: 'new'}], setLocation)]
		},
		npc: 'callum'
	},
	intro1: {
		text: "Hello! What's your name?", 
		input: 'name',
		inputTarget: 'intro2',
		npc: 'callum'
	},
	intro2: {
		text: name => ('Nice to meet you, ' + name + '. Great to have you.'),
		choices: ({ setLocation }) => buttonsForLocations([{location: 'intro3'}], setLocation),
		npc: 'callum'
	},
	intro3: {
		text: "We need your help! There are Math Breathing Dragons threatening our kingdom.",
		choices: ({ setLocation }) => buttonsForLocations([{location: 'intro4'}], setLocation),
		npc: 'callum'
	},
	intro4: {
		text: "Our strongest fighters weren't trained to parry math attacks, so they keep failing.",
		choices: ({ setLocation }) => buttonsForLocations([{location: 'intro5'}], setLocation),
		npc: 'callum'
	},
	intro5: {
		text: "Will you help us?", 
		choices: ({ setLocation }) => buttonsForLocations([
			{'location': 'intro6', text: 'No'},
			{'location': 'intro6', text: 'Yes'}, 
		], setLocation),
		npc: 'callum'
	},
	intro6: {
		text: "You probably aren't strong enough yet to take them on.",
		choices: ({ setLocation }) => buttonsForLocations([{location: 'intro7'}], setLocation),
		npc: 'callum'
	},
	intro7: {
		text: "So you'll need to train, and take on a few smaller opponents before then.",
		choices: ({ setLocation }) => buttonsForLocations([{location: 'town'}], setLocation),
		npc: 'callum'
	},
	welcomeBack: {
		text: name => `Welcome back ${name}!`,
		choices: ({ setLocation }) => buttonsForLocations([{location: 'town'}], setLocation),
	},
	town: {
		text: "Where would you like to go?",
		choices: ({ setLocation }) => buttonsForLocations([
			{location: 'store', text: 'Store'},
			{location: 'chooseMathType', text: 'Battle'}, 
		], setLocation)
	},
	upgradeHelp: {
		npc: 'amaya',
		text: "Speed gives you more time to solve a problem, and Sword adds to your damage.",
		choices: ({ setLocation }) => buttonsForLocations([
			{location: 'store', text: 'Back'},
		], setLocation)
	},
	chooseMathType: {
		text: "What type of math do you want to battle?", 
		choices: ({ setMathType, resetBaddieHp, setDoingBattle, setDelay, level, setLocation, playerSpeed, mobileView }) => {
			const backToTown = buttonsForLocations([
				{location: 'town', text: 'Back'},
			], setLocation)

			return [...backToTown, ...mathChoices.map(mathType => {
				const levelOptions = mathType.levels.filter(l=>level===l.level)[0]
				return <FancyButton
					mobileView={mobileView}
					key={mathType.type+level}
					onClick={()=>{
						setMathType(mathType)
						setDoingBattle(true)
						resetBaddieHp(levelOptions.baddieHp || 1000)
						if(levelOptions.delay){
							setDelay(levelOptions.delay + playerSpeed * 2)
						}
					}}
				>
					{mathType.symbol}
				</FancyButton>
			})]
		}
	},
	store: {
		npc: 'amaya',
		text: 'What would you like to upgrade?',
		choices: ({ gil, setGil, setPlayerMultiplier, playerMultiplier,
          setPlayerSpeed, playerSpeed, setLocation, mobileView }) => {
			let upgradeButtons = []
			const otherButtons = buttonsForLocations([
				{location: 'town', text: 'Back'},
				{location: 'upgradeHelp', text: 'Help'},
			], setLocation, mobileView)

			const getCostMultiplier = level => {
				if(level <= 5){return 20}
				if(level > 5){return 100}
				return 50
			}
			const speedCost = (playerSpeed + 1)*getCostMultiplier(playerSpeed)
			const swordCost = (playerMultiplier + 1)*getCostMultiplier(playerMultiplier)

			// let upgradeButtons = backToTown
			upgradeButtons.push(
				<Cell span={mobileView ? 2 : 1}><FancyButton 
					disabled={speedCost>gil} 
					key='speed'
					onClick={()=>{
						setPlayerSpeed(playerSpeed+1)
						setGil(gil-speedCost)
					}}
				>
					Speed ({speedCost})
				</FancyButton></Cell>
			)
			upgradeButtons.push(
				<Cell span={mobileView ? 2 : 1}><FancyButton 
					disabled={swordCost>gil} 
					key='multiplier'
					onClick={()=>{
						setPlayerMultiplier(playerMultiplier+1)
						setGil(gil-swordCost)
					}}
				>
						Sword ({swordCost})
				</FancyButton></Cell>
			)
			return [...upgradeButtons, ...otherButtons]
		}
	}
}
