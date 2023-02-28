const vowels = ['A', 'A', 'A', 'E', 'E', 'E', 'I', 'I', 'O', 'O', 'U', 'U', 'Y'];
const consonants = ['B', 'B', 'D', 'D', 'D', 'C', 'C', 'F', 'H', 'H', 'J', 'K', 'L', 'L', 'L', 'M', 'M', 'P', 'V', 'W'];
const pluralizers = ['G', 'N', 'R', 'S', 'T'];
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
    if (letterClass === 'vowel') return vowelColors();
    if (letterClass === 'consonant') return consonantColors();
};

export const letterClass = (letter) => {
    if (consonants.includes(letter)) return 'consonant';
    if (vowels.includes(letter)) return 'vowel';
    if (rareConsonants.includes(letter)) return 'rare';
    
    return 'consonant';
};

export const consonantCounter = (prevLetters) => prevLetters.filter(ltr => ltr !== null && (consonants.includes(ltr.letter) || rareConsonants.includes(ltr.letter))).length;
export const pluralizerCounter = (prevLetters) => prevLetters.filter(ltr => ltr !== null && pluralizers.includes(ltr.letter)).length;
export const vowelCounter = (prevLetters) => prevLetters.filter(ltr => ltr !== null && vowels.includes(ltr.letter)).length;

const letterGenerator = (type, prevLetters=[null, null], properties='normal', isRowTile=false) => {
    if (typeof properties === 'object' && properties.void) {
        const spreadLetters = [...prevLetters];

        spreadLetters.shift();
        spreadLetters.push({letter: '', type: type, color: 'rgb(0, 0, 0)', properties: properties, rotation: textureRotation(), randKey: 0});

        return spreadLetters;
    };

    const randomLetter = Math.floor(Math.random() * 100);
    const randomProperty = Math.floor(Math.random() * 100);

    if (properties === 'normal' && randomLetter > 2 && randomProperty <= 2) properties = {'stone': 2};

    if ((type === 'initial' || isRowTile) && randomLetter >= 49) {
        const randomConsonant = Math.floor(Math.random() * 2);

        if (randomConsonant === 0) return {letter: consonants[Math.floor((Math.random()*consonants.length))], type: type, color: determineColor('consonant'), properties: properties, rotation: textureRotation(), randKey: 0};
        if (randomConsonant === 1) return {letter: pluralizers[Math.floor((Math.random()*pluralizers.length))], type: type, color: determineColor('consonant'), properties: properties, rotation: textureRotation(), randKey: 0};
    };
    if ((type === 'initial' || isRowTile) && randomLetter > 2 && randomLetter < 49) return {letter: vowels[Math.floor((Math.random()*vowels.length))], type: type, color: determineColor('vowel'), properties: properties, rotation: textureRotation(), randKey: 0};
    if ((type === 'initial' || isRowTile) && randomLetter <= 2) return {letter: rareConsonants[Math.floor((Math.random()*rareConsonants.length))], type: type, color: 'rgb(210, 200, 30)', properties: 'gold', rotation: textureRotation(), randKey: 0};

    if (consonantCounter(prevLetters) < 1) {
        const spreadLetters = [...prevLetters];
        spreadLetters.shift();

        if (properties === 'normal' && randomLetter <= 2) {
            spreadLetters.push({letter: rareConsonants[Math.floor((Math.random()*rareConsonants.length))], type: type, color: 'rgb(210, 200, 30)', properties: 'gold', rotation: textureRotation(), randKey: 0});

            return spreadLetters;
        };

        spreadLetters.push({letter: consonants[Math.floor((Math.random()*consonants.length))], type: type, color: determineColor('consonant'), properties: properties, rotation: textureRotation(), randKey: 0});

        return spreadLetters;
    };

    if (pluralizerCounter(prevLetters) < 1) {
        const spreadLetters = [...prevLetters];
        spreadLetters.shift();

        spreadLetters.push({letter: pluralizers[Math.floor((Math.random()*pluralizers.length))], type: type, color: determineColor('consonant'), properties: properties, rotation: textureRotation(), randKey: 0});

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