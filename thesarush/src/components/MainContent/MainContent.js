import Board from '../Board/Board';
import './styles.css';

const MainContent = () => {
    

    return (
        <div id='main-content'>
            <h1 id='header'>ThesaRush</h1>
            
            <div id='game-box'>

                <div id='board'>
                    
                    <Board />
                    
                    <form>
                        <button id='clear'></button>
                        <input id='word-bar' type='text' disabled={true}></input>
                        <button id='send' type='submit'></button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default MainContent;