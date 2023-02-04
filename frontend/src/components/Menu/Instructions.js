import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Letter from '../Letter/Letter.js'
import Badge from '../Badge/Badge.js';

import './styles.css';

const Instructions = ({ clickedBack }) => {
    const [clickedGamePlay, setClickedGamePlay] = useState(false);
    const [clickedControls, setClickedControls] = useState(false);
    const [clickedSpecialTiles, setClickedSpecialTiles] = useState(false);
    const [clickedBadges, setClickedBadges] = useState(false);

    const menu = useSelector(state => state.menu);

    useEffect(() => {
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
            marginTop: '4vh',
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
                            Form words by clicking letter tiles. Don't let the tiles reach the top!
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Invalid words cause new tiles to drop immediately. Three invalid submissions in a row causes an entire row of tiles to drop.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Clicked a wrong letter? Deselect and maintain the order of your word by clicking the same tile again.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Submit an 8+ letter word to clear the <i>entire bottom row</i> and get a bomb tile.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Lives cost 500 points and are offered upon `Game Over` to logged-in users if adequate points or lives are available. Upon use, all columns stacked to the height of the board will clear and you may continue playing!
                        </li>

                        <li style={{marginTop: '2vh', fontStyle: 'italic'}}>
                            Lives may only be used once per game.
                        </li>
                    </div>
                }
            </div>

            <div
            className='instructions-containers'
            style={{
                backgroundColor: 'rgb(140, 0, 55)', 
                borderBottom: '4px solid rgb(105, 0, 40)',
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
                            Submit a word by pressing <i style={{fontStyle: 'normal', color: 'yellow'}}>'spacebar'</i> or clicking the green button to the right of the input area.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Clear the input bar by pressing <i style={{fontStyle: 'normal', color: 'yellow'}}>'tab'</i> or clicking the red button to the left of the input area.
                        </li>

                        <li style={{marginTop: '4vh'}}>
                            Undo the last letter you clicked by pressing <i style={{fontStyle: 'normal', color: 'yellow'}}>'Q'</i>. You can continue to undo until the input bar is cleared.
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
                            Stone tiles must be used twice in order to destroy them. You will know you've damaged a stone tile if its shade is darker than before.
                        </li>
                            
                        <li style={{marginTop: '4vh'}}>
                            Gold tiles are always 'X', 'Q', or 'Z'. Use gold tiles to multiply your score x2 for each gold tile used in your word.
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
                            width: '19vw',
                            boxShadow: '0px 0px 1px 1px black',
                            borderRadius: '12px'
                            }}>
                            <div style={{
                                display: 'flex', 
                                justifyContent: 'center',
                                marginTop: '23.5vh'
                            }}>
                                <Letter hidden={false} letter='B' colPos={0} rowPos={0} color={null} properties='bomb' />
                                <Letter hidden={false} letter='S' colPos={0} rowPos={0} color={null} properties={{stone: 2}} />
                                <Letter hidden={false} letter='Q' colPos={0} rowPos={0} color='rgb(210, 200, 30)' properties='gold' />
                                <Letter hidden={false} letter='' colPos={0} rowPos={0} color='black' properties={{void: true}} />
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div
            className='instructions-containers'
            style={{
                backgroundColor: 'rgb(0, 100, 60)', 
                borderBottom: '4px solid rgb(0, 70, 30)',
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
                        </div>
                    </div>
                }
            </div>

        </div>
    );
};

export default Instructions;