const vowels = ['A', 'A', 'E', 'E', 'I', 'O', 'O', 'U', 'Y'];
const consonants = ['B', 'B', 'C', 'C', 'D', 'D', 'F', 'F', 'G', 'G', 'H', 'H', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'P', 'P', 'R', 'R', 'S', 'S', 'T', 'T', 'V', 'W'];
const rareConsonants = ['X', 'Z', 'Q'];

const vowelColors = () => {
    const colors = ['rgb(215, 0, 64)', 'rgb(227, 11, 92)'];

    return colors[Math.floor(Math.random() * colors.length)];
};

const consonantColors = () => {
    const colors = ['rgb(10, 40, 110)', 'rgb(0, 15, 95)'];

    return colors[Math.floor(Math.random() * colors.length)];
};

const determineColor = (letterClass) => {
    if (letterClass === 'vowel') return vowelColors()
    if (letterClass === 'consonant') return consonantColors();
    if (letterClass === 'rare') return 'rgb(210, 200, 30)';
};

export const letterClass = (letter) => {
    if (vowels.includes(letter)) return 'vowel';
    if (consonants.includes(letter)) return 'consonant';
    if (rareConsonants.includes(letter)) return 'rare';
};

const letterGenerator = (type, properties='normal') => {
    if (typeof properties === 'object' && properties.void) return {letter: '', type: type, color: 'rgb(0, 0, 0)', properties: properties};

    const randomProperty = Math.floor(Math.random() * 100);
    const randomLetter = Math.floor(Math.random() * 100);

    if (properties === 'normal' && randomLetter > 1.5 && randomProperty <= 2.5) properties = {'stone': 2};
    if (properties === 'normal' && randomLetter <= 1.5 && randomProperty > 2.5) properties = 'gold';

    if (randomLetter >= 38) return {letter: consonants[Math.floor((Math.random()*consonants.length))], type: type, color: determineColor('consonant'), properties: properties};
    
    if (randomLetter > 1.5 && randomLetter < 38) return {letter: vowels[Math.floor((Math.random()*vowels.length))], type: type, color: determineColor('vowel'), properties: properties}

    return {letter: rareConsonants[Math.floor((Math.random()*rareConsonants.length))], type: type, color: determineColor('rare'), properties: properties};
};

export default letterGenerator;