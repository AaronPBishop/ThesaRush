import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import BoardHolder from './components/BoardHolder/BoardHolder.js';
import Menu from './components/Menu/Menu.js';
import GameOver from './components/GameOver/GameOver.js';
import Audio from './components/Audio/Audio.js';

import { setBackgroundColor } from './store/menu.js';

import * as data from './dictionary/words_dictionary';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const background = window.localStorage.getItem('backgroundColor');

    if (background !== null) dispatch(setBackgroundColor(background));
  }, []);

  const totalScore = useSelector(state => state.game.stats.score);
  const totalWords = useSelector(state => state.game.stats.words);
  const longestWord = useSelector(state => state.game.stats.longestWord);
  const tilesCleared = useSelector(state => state.game.stats.tilesCleared);
  const bombardier = useSelector(state => state.game.stats.bombardier);
  const stoneCrusher = useSelector(state => state.game.stats.stoneCrusher);
  const goldMiner = useSelector(state => state.game.stats.goldMiner);
  const wordSmith = useSelector(state => state.game.stats.wordSmith);
  const voidMaster = useSelector(state => state.game.stats.voidMaster);

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
          <GameOver 
          points={totalScore} 
          numWords={totalWords} 
          longestWord={longestWord} 
          tilesCleared={tilesCleared}
          bombardier={Math.trunc(bombardier / 2)} 
          stoneCrusher={Math.trunc(stoneCrusher / 3)}
          goldMiner={Math.trunc(goldMiner / 3)}
          wordSmith={wordSmith}
          voidMaster={Math.trunc(voidMaster / 2)}
          />
        </Route>

        <Route path='/game/:difficulty'>
          <BoardHolder 
          dictionary={data}
          bombardier={Math.trunc(bombardier / 2)} 
          stoneCrusher={Math.trunc(stoneCrusher / 3)}
          goldMiner={Math.trunc(goldMiner / 3)}
          wordSmith={wordSmith}
          voidMaster={Math.trunc(voidMaster / 2)}
          />
        </Route>

      </Switch>
    </div>
  );
};

export default App;
