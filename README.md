## _Thesarush_ is a word game that integrates Tetris-like gameplay mechanics in order to force players to create and submit words, before letter tiles can reach the top of the screen. The board starts with three rows of letters, and new letters are dropped in intervals according to the chosen level of difficulty.

New random letter components (weighted in favor of consonants, then vowels, and finally 'XZQ') are rendered in timed-intervals with animation, and player-built words are validated by indexing a JSON file containing 370,000+ English words upon submission. If the submitted word is valid, all corresponding letters are cleared from the board. If the word is invalid, a new letter is dropped immediately as penalty. Three invalid word submissions in a row will cause an entire row of letters to drop immediately. 

Players are awarded points based off of the length of a submitted word, and points are multiplied upon the same premise. Gold tiles multiply word score x2 for each gold letter used in a word. A word that is less than 3 characters long will not be submitted. However, a valid 6+ letter word will cause the next tile that is spawned to be a bomb tile, which clears all tiles surrounding it in a 1 tile vicinity when used. A valid 8+ letter word will clear the entire bottom row of letters and also spawn a bomb tile.

Redux actions are utilized in order to perform various board operations, such as splicing off submitted letters and moving remaining letters into their respective places as needed, or reordering letters in the input bar upon selection/deselection of tiles.

### To play:
> From your terminal, `cd` into `/frontend`, run `npm install`, then run `npm start`. Then, `cd` into `/new_backend`, and run `flask run`. Have fun!

## What's new in the latest build:
* Challenges - You can now send and receive challenges from other players! Choose a time limit and rack up as many points as you can to send a challenge to another player. Await their response and compare your results! Winners may claim 500 points for a win.
* Trophies - Earn 50 of any badge type and receive a Trophy to show off on your scorecard plus 5,000 points!
* Leagues - See where you rank in your league and view other player's stats by clicking on their score cards!
* Lives (1,000 points each, can be bought within user profile or upon game-over when signed in) - Circumvent a `Game Over` and get that high score you always wanted! 
* User accounts - You can now create a user account and all of your score data will be saved from session to session.
* Void tiles (spawned each time 50 points are accrued in total score, can be turned into any letter you wish!)

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
![image](https://user-images.githubusercontent.com/95946808/204881946-808bf41a-54d9-4712-87a7-f7b0f5d14c60.png)

### _Viewing Leaderboard_
![image](https://user-images.githubusercontent.com/95946808/209049639-44836faf-e3f6-4fbc-b8c6-0c0157ec24ed.png)

### _Game over/score overview_
![image](https://user-images.githubusercontent.com/95946808/204883383-2984d39a-c755-4442-838c-647bddef4f56.png)

### _Scoring points_
![image](https://user-images.githubusercontent.com/95946808/204886715-9ac9eddd-b0f2-4249-a776-6dae0f2675c1.png)

### _Viewing User Profile_
![image](https://user-images.githubusercontent.com/95946808/206955988-4c332298-14c3-433f-87e1-a2e7b3e64f5d.png)

### _Extending Gameplay_
![image](https://user-images.githubusercontent.com/95946808/208339904-372fdc26-5033-470b-8752-95e7e25f6d8e.png)
