import './styles.css';

const MainContent = () => {
    return (
        <div id='main-content'>
            <h1 id='header'>ThesaRush</h1>
            <div id='game-box'>
                <form>
                    <input id='word-bar' type='text'></input>
                </form>
            </div>
        </div>
    );
};

export default MainContent;