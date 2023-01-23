import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clearLeagueData, fetchLeagueData } from "../../store/league.js";

import RankedPlayer from "./RankedPlayer.js";

const League = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const rankings = useSelector(state => state.league);
    const clickedLeague = useSelector(state => state.menu.clickedLeague);
    const backgroundColor = useSelector(state => state.backgroundColor);

    const [currLeague, setCurrLeague] = useState(undefined);
    const [rerender, setRerender] = useState(false);
    const [clickedBrowse, setClickedBrowse] = useState(false);
    const [clickedPlayer, setClickedPlayer] = useState(false);

    const mapBackgroundColor = {
        'Bronze': ['linear-gradient(to bottom, rgb(160, 75, 55), rgb(170, 45, 25))', 'rgb(100, 35, 15)'],
        'Silver': ['linear-gradient(to bottom, rgb(174, 162, 162), rgb(117, 130, 131))', 'rgb(87, 100, 101)'],
        'Gold': ['linear-gradient(to bottom, #FACC6B, #FABC3C)', 'rgb(190, 158, 40)'],
        'Ethereal': ['linear-gradient(to bottom, #A4508B, #5F0A87)', 'rgb(85, 10, 105)'],
        'Galaxy': ['linear-gradient(to bottom, rgb(40, 0, 100), rgb(0, 0, 10))', 'rgb(30, 0, 50)'],
        'Astral': ['linear-gradient(to bottom, rgba(250, 237, 56, 1) 10%, rgba(241, 147, 55, 1) 30%, rgba(255, 37, 174, 1)) 60%', 'rgba(185, 32, 144, 1)']
    };

    useEffect(() => {
        if (clickedLeague === true && user.user_name) {
            dispatch(clearLeagueData());
            setCurrLeague(user.league);
            setRerender(rerender => !rerender);
        };
    }, [clickedLeague]);

    useEffect(() => {dispatch(fetchLeagueData(currLeague))}, [rerender, currLeague]);

    return (
        <div
        style={{
            display: 'block',
            fontFamily: 'Bungee Spice',
            textShadow: '0px 3px 2px black',
            margin: 'auto',
            marginTop: '14vh',
            width: '30vw',
            height: '64vh',
            overflowY: 'auto',
            background: user.user_name ? mapBackgroundColor[rankings.league] && mapBackgroundColor[rankings.league][0] : backgroundColor,
            border: '2px solid #FFD700',
            borderRadius: '12px',
            overflowX: 'hidden'
        }}>
                <div 
                onClick={() => setClickedBrowse(clicked => !clicked)}
                style={{
                    display: user.user_name && !clickedPlayer ? 'flex' : 'none',
                    justifyContent: 'center',
                    lineHeight: '5.5vh',
                    backgroundColor: 'rgb(140, 0, 55)',
                    borderBottom: '3.5px solid rgb(105, 0, 40)',
                    fontSize: '16px',
                    boxShadow: '0px 1px 4px 1px black',
                    textShadow: 'black 0px 4px 2px',
                    width: 'inherit',
                    height: '5vh',
                    cursor: 'pointer'
                }}>
                    Browse All Leagues
                </div>

            {
                user.user_name && clickedBrowse === false ?
                <div>
                    <p style={{fontSize: '26px'}}>
                        {rankings.league} League
                    </p>

                    {
                        rankings.players && rankings.players.map((player, i) => (
                        <div style={{display: 'flex', justifyContent: 'center'}} onClick={() => setClickedPlayer(clicked => !clicked)}>
                            <RankedPlayer score={player.points} userName={player.user_name} index={i} key={i} />
                        </div>))
                    }
                </div> 

                : user.user_name && clickedBrowse === true ?
                <div style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        fontFamily: 'Roboto',
                        border: `2px solid ${mapBackgroundColor[currLeague][1]}`,
                        borderRadius: '12px',
                        width: '20vw', 
                        height: '50vh',
                        backgroundColor: 'black',
                        flexWrap: 'wrap', 
                        margin: 'auto', 
                        marginTop: '4vh',
                        overflowY: 'auto'
                    }}>
                    {
                        ['Bronze', 'Silver', 'Gold', 'Ethereal', 'Galaxy', 'Astral'].map((league, i) => (
                        <div 
                        onClick={() => {
                            setCurrLeague(league);
                            setClickedBrowse(false);
                        }}
                        className="theme-containers"
                        style={{
                            background: mapBackgroundColor[league][0],
                            border: `2px solid ${mapBackgroundColor[league][1]}`,
                            margin: 'auto',
                            marginTop: '1.5vh',
                            marginBottom: '1.5vh'
                        }}
                        key={i}>
                            {league}
                        </div>))
                    }
                </div> 

                : !user.user_name &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '16vh'}}>
                    <p style={{width: '14vw', fontSize: '26px'}}>Sign In to Access Leagues</p>
                </div>
            }
        </div>
    );
};

export default League;