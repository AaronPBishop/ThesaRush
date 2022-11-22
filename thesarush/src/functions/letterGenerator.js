const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W']
const rareConsonants = ['X', 'Z', 'Q'];

export const letterType = (letter) => {
    if (vowels.includes(letter)) return 'vowel';
    if (consonants.includes(letter)) return 'consonant';
    if (rareConsonants.includes(letter)) return 'rare';
};

const letterGenerator = (type) => {
    const randomLetter = Math.floor(Math.random() * 100);

    if (randomLetter >= 40) return {letter: consonants[Math.floor((Math.random()*consonants.length))], type: type};
    if (randomLetter > 2 && randomLetter < 40) return {letter: vowels[Math.floor((Math.random()*vowels.length))], type: type}

    return {letter: rareConsonants[Math.floor((Math.random()*rareConsonants.length))], type: type};
};

export default letterGenerator;