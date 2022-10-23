const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W']
const rareConsonants = ['X', 'Z', 'Q'];

const letterGenerator = () => {
    const randomLetter = Math.floor(Math.random() * 100);

    if (randomLetter >= 40) return consonants[Math.floor((Math.random()*consonants.length))];
    if (randomLetter > 2 && randomLetter < 40) return vowels[Math.floor((Math.random()*vowels.length))];

    return rareConsonants[Math.floor((Math.random()*rareConsonants.length))];
};

export default letterGenerator;