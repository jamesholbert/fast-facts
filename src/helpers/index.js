export const backgrounds = {
  sky: 'https://cdna2.artstation.com/p/assets/images/images/000/176/778/large/didier-konings-july-2014-didier-konings-skyship-cove.jpg?1408748863',
  countrySide: 'https://i.pinimg.com/originals/f5/c3/09/f5c30922330d28afb4406ad245ea50bb.jpg',
  city: 'https://i.pinimg.com/originals/de/7c/7e/de7c7eeaa04cab331a17827daa14e1ee.jpg',
}

export const raylaUrl='https://vignette.wikia.nocookie.net/dragonprince/images/0/09/Rayla_Official.png/revision/latest/scale-to-width-down/161?cb=20180916011716'

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

export const introTalk = name => ([
	{text:'Hey there, ' + name + '. Great to have you.'},
	{text:"We need your help. There's a Math Breathing Dragon threatening our kingdom."},
	{text:"Our strongest fighters weren't trained to parry math attacks, so they keep failing."},
	{text:"Will you help us?", choices: ['Yes', 'No']},
	{text:"You probably aren't strong enough yet to take him on."},
	{text:"So you'll need to train, and take on a few smaller opponents before then."},
])