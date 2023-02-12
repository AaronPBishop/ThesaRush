import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Letter from '../Letter/Letter.js'
import Badge from '../Badge/Badge.js';

import './styles.css';

const Instructions = ({ clickedBack }) => {
    const [clickedTips, setClickedTips] = useState(false);
    const [clickedGamePlay, setClickedGamePlay] = useState(false);
    const [clickedControls, setClickedControls] = useState(false);
    const [clickedSpecialTiles, setClickedSpecialTiles] = useState(false);
    const [clickedBadges, setClickedBadges] = useState(false);

    const menu = useSelector(state => state.menu);

    useEffect(() => {
        setClickedTips(false);
        setClickedGamePlay(false);
        setClickedControls(false);
        setClickedSpecialTiles(false);
        setClickedBadges(false);
    }, [clickedBack]);

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
            marginTop: '2vh',
            flexWrap: 'wrap',
            fontFamily: 'Roboto',
            color: 'white',
            listStyle: 'none',
            textAlign: 'center',
            lineHeight: '4vh'
        }}>
            <div
            className='instructions-containers'
            style={{
                marginTop: '2vh',
                backgroundColor: 'rgb(140, 0, 55)', 
                borderBottom: '4px solid rgb(105, 0, 40)',
                fontSize: clickedTips === false ? '24px' : '18px',
                padding: clickedTips === true && '1vw'
            }}
            onClick={() => setClickedTips(clicked => !clicked)}
            >
                {
                    clickedTips === false ?
                    <p>Tips and Tricks</p> :
                    <div>
                        <li>
                            The keyboard controls were devised so that you may place your left thumb on 'spacebar', ring-finger on 'tab', and middle-finder on 'Q'. This allows for rapid word submission/clearing and tile deselection without ever moving your hand away from the mouse!
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            ThesaRush is designed to reward longer word submissions and more skillful play. While it may be tempting to fire off 3-4 letter words, increased weight has been placed on puralizing-letters such as <b>E, S, I, R, N, G</b> etc. that can be added on to the ends of words in order to lengthen them.
                        </li>

                        <li style={{marginTop: '2vh', fontStyle: 'italic', color: 'rgb(95, 255, 0)'}}>
                            For example: If you have a three-letter word, try and find an 'ers' to add to it, and get a bomb tile! If you have a five-letter word, try and find an 'ing' to add to it and clear the whole bottom row + get a bomb tile.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Using special tiles and submitting longer words inevitably gets you more points and badges. More points and badges award void tiles, which can be turned into any letter you wish!
                        </li>
                    </div>
                }
            </div>

            <div
            className='instructions-containers'
            style={{
                backgroundColor: 'rgb(10, 50, 100)', 
                borderBottom: '4px solid rgb(0, 35, 80)',
                fontSize: clickedGamePlay === false ? '24px' : '18px',
                padding: clickedGamePlay === true && '1vw'
            }}
            onClick={() => setClickedGamePlay(clicked => !clicked)}
            >
                {
                    clickedGamePlay === false ?
                    <p>Game Play</p> :
                    <div>
                        <li>
                            Form words by clicking on letter tiles. Don't let the tiles stack to the top of the board!
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Clicked a wrong letter? Deselect and maintain the order of your word by clicking the same tile again.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Invalid words cause new tiles to drop immediately. Three invalid submissions in a row causes an entire row of tiles to drop.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Submit an <b>8-9</b> letter word to clear the <i style={{color: 'rgb(95, 255, 0)'}}>entire bottom row</i> and get a bomb tile. If you think you can pull it off, submit a <b>10-11</b> letter word and clear <i style={{color: 'rgb(95, 255, 0)'}}>both bottom rows</i>. Not enough for you? Submit a <b>12+</b> letter word to clear <i style={{color: 'rgb(95, 255, 0)'}}>all three bottom rows</i> and completely decimate the board.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Lives cost 500 points and are offered upon `Game Over` to logged-in users if adequate points or lives are available. Upon use, all columns stacked to the height of the board will be cleared (along with 3 tiles out of every other column) and you may continue playing!
                        </li>

                        <li style={{marginTop: '2vh', fontStyle: 'italic', color: 'rgb(95, 255, 0)'}}>
                            Lives may only be used once per game.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            You can send a challenge to another player within any league if you have at least 50 points. Select a time limit, then rack up as many points as you can. Await their response and compare your results! A challenge will be considered an automatic loss and/or not be sent if the tiles stack to the top of the board before the time limit is up. <b>Winners may claim up to 1,000 points!</b>
                        </li>
                    </div>
                }
            </div>

            <div
            className='instructions-containers'
            style={{
                backgroundColor: 'rgb(0, 100, 60)', 
                borderBottom: '4px solid rgb(0, 70, 30)',
                fontSize: clickedControls === false ? '24px' : '18px',
                padding: clickedControls === true && '1vw'
            }}
            onClick={() => setClickedControls(clicked => !clicked)}
            >
                {
                    clickedControls === false ?
                    <p>Controls</p> :
                    <div>
                        <li>
                            Submit a word by pressing <i style={{fontStyle: 'normal', color: 'rgb(95, 255, 0)'}}>'spacebar'</i> or clicking the green button to the right of the input area.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Clear the input bar by pressing <i style={{fontStyle: 'normal', color: 'rgb(95, 255, 0)'}}>'tab'</i> or clicking the red button to the left of the input area.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Undo the last letter you clicked by pressing <i style={{fontStyle: 'normal', color: 'rgb(95, 255, 0)'}}>'Q'</i>. You can continue to undo until the input bar is cleared.
                        </li>
                    </div>
                }
            </div>

            <div
            className='instructions-containers'
            style={{
                backgroundColor: 'rgb(255, 140, 0)', 
                borderBottom: '4px solid rgb(205, 90, 0)',
                fontSize: clickedSpecialTiles === false ? '24px' : '18px',
                padding: clickedSpecialTiles === true && '1vw'
            }}
            onClick={() => setClickedSpecialTiles(clicked => !clicked)}
            >
                {
                    clickedSpecialTiles === false ?
                    <p>Special Tiles</p> :
                    <div>
                        <li>
                            Submit a 6+ letter word and the next letter that drops will be a bomb tile. Use it to clear all the letters around it in a one-tile vicinity!
                        </li>
                            
                        <li style={{marginTop: '4vh'}}>
                            Stone tiles must be used twice in order to destroy them. You will know you've damaged a stone tile if its shade is darker than before, and it has a 'cracked' appearance.
                        </li>
                            
                        <li style={{marginTop: '4vh'}}>
                            Gold tiles are always X, Q, or Z. Use gold tiles to multiply your word score x2 for each gold tile used in your word.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Each time 50 points are accrued in your total score, the next tile dropped will be a void tile. Click on a void tile, then press any letter you wish for on your keyboard to turn it into that letter!
                        </li>

                        <div style={{
                            display: 'flex', 
                            justifyContent: 'space-evenly', 
                            margin: 'auto',
                            marginTop: '4vh', 
                            background: menu.backgroundColor,
                            height: '12vh',
                            width: '24vw',
                            boxShadow: '0px 0px 1px 1px black',
                            borderRadius: '12px'
                            }}>
                            <div style={{
                                display: 'flex', 
                                justifyContent: 'center',
                                marginTop: '23.5vh'
                            }}>
                                <div style={{marginRight: '1vw'}}>
                                    <Letter hidden={false} letter='B' colPos={0} rowPos={0} color={null} properties='bomb' />
                                </div>

                                <div style={{marginRight: '1vw'}}>
                                    <Letter hidden={false} letter='S' colPos={0} rowPos={0} color={null} properties={{stone: 2}} />
                                </div>

                                <div style={{marginRight: '1vw'}}>
                                    <Letter hidden={false} letter='Q' colPos={0} rowPos={0} color='rgb(210, 200, 30)' properties='gold' />
                                </div>
                                
                                <div>
                                    <Letter hidden={false} letter='' colPos={0} rowPos={0} color='black' properties={{void: true}} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div
            className='instructions-containers'
            style={{
                backgroundColor: 'rgb(140, 0, 55)', 
                borderBottom: '4px solid rgb(105, 0, 40)',
                fontSize: clickedBadges === false ? '24px' : '18px',
                padding: clickedBadges === true && '1vw'
            }}
            onClick={() => setClickedBadges(clicked => !clicked)}
            >
                {
                    clickedBadges === false ?
                    <p>Badges</p> :
                    <div>
                        <li>
                            Earn badges and rack up points by submitting longer words and using special tiles! Badges stack, which means you can earn several of the same badge type and earn tons of points. 
                        </li>

                        <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', flexWrap: 'wrap', marginTop: '4vh'}}>
                            <div onClick={e => e.stopPropagation()}>
                                <Badge badgeType='bombardier' numBadges={0} type='instructional' />
                            </div>

                            <div onClick={e => e.stopPropagation()}>
                                <Badge badgeType='stoneCrusher' numBadges={0} type='instructional' />
                            </div>

                            <div onClick={e => e.stopPropagation()}>
                                <Badge badgeType='goldMiner' numBadges={0} type='instructional' />
                            </div>

                            <div onClick={e => e.stopPropagation()}>
                                <Badge badgeType='wordSmith' numBadges={0} type='instructional' />
                            </div>

                            <div onClick={e => e.stopPropagation()}>
                                <Badge badgeType='voidMaster' numBadges={0} type='instructional' />
                            </div>

                            <div onClick={e => e.stopPropagation()}>
                                <Badge badgeType='fulminator' numBadges={0} type='instructional' />
                            </div>
                        </div>

                        <li style={{fontStyle: 'italic', marginTop: '2vh', color: 'rgb(95, 255, 0)'}}>
                            Earn 50 of any of the above badges to get a unique trophy to show off on your profile/scorecard + thousands of points!
                        </li>
                    </div>
                }
            </div>

        </div>
    );
};

export default Instructions;