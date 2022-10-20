const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W']
const goldConsonants = ['X', 'Z', 'Q'];

const letterGenerator = () => {
    const randomLetter = Math.floor(Math.random() * 100);
    const randomNum = randomLetter;

    if (randomNum >= 40) return consonants[Math.floor((Math.random()*consonants.length))];
    if (randomNum >= 5 && randomNum < 40) return vowels[Math.floor((Math.random()*vowels.length))];

    return goldConsonants[Math.floor((Math.random()*goldConsonants.length))];
};

export default letterGenerator;