import './styles.css';

const InGameBadges = ({ hidden, badge }) => {
    const inGameBadges = {
        bombardier: <p id='ingame-badge'>💣 Bombardier</p>,
        stoneCrusher: <p id='ingame-badge'>🪨 Stone Crusher</p>,
        goldMiner: <p id='ingame-badge'>🪙 Gold Miner</p>,
        wordSmith: <p id='ingame-badge'>🛠️ Word Smith</p>,
        voidMaster: <p id='ingame-badge'>🪄 Void Master</p>,
        fulminator: <p id='ingame-badge'>⚡ Fulminator</p>
    };

    return (
        <div style={{visibility: hidden ? 'hidden' : 'visible'}}>
            {inGameBadges[badge]}
        </div>
    );
};

export default InGameBadges;