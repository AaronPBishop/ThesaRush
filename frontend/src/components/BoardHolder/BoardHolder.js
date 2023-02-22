import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Board from '../Board/Board';
import Points from '../Scoring/Points';
import InGameBadges from '../Scoring/InGameBadges';
import orderInput from '../../functions/orderInput.js';
import OfferLife from './OfferLife.js';
import RewardChart from './RewardChart.js';

import { CloseSquare } from '@styled-icons/evaicons-solid/CloseSquare';
import { CheckmarkSquare } from '@styled-icons/fluentui-system-filled/CheckmarkSquare';

import sfx1 from '../../error_005.ogg';
import sfx2 from '../../error_004.ogg';

import './styles.css';

import { 
    clearTiles, 
    rearrangeTiles, 
    dropLettersAction, 
    dropRow, 
    resetOrder, 
    resetTiles, 
    resetInput,
    setCleared,
    setSubmitted,
    resetGame,
    incrementInvalidWords, 
    determinePoints, 
    addToScore,
    resetPoints, 
    incrementWords, 
    setLongestWord,
    resetStats,
    removeLastChar,
    setUsedLightning
} from '../../store/game';

import { resetStatuses } from '../../store/offerStatuses';
import { resetChallengeState, updateChallenge } from '../../store/challenge';
import { incurrLoss } from '../../store/user.js';

const BoardHolder = ({ dictionary, bombardier, stoneCrusher, goldMiner, wordSmith, voidMaster, fulminator }) => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const invalidWordSfx = new Audio(sfx1);
    const tooShortSfx = new Audio(sfx2);

    const [isValid, setIsValid] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const [earnedBadge, setEarnedBadge] = useState(false);
    const [currBadge, setCurrBadge] = useState('');

    const [isHovering, setIsHovering] = useState(false);

    const submitted = useSelector(state => state.game.statuses.submitted);

    const input = useSelector(state => state.game.input);
    const orderedInput = orderInput(Object.values(input));

    const invalidWords = useSelector(state => state.game.stats.invalidWords)
    const points = useSelector(state => state.game.stats.points);
    const score = useSelector(state => state.game.stats.score);
    const usedLightning = useSelector(state => state.game.statuses.usedLightning);

    const user = useSelector(state => state.user);
    const menu = useSelector(state => state.menu);

    const challenge = useSelector(state => state.challenge);

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }, []);
 
    useEffect(() => {
        if (orderedInput.length === 0) return;

        if (orderedInput.length > 0 && orderedInput.length <= 2) {
            tooShortSfx.play();
            return;
        };
  
        if (dictionary[orderedInput.toLowerCase()]) {
            setIsValid(true);
            dispatch(clearTiles());
            dispatch(rearrangeTiles());
        
            dispatch(determinePoints(orderedInput.length, orderedInput));
            dispatch(incrementWords());
            dispatch(setLongestWord(orderedInput));
        } else {
            invalidWordSfx.play();

            dispatch(incrementInvalidWords());
            setInvalid(true);
        
            if (invalidWords <= 1) {
                for (let i = 0; i <= (invalidWords + 1); i++) dispatch(dropLettersAction());
            };
        
            if (invalidWords > 1) dispatch(dropRow());
        };

        dispatch(resetInput());
        dispatch(resetOrder());
        dispatch(resetTiles());

        const timer = setTimeout(() => {
            setIsValid(false);
            setInvalid(false);
            dispatch(resetPoints());
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [submitted]);

    useEffect(() => {
        const keyDownHandler = e => {
            e.preventDefault();

            if (e.code === 'Space') dispatch(setSubmitted((submitted) => !submitted));

            if (e.code === 'Tab') {
                dispatch(setCleared((cleared) => !cleared));

                dispatch(resetInput());
                dispatch(resetOrder());
                dispatch(resetTiles());
            };

            if (e.keyCode === 81) dispatch(removeLastChar());
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, []);

    const dispatchBadgeActions = (badgeType, badgeName) => {
        if (badgeType > 0) {
            dispatch(addToScore(30));
            setIsValid(true);
            setEarnedBadge(true);
            setCurrBadge(badgeName);

            const timer = setTimeout(() => {
                dispatch(resetPoints());
                setIsValid(false);
                setEarnedBadge(false);
            }, 1000);

            return () => clearTimeout(timer);
        };
    };

    useEffect(() => {dispatchBadgeActions(bombardier, 'bombardier')}, [bombardier]);
    useEffect(() => {dispatchBadgeActions(stoneCrusher, 'stoneCrusher')}, [stoneCrusher]);
    useEffect(() => {dispatchBadgeActions(goldMiner, 'goldMiner')}, [goldMiner]);
    useEffect(() => {dispatchBadgeActions(wordSmith, 'wordSmith')}, [wordSmith]);
    useEffect(() => {dispatchBadgeActions(voidMaster, 'voidMaster')}, [voidMaster]);
    useEffect(() => {dispatchBadgeActions(fulminator, 'fulminator')}, [fulminator]);

    useEffect(() => {
        if (usedLightning === true) {
            const flashTimer = setTimeout(() => {
                dispatch(setUsedLightning(false));
            }, [500]);

            return () => clearTimeout(flashTimer);
        };
    }, [usedLightning]);
    
    return (
        <div>
            <div 
            id='header-container'
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={async e => {
                await history.push('/');
                
                await dispatch(resetGame());

                if (challenge.inChallenge === true) {
                    if (challenge.isChallenger === true) await dispatch(incurrLoss(user.user_id));
                    if (challenge.isChallengee === true) await dispatch(updateChallenge(challenge.challengeId, 0));
                };

                await dispatch(resetStats());
                await dispatch(resetStatuses());
                await dispatch(resetChallengeState());

                e.preventDefault();
            }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                height: '6vh',
                width: '26vw',
                margin: 'auto',
                fontFamily: 'Bungee Spice, cursive',
                fontSize: '8vh',
                lineHeight: '5vh',
                cursor: 'pointer',
                textShadow: isHovering ? 'rgb(90, 90, 210) 0px 1px 8px' : 'black 0px 1px 8px'
            }}>
                <div 
                onClick={e => e.stopPropagation()}
                id='score-tab'>
                    Score: <b>{score}</b>
                </div>

                ThesaRush
            </div>
            
            <div>
                <RewardChart orderedInputLen={orderedInput.length} />

                <div 
                id='game-box'
                style={{
                    boxShadow: invalid === false ? 
                    '0px 8px 20px rgb(0, 160, 30)' : 
                    '0px 20px 40px 20px rgb(210, 4, 45)',
                    background: menu.backgroundColor
                }}>

                    <div 
                    style={{
                        display: challenge.inChallenge ? 'block' : 'none',
                        position: 'absolute', 
                        marginBottom: '90vh', 
                        width: '50vw', 
                        border: '10px solid rgb(200, 0, 65)',
                        borderRadius: '4px',
                        boxShadow: '0px 0.5px 10px 1px red',
                        animation: `challenge-timer ${challenge.time / 1000}s`
                    }}>
                    </div>

                    <div style={{position: 'absolute'}}>
                        <Points hidden={isValid === false} numPoints={points} />
                        <InGameBadges hidden={earnedBadge === false} badge={currBadge} />
                    </div>

                    <OfferLife />

                    <div>
                        <div style={{
                            display: usedLightning ? 'flex' : 'none', 
                            justifyContent: 'center', 
                            margin: 'auto',
                            position: 'absolute', 
                            height: '115%', 
                            width: '600%', 
                            marginTop: '-10vh',
                            marginLeft: '-40vw'
                        }}>
                            <div 
                            id='lightning-flash-div'
                            style={{
                                margin: 'auto',
                                backgroundColor: 'yellow',
                                width: 'inherit'
                            }}>
                            </div>
                        </div>

                        <Board difficulty={params.difficulty} />
                        
                        <form
                        className='input-actions'>
                            <div 
                            id='clear'
                            onClick={() =>{
                                dispatch(setCleared((cleared) => !cleared));
                                dispatch(resetInput());
                                dispatch(resetOrder());
                                dispatch(resetTiles());
                            }}>
                                <CloseSquare
                                style={{
                                    color: 'rgb(120, 0, 20)',
                                    width: '2vw'
                                }}>
                                </CloseSquare>
                            </div>

                            <input 
                            id='word-bar' 
                            type='text' 
                            disabled={true} 
                            value={orderedInput}>
                            </input>

                            <div 
                            id='send'
                            onClick={() => dispatch(setSubmitted((submitted) => !submitted))}>
                                <CheckmarkSquare
                                style={{
                                    color: 'rgb(0, 60, 20)',
                                    width: '2vw'
                                }}>
                                </CheckmarkSquare>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardHolder;