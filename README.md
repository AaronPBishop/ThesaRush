## _Thesarush_ is a word game that integrates Tetris-like gameplay mechanics in order to force players to create and submit words, before letter tiles can reach the top of the screen. The board starts with three rows of letters, and new letters are dropped in intervals according to the chosen level of difficulty.

## What's new in the latest build:
* Multiple different 'themes' to choose from
* Soundtrack that can be toggled on/off
* Varying levels of difficulty to choose from
* Bomb tiles (spawned when 6+ letter valid word is submitted, clears all tiles surrounding it in a 1 tile vicinity when used)
* Gold tiles (multiply word score x2 for each gold letter used in a word)
* 8+ letter words now clear entire bottom row
* Keyboard controls (spacebar to submit a word, tab to clear input bar)
* Word submissions are now validated by indexing a JSON file containing 370,000+ English words, cutting out fetch delays
* All new tile styling (consonants are denoted by shades of blue, vowels are denoted by shades of red and a 'cushion cut' appearance)
* Eliminated all page refreshes

New random letter components (weighted in favor of consonants, then vowels, and finally 'XZQ') are rendered in timed-intervals with animation, and player-built words are validated by indexing a JSON file containing 370,000+ English words upon submission. If the submitted word is valid, all corresponding letters are cleared from the board. If the word is invalid, a new letter is dropped immediately as penalty. Three invalid word submissions in a row will cause an entire row of letters to drop immediately. 

Players are awarded points based off of the length of a submitted word, and points are multiplied upon the same premise. Gold tiles multiply word score x2 for each gold letter used in a word. A word that is less than 3 characters long will not be submitted. However, a valid 6+ letter word will cause the next tile that is spawned to be a bomb tile, which clears all tiles surrounding it in a 1 tile vicinity when used. A valid 8+ letter word will clear the entire bottom row of letters and also spawn a bomb tile.

Redux actions are utilized in order to perform various board operations, such as splicing off submitted letters and moving remaining letters into their respective places as needed, or reordering letters in the input bar upon selection/deselection of tiles.

**Features to come:**
* User accounts/Multiplayer challenges
* Badges
* Unlockable animations awarded by point accrual (animations will be style-varying particle-effects that occur upon letter clears)
* New tile mechanics, such as:
1. Rock Tiles (must be used twice in order to clear)
2. Lava Tiles (must be used when first dropped, otherwise turns all tiles in surrounding vicinity to rock)

## Technologies used:
* ![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat)
* ![Redux Badge](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff&style=flat)
* ![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat)
* ![CSS3 Badge](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=flat)
* ![npm Badge](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=flat)
* ![Git Badge](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=flat)

## _Preview Images_

### _Main gameplay_
![image](https://user-images.githubusercontent.com/95946808/204104305-8e55cee2-1993-43a0-9a07-745685bf2910.png)

### _Game over/score overview_
![image](https://user-images.githubusercontent.com/95946808/202935616-d84a2105-219f-4eb5-97be-e4fc3f64218b.png)
