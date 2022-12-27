import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchLeaderBoardData } from "../../store/leaderboard.js";

import RankedPlayer from "./RankedPlayer.js";

const LeaderBoard = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const rankings = useSelector(state => state.leaderBoard);
    const clickedLeaderBoard = useSelector(state => state.menu.clickedLeaderBoard);
    const backgroundColor = useSelector(state => state.backgroundColor);

    const mapBackgroundColor = {
        'Bronze': 'linear-gradient(to bottom, #CD7F32 20%, #BE7023 80%)'
    }

    useEffect(() => {
        if (clickedLeaderBoard === true && user.user_name) dispatch(fetchLeaderBoardData(user.league));
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
            background: mapBackgroundColor[rankings.league],
            border: '2px solid #FFD700',
            borderRadius: '12px'
        }}>
            {
                user.user_name ?
                <div>
                    <p style={{fontSize: '26px', marginTop: '-2vh'}}>{rankings.league} League</p>

                    {
                        Object.keys(rankings).map((player, i) => player !== 'league' && <RankedPlayer score={rankings[player].points} userName={player} key={i} />)
                    }
                </div> :
                <p style={{width: '14vw', fontSize: '26px', marginTop: '14vh'}}>Sign In to View League Data!</p>
            }
        </div>
    );
};

export default LeaderBoard;