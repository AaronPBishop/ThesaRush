const vowels = ['A', 'A', 'A', 'E', 'E', 'E', 'E', 'I', 'I', 'O', 'O', 'U', 'U', 'Y'];
const consonants = ['B', 'B', 'C', 'C', 'D', 'D', 'D', 'F', 'F', 'G', 'G', 'G', 'H', 'H', 'J', 'K', 'K', 'L', 'L', 'L', 'M', 'M', 'N', 'N', 'N', 'N', 'P', 'P', 'R', 'R', 'R', 'S', 'S', 'S', 'S', 'T', 'T', 'T', 'V', 'W'];
const rareConsonants = ['X', 'Z', 'Q'];

const vowelColors = () => {
    const colors = ['rgb(215, 0, 64)', 'rgb(227, 11, 92)'];

    return colors[Math.floor(Math.random() * colors.length)];
};

const consonantColors = () => {
    const colors = ['rgb(10, 30, 95)', 'rgb(5, 15, 80)'];

    return colors[Math.floor(Math.random() * colors.length)];
};

const textureRotation = () => Math.floor(Math.random() * 360);

const determineColor = (letterClass) => {
    if (letterClass === 'vowel') return vowelColors()
    if (letterClass === 'consonant') return consonantColors();
};

export const letterClass = (letter) => {
    if (vowels.includes(letter)) return 'vowel';
    if (consonants.includes(letter)) return 'consonant';
    if (rareConsonants.includes(letter)) return 'rare';
};

export const consonantCounter = (prevLetters) => prevLetters.filter(ltr => ltr !== null && (letterClass(ltr.letter) === 'consonant' || letterClass(ltr.letter) === 'rare')).length;
export const vowelCounter = (prevLetters) => prevLetters.filter(ltr => ltr !== null && letterClass(ltr.letter) === 'vowel').length;

const letterGenerator = (type, prevLetters, properties='normal') => {
    if (typeof properties === 'object' && properties.void) {
        const spreadLetters = [...prevLetters];

        spreadLetters.shift();
        spreadLetters.push({letter: '', type: type, color: 'rgb(0, 0, 0)', properties: properties, rotation: textureRotation(), randKey: 0});

        return spreadLetters;
    };

    const randomLetter = Math.floor(Math.random() * 100);
    const randomProperty = Math.floor(Math.random() * 100);

    if (properties === 'normal' && randomLetter > 2 && randomProperty <= 3) properties = {'stone': 2};

    if (type === 'initial' && randomLetter >= 49) return {letter: consonants[Math.floor((Math.random()*consonants.length))], type: type, color: determineColor('consonant'), properties: properties, rotation: textureRotation(), randKey: 0};
    if (type === 'initial' && randomLetter > 2 && randomLetter < 49) return {letter: vowels[Math.floor((Math.random()*vowels.length))], type: type, color: determineColor('vowel'), properties: properties, rotation: textureRotation(), randKey: 0};
    if (type === 'initial' && randomLetter <= 2) return {letter: rareConsonants[Math.floor((Math.random()*rareConsonants.length))], type: type, color: 'rgb(210, 200, 30)', properties: 'gold', rotation: textureRotation(), randKey: 0};

    if (consonantCounter(prevLetters) < 2) {
        const spreadLetters = [...prevLetters];
        spreadLetters.shift();

        if (randomLetter <= 2) {
            spreadLetters.push({letter: rareConsonants[Math.floor((Math.random()*rareConsonants.length))], type: type, color: 'rgb(210, 200, 30)', properties: 'gold', rotation: textureRotation(), randKey: 0});

            return spreadLetters;
        };

        spreadLetters.push({letter: consonants[Math.floor((Math.random()*consonants.length))], type: type, color: determineColor('consonant'), properties: properties, rotation: textureRotation(), randKey: 0});

        return spreadLetters;
    };

    if (vowelCounter(prevLetters) < 1) {
        const spreadLetters = [...prevLetters];

        spreadLetters.shift();
        spreadLetters.push({letter: vowels[Math.floor((Math.random()*vowels.length))], type: type, color: determineColor('vowel'), properties: properties, rotation: textureRotation(), randKey: 0});

        return spreadLetters;
    };
};

export default letterGenerator;