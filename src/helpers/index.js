export const backgrounds = {
  sky: 'https://cdna2.artstation.com/p/assets/images/images/000/176/778/large/didier-konings-july-2014-didier-konings-skyship-cove.jpg?1408748863',
  countrySide: 'https://i.pinimg.com/originals/f5/c3/09/f5c30922330d28afb4406ad245ea50bb.jpg',
  city: 'https://i.pinimg.com/originals/de/7c/7e/de7c7eeaa04cab331a17827daa14e1ee.jpg',
}

// export const marioUrl='https://img.rankedboost.com/wp-content/plugins/super-smash-bros-ultimate/assets/character-images-main/Dr_Mario_SSBU.png'
export const marioUrl='https://vignette.wikia.nocookie.net/dragonprince/images/0/09/Rayla_Official.png/revision/latest/scale-to-width-down/161?cb=20180916011716'

export const mathChoices = [
	{
		symbol: '+',
		type: 'add',
		calculation: (a,b)=>a+b,
		reference: 'to'
	},
	{
		symbol: '-',
		type: 'subtract',
		calculation: (a,b)=>a-b,
		reference: 'from'
	},
	{
		symbol: 'x',
		type: 'multiply',
		calculation: (a,b)=>a*b,
		reference: 'by'
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

	return {
		question: 'What do you get when you ' + type + ' ' + first + ' ' + reference + ' ' + second + '?',
		correctAnswer: calculation(first, second),
		answers: shuffle([1,2,3,4])
	}
}

const getRandomNumber = range => Math.floor(Math.random() * range) + 0

const getTwoRandomNumbers = ({ range }) => [getRandomNumber(range), getRandomNumber(range)]

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