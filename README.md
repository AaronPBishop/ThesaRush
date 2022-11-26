## _Thesarush_ is a word game that integrates Tetris-like gameplay mechanics in order to force players to create and submit words, before letter tiles can reach the top of the screen. The board starts with three rows of letters, and new letters are dropped every 3 seconds.

New random letter components (weighted in favor of consonants, then vowels, and finally 'XZQ') are rendered in timed-intervals with animation, and validated against a dictionary API upon submission. If the submitted word is valid, all corresponding letters are cleared from the board. If the word is invalid, a new letter is dropped immediately as penalty. Three invalid word submissions in a row will cause an entire row of letters to drop immediately. Players are awarded points based off of the length of a submitted word, and points are multiplied upon the same premise.

Redux actions are utilized in order to perform various board operations, such as splicing off submitted letters and moving remaining letters into their respective places as needed, or reordering letters in the input bar upon selection/deselection of tiles.

**Features to come:**
* Varying levels of difficulty
* User accounts/Multiplayer challenges
* Unlockable animations awarded by point accrual (animations will be style-varying particle-effects that occur upon letter clears)
* New tile mechanics, such as:
1. Rock Tiles (must be used twice in order to clear)
2. Bomb Tiles (clears all tiles in 1 tile radius when used, dropped when player submits 2 - 6+ letter words in a row)

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

### _Scoring points_
![image](https://user-images.githubusercontent.com/95946808/203443450-408a3de6-ab4f-458e-96d4-e287b98116c1.png)
