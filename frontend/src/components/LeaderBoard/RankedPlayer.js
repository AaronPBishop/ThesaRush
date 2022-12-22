import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RankedPlayer = ({ score, userName, id }) => {
    const ignoreStats = ['user_id', 'user_name', 'high_score', 'points_balance', 'lives'];

    const user = useSelector(state => state.user);
    const players = useSelector(state => state.players);
    const clickedLeaderBoard = useSelector(state => state.menu.clickedLeaderBoard);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (clickedLeaderBoard === false) setClicked(false);
    }, [clickedLeaderBoard])

    const [statsMap] = useState({
        points: 'Total points Earned',
        words: 'Valid Words Submitted',
        longest_word: 'Longest Word',
        tiles_cleared: 'Tiles Cleared',
        bombardier: 'Bombardier Badges',
        stone_crusher: 'Stone Crusher Badges',
        gold_miner: 'Gold Miner Badges',
        word_smith: 'Word Smith Badges',
        void_master: 'Void Master Badges',
    });

    const orderKeys = (keys) => {
        const badges = ['bombardier', 'stone_crusher', 'gold_miner', 'word_smith', 'void_master'];
        const order = [];

        keys.forEach(key => {if (!badges.includes(key) && key !== 'longest_word') order.push(key)});
        order.push('longest_word');
        keys.forEach(key => {if (badges.includes(key)) order.push(key)});

        return order;
    };

    return (
            <div 
            onClick={() => setClicked(clicked => !clicked)}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'black',
                fontFamily: 'Roboto',
                flexWrap: 'wrap',
                marginBottom: '2vh',
                border: '2px solid rgb(120, 120, 255)',
                borderRadius: '12px',
                minWidth: '24vw',
                maxWidth: '24vw',
                maxHeight: !clicked && '7vh',
                overflowY: 'auto',
                cursor: 'pointer'
            }}>
                <p style={{
                    margin: '1vw', 
                    color: user.user_name === userName.toString() && 'rgb(255, 255, 60)',
                    fontWeight: user.user_name === userName.toString() && 'bold'
                    }}>
                        {userName}
                    </p>
                <b style={{margin: '1vw'}}>{score}</b>
                
               <div style={{display: clicked ? 'block' : 'none', marginTop: '2vh'}}>
                    {
                        players[id] &&
                        orderKeys(Object.keys(players[id])).map((stat, i) => (
                            !ignoreStats.includes(stat) &&
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '24vw', margin: 'auto', flexWrap: 'wrap'}} key={i}>
                                <p style={{margin: '1vw'}}>{statsMap[stat]}:</p>
                                <b style={{margin: '1vw'}}>{players[id][stat]}</b>
                            </div>
                        ))          
                    }
                </div>
             
            </div>
    )
};

export default RankedPlayer;