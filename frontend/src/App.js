import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BoardHolder from './components/BoardHolder/BoardHolder.js';
import Menu from './components/Menu/Menu.js';
import GameOver from './components/GameOver/GameOver.js';
import Audio from './components/Audio/Audio.js';

import * as data from './dictionary/words_dictionary';

const App = () => {
  const totalScore = useSelector(state => state.game.stats.score);
  const totalWords = useSelector(state => state.game.stats.words);
  const longestWord = useSelector(state => state.game.stats.longestWord);
  const tilesCleared = useSelector(state => state.game.stats.tilesCleared);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'flex-end', position: 'relative', top: '1vh', right: '0.5vw'}}>
        <Audio />
      </div>
      
      <Switch>

        <Route exact path='/'>
          <Menu />
        </Route>

        <Route path='/gameover'>
          <GameOver points={totalScore} numWords={totalWords} longestWord={longestWord} tilesCleared={tilesCleared} />
        </Route>

        <Route path='/game/:difficulty'>
          <BoardHolder dictionary={data} />
        </Route>

      </Switch>
    </div>
  );
};

export default App;
