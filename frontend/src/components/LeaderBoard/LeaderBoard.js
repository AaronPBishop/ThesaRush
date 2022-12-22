import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchLeaderBoardData } from "../../store/leaderboard.js";
import { fetchPlayerData } from "../../store/players.js";

import RankedPlayer from "./RankedPlayer.js";

const LeaderBoard = () => {
    const dispatch = useDispatch();

    const rankings = useSelector(state => state.leaderBoard);
    const clickedLeaderBoard = useSelector(state => state.menu.clickedLeaderBoard);
    const backgroundColor = useSelector(state => state.backgroundColor);

    useEffect(() => {
        if (clickedLeaderBoard === true) {
            dispatch(fetchLeaderBoardData());
            dispatch(fetchPlayerData());
        };
    }, [clickedLeaderBoard]);

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontFamily: 'Bungee Spice',
            margin: 'auto',
            marginTop: '14vh',
            padding: '2vw',
            width: '26vw',
            height: '55vh',
            overflowY: 'auto',
            background: backgroundColor,
            border: '2px solid #FFD700',
            borderRadius: '12px'
        }}>
            <p style={{fontSize: '26px', marginTop: '-2vh'}}>Leader Board</p>
            
            {
                rankings.map((ranking, i) => <RankedPlayer score={Object.keys(ranking)[0]} userName={Object.values(ranking)[0]} id={Object.values(ranking)[1]} key={i} />)
            }
        </div>
    );
};

export default LeaderBoard;