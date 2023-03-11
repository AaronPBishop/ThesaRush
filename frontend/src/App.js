import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import BoardHolder from './components/BoardHolder/BoardHolder.js';
import Menu from './components/Menu/Menu.js';
import GameOver from './components/GameOver/GameOver.js';
import Musicplayer from './components/MusicPlayer/MusicPlayer.js';

import { setBackdropType, setBackgroundColor } from './store/menu.js';
import { authenticate } from './store/user.js';

import * as data from './dictionary/words_dictionary';

const App = () => {
  const dispatch = useDispatch();

  const backDrop = useSelector(state => state.menu.backDrop);

  useEffect(() => {
    const background = window.localStorage.getItem('backgroundColor');
    const storageBackdrop = window.localStorage.getItem('backDrop');

    if (background) dispatch(setBackgroundColor(background));
    if (storageBackdrop) dispatch(setBackdropType(storageBackdrop));
  }, []);

  useEffect(() => {
    if (backDrop === 'dynamic') document.body.id = 'dynamic-body';
    if (backDrop === 'static') document.body.id = 'static-body';
  }, [backDrop]);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
    })();
  }, [dispatch]);

  const totalScore = useSelector(state => state.game.stats.score);
  const totalWords = useSelector(state => state.game.stats.words);
  const longestWord = useSelector(state => state.game.stats.longestWord);
  const tilesCleared = useSelector(state => state.game.stats.tilesCleared);
  const bombardier = useSelector(state => state.game.stats.bombardier);
  const stoneCrusher = useSelector(state => state.game.stats.stoneCrusher);
  const goldMiner = useSelector(state => state.game.stats.goldMiner);
  const wordSmith = useSelector(state => state.game.stats.wordSmith);
  const voidMaster = useSelector(state => state.game.stats.voidMaster);
  const fulminator = useSelector(state => state.game.stats.fulminator);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'flex-end', position: 'relative', right: '0.4vw'}}>
        <Musicplayer />
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
          bombardier={Math.trunc(bombardier / 3)} 
          stoneCrusher={Math.trunc(stoneCrusher / 3)}
          goldMiner={Math.trunc(goldMiner / 3)}
          wordSmith={wordSmith}
          voidMaster={Math.trunc(voidMaster / 3)}
          fulminator={Math.trunc(fulminator / 2)}
          />
        </Route>

        <Route path='/game/:difficulty'>
          <BoardHolder 
          dictionary={data}
          bombardier={Math.trunc(bombardier / 3)} 
          stoneCrusher={Math.trunc(stoneCrusher / 3)}
          goldMiner={Math.trunc(goldMiner / 3)}
          wordSmith={wordSmith}
          voidMaster={Math.trunc(voidMaster / 3)}
          fulminator={Math.trunc(fulminator / 2)}
          />
        </Route>

      </Switch>
    </div>
  );
};

export default App;
