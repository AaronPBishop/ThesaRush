## _Thesarush_ is a word game that integrates Tetris-like gameplay mechanics in order to force players to create and submit words, before letter tiles can reach the top of the screen. The board starts with three rows of letters, and new letters are dropped in intervals according to the chosen level of difficulty.

### Live Link: https://thesarush.onrender.com/

New random letter components (weighted in favor of consonants, then vowels, and finally 'XZQ') are rendered in timed-intervals with animation, and player-built words are validated by indexing a JSON file containing 370,000+ English words upon submission. If the submitted word is valid, all corresponding letters are cleared from the board. If the word is invalid, a new letter is dropped immediately as penalty. Three invalid word submissions in a row will cause an entire row of letters to drop immediately. 

Players are awarded points based off of the length of a submitted word, and points are multiplied upon the same premise. Gold tiles multiply word score x2 for each gold letter used in a word. A word that is less than 3 characters long will not be submitted. However, a valid 6+ letter word will cause the next tile that is spawned to be a bomb tile, which clears all tiles surrounding it in a 1 tile vicinity when used. A valid 8+ letter word will clear the entire bottom row of letters and also spawn a bomb tile.

Redux actions are utilized in order to perform various board operations, such as splicing off submitted letters and moving remaining letters into their respective places as needed, or reordering letters in the input bar upon selection/deselection of tiles.

### To play:
> From your terminal, `cd` into `/frontend`, run `npm install`, then run `npm start`. Next, create a `.env` file based on the example `.env.example` file provided (within the same directory). In a separate terminal, from the root '/ThesaRush' directory, run `pipenv shell` to start your virtual environment, then run `pipenv install -r requirements.txt`. Next, run `flask db upgrade`, followed by `flask seed all`, and finally `flask run`. Have fun!

## What's new in the latest build:
* More difficult levels now award greater points! Rank up faster and knock out the competition by taking on more challenging game-modes.
* Challenges - You can now send and receive challenges from other players! Choose a time limit and rack up as many points as you can to send a challenge to another player. Await their response and compare your results! Winners may claim up to 800 points for a win.
* Trophies - Earn 50 of any badge type, win 50 challenges, or reach level 50 and receive a Trophy to show off on your scorecard plus up to 10,000 points!
* Leagues - See where you rank in your league and view other player's stats by clicking on their score cards!
* Lives (500 points each, can be bought within user profile or upon game-over when signed in) - Circumvent a `Game Over` and get that high score you always wanted! 

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
![image](https://user-images.githubusercontent.com/95946808/216496861-8799c37b-be87-4db2-ae90-b3711c5af175.png)

### _Viewing Leagues_
![image](https://user-images.githubusercontent.com/95946808/216497775-fb985cf1-9a83-4a3a-b4a6-40fb492f9468.png)

### _Game Over/Score Overview/Earning Trophies_
![image](https://user-images.githubusercontent.com/95946808/216501512-d4f64474-7619-425e-962b-adfde9328e83.png)

### _Scoring Points/Clearing Letters_
![image](https://user-images.githubusercontent.com/95946808/216504394-e0d3bc31-ef13-4939-baca-c5b04651c4b3.png)

### _Viewing User Profile_
![image](https://user-images.githubusercontent.com/95946808/216501929-be4cba1e-e57a-4de5-8527-01e03f6a368a.png)

### _Extending Gameplay_
![image](https://user-images.githubusercontent.com/95946808/216502870-cbcde7d6-4bba-4da2-a0df-12286373fe99.png)

### _Viewing Challenges_
![image](https://user-images.githubusercontent.com/95946808/216502206-6b599402-4a2a-4976-902b-fc49388ad4f5.png)
