import { Switch, Route } from 'react-router-dom';

import BoardHolder from './components/BoardHolder/BoardHolder.js';
import Menu from './components/Menu/Menu.js';

function App() {
  return (
    <div>
      <Switch>

        <Route exact path='/'>
          <Menu />
        </Route>

        <Route path='/game/:difficulty'>
          <BoardHolder />
        </Route>

      </Switch>
    </div>
  );
};

export default App;
