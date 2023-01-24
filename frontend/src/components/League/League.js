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
        'Bronze': ['linear-gradient(to bottom, rgb(160, 75, 55), rgb(170, 45, 25))', 'rgb(140, 35, 25)'],
        'Silver': ['linear-gradient(to bottom, rgb(174, 162, 162), rgb(117, 130, 131))', 'rgb(80, 100, 110)'],
        'Gold': ['linear-gradient(to bottom, #FACC6B, #FABC3C)', 'rgb(190, 160, 40)'],
        'Ethereal': ['linear-gradient(to bottom, #A4508B, #5F0A87)', 'rgb(125, 10, 125)'],
        'Galaxy': ['linear-gradient(to bottom, rgb(40, 0, 100), rgb(0, 0, 10))', 'rgb(80, 0, 110)'],
        'Cosmic': ['linear-gradient(to bottom, rgba(185, 10, 180, 1) 5%, rgba(250, 35, 155, 1) 35%, rgba(255, 35, 100, 1) 95%', 'rgba(185, 0, 130, 1)'],
        //'Cosmic':  ['linear-gradient(to bottom, rgba(252,37,103,1) 0%, rgba(250,38,151,1) 46.2%, rgba(186,8,181,1) 90.1%']
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
                    margin: 'auto',
                    lineHeight: '5.5vh',
                    backgroundColor: 'rgb(140, 0, 55)',
                    borderBottom: '3.5px solid rgb(105, 0, 40)',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    fontSize: '16px',
                    boxShadow: '0px 1px 4px 1px black',
                    textShadow: 'black 0px 4px 2px',
                    width: '26vw',
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
                        border: `3px solid yellow`,
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
                        ['Bronze', 'Silver', 'Gold', 'Ethereal', 'Galaxy', 'Cosmic'].map((league, i) => (
                        <div 
                        className="theme-containers"
                        onClick={() => {
                            setCurrLeague(league);
                            setClickedBrowse(false);
                        }}
                        style={{
                            background: mapBackgroundColor[league][0],
                            boxShadow: `0px 0px 6px 3px ${mapBackgroundColor[league][1]}`,
                            border: 'none',
                            borderRadius: '10px',
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