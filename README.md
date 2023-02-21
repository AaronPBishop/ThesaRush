## _Thesarush_ is a word game that integrates Tetris-like gameplay mechanics in order to force players to create and submit words, before letter tiles can reach the top of the screen. The board starts with three rows of letters, and new letters are dropped in intervals according to the chosen level of difficulty.

### Live Link: https://thesarush.onrender.com/

New random letter components (weighted in favor of consonants, then vowels, and finally 'XZQ') are rendered in timed-intervals with animation, and player-built words are validated by indexing a JSON file containing 370,000+ English words upon submission. If the submitted word is valid, all corresponding letters are cleared from the board. If the word is invalid, two new letters are dropped immediately as penalty. Three invalid word submissions in a row will cause an entire row of letters to drop immediately. 

Players are awarded points based off of the length of a submitted word, and points are multiplied upon the same premise. Gold tiles multiply word score x2 for each gold letter used in a word. A word that is less than 3 characters long will not be submitted. However, a valid 6+ letter word will cause the next tile that is spawned to be a bomb tile, which clears all tiles surrounding it in a 1 tile vicinity when used. A valid 8+ letter word will clear the entire bottom row of letters and spawn a lightning tile.

Redux actions are utilized in order to perform various board operations, such as splicing off submitted letters and moving remaining letters into their respective places as needed, or reordering letters in the input bar upon selection/deselection of tiles.

### To play:
> From your terminal, `cd` into `/frontend`, run `npm install`, then run `npm start`. Next, create a `.env` file based on the example `.env.example` file provided (within the same directory). In a separate terminal, from the root '/ThesaRush' directory, run `pipenv shell` to start your virtual environment, then run `pipenv install -r requirements.txt`. Next, run `flask db upgrade`, followed by `flask seed all`, and finally `flask run`. Have fun!

## What's new in the latest build:
* Lightning tiles - You heard it right, 8+ letter words now drop their own unique lightning tile with varying strengths based on the length of your word! Use a lightning tile to clear up to three tiles off the top of each column.
* A chart has been added to the left side of the board to indicate progress toward special tiles.
* Unique sound effects have been added to various in-game actions.
* Drop system optimization! Every third tile dropped is a guaranteed vowel, and every other consonant is a guaranteed pluralizing letter. To top it off, tiles no longer drop on any given column until 6 more drops have occurred in-between.
* Void tile values may now be altered after you've set them. Gone are the days of pesky typos ruining your hard-earned void tiles.
* If you think you can pull it off, 10-11 letter word submissions now clear both bottom rows! Not enough for you? Submit a 12+ letter word to clear all three bottom rows and completely decimate the board.
* ThesaRush just got bigger and better! Four new columns have been added to the widened-board in order to encourage lengthier word submissions and longer games.
* Lives now clear all columns stacked to the height of the board, plus 3 tiles out of every other column on the board. Breathe new-found life into your games and knock your all-time high-score out of the park!
* More difficult levels now award greater points! Rank up faster and knock out the competition by taking on more challenging game-modes.

## Technologies used:
* ![Flask Badge](https://img.shields.io/badge/Flask-000?logo=flask&logoColor=fff&style=flat)
* ![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat)
* ![Redux Badge](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff&style=flat)
* ![SQLite Badge](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=fff&style=flat)
* ![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat)
* ![CSS3 Badge](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=flat)
* ![npm Badge](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=flat)
* ![Git Badge](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=flat)

## _Preview Images_

### _Main gameplay_
![image](https://user-images.githubusercontent.com/95946808/220208324-81e8e6b3-c7ef-4429-b8a5-94cfd5602c87.png)

### _Viewing Leagues_
![image](https://user-images.githubusercontent.com/95946808/220208849-16ae3a6f-9a0e-461b-a5fb-dd1d995c5c08.png)

### _Game Over/Score Overview/Earning Trophies_
![image](https://user-images.githubusercontent.com/95946808/220211892-feb57449-05ca-40c2-9a86-1db1ca90cf62.png)

### _Scoring Points/Clearing Letters_
![image](https://user-images.githubusercontent.com/95946808/220214904-c5a2a7fb-ee49-41f0-af13-15b16ee24420.png)

### _Viewing User Profile_
![image](https://user-images.githubusercontent.com/95946808/216501929-be4cba1e-e57a-4de5-8527-01e03f6a368a.png)

### _Extending Gameplay_
![image](https://user-images.githubusercontent.com/95946808/220208454-e6bbb567-23c9-4597-8d4b-0513e9e061eb.png)

### _Viewing Challenges_
![image](https://user-images.githubusercontent.com/95946808/220209049-ef9de555-97da-46c7-904a-8ab3e7586939.png)
