## _Thesarush_ is a word game that integrates Tetris-like gameplay mechanics in order to force players to create and submit words, before letter tiles can reach the top of the screen. The board starts with three rows of letters, and new letters are dropped in intervals according to the chosen level of difficulty.

New random letter components (weighted in favor of consonants, then vowels, and finally 'XZQ') are rendered in timed-intervals with animation, and player-built words are validated by indexing a JSON file containing 370,000+ English words upon submission. If the submitted word is valid, all corresponding letters are cleared from the board. If the word is invalid, a new letter is dropped immediately as penalty. Three invalid word submissions in a row will cause an entire row of letters to drop immediately. 

Players are awarded points based off of the length of a submitted word, and points are multiplied upon the same premise. Gold tiles multiply word score x2 for each gold letter used in a word. A word that is less than 3 characters long will not be submitted. However, a valid 6+ letter word will cause the next tile that is spawned to be a bomb tile, which clears all tiles surrounding it in a 1 tile vicinity when used. A valid 8+ letter word will clear the entire bottom row of letters and also spawn a bomb tile.

Redux actions are utilized in order to perform various board operations, such as splicing off submitted letters and moving remaining letters into their respective places as needed, or reordering letters in the input bar upon selection/deselection of tiles.

### To play:
> From your terminal, `cd` into `/frontend`, run `npm install`, then run `npm start`. Next, create a `.env` file based on the example `.env.example` file provided (within the same directory). In a separate terminal, from the root '/ThesaRush' directory, run `pipenv shell` to start your virtual environment, then run `pipenv install -r requirements.txt`. Next, run `flask db upgrade`, followed by `flask seed all`, and finally `flask run`. Have fun!

## What's new in the latest build:
* Challenges - You can now send and receive challenges from other players! Choose a time limit and rack up as many points as you can to send a challenge to another player. Await their response and compare your results! Winners may claim up to 800 points for a win.
* Trophies - Earn 50 of any badge type, win 50 challenges, or reach level 50 and receive a Trophy to show off on your scorecard plus up to 1,000 points!
* Leagues - See where you rank in your league and view other player's stats by clicking on their score cards!
* Lives (500 points each, can be bought within user profile or upon game-over when signed in) - Circumvent a `Game Over` and get that high score you always wanted! 
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
![image](https://user-images.githubusercontent.com/95946808/214997284-88f2b41c-8626-4fff-8cf7-1113ec58cdb9.png)

### _Viewing Leagues_
![image](https://user-images.githubusercontent.com/95946808/214195355-af1ece4d-0fc3-4bd3-bd44-a9e352c2bb04.png)

### _Game Over/Score Overview/Earning Trophies_
![image](https://user-images.githubusercontent.com/95946808/214998478-cdadbc65-4392-4438-a9f9-84705383ca48.png)

### _Scoring Points_
![image](https://user-images.githubusercontent.com/95946808/215000861-e4d362fc-ae53-4c88-a4ed-2c35171bb171.png)

### _Viewing User Profile_
![image](https://user-images.githubusercontent.com/95946808/215001172-0d0bc4ed-cbad-402b-a41d-01b07e088182.png)

### _Extending Gameplay_
![image](https://user-images.githubusercontent.com/95946808/215002043-3620272c-6767-49d2-b8db-4d8d4f99278a.png)

### _Viewing Challenges_
![image](https://user-images.githubusercontent.com/95946808/214195642-814112ab-6ac8-4671-bcac-7e3b0c6292e2.png)
