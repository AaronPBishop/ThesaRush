import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetGame, resetStats } from '../../store/game';
import { resetStatuses } from '../../store/offerStatuses';
import { resetChallengeState } from '../../store/challenge';
import { setClickedChallenges, setClickedProfile } from '../../store/menu';

const ChallengeStatus = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const challenge = useSelector(state => state.challenge);

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: 'rgb(140, 0, 55)',
            width: '24vw',
            height: '12vh',
            borderBottom: '4px solid rgb(105, 0, 40)',
            borderRadius: '12px',
            lineHeight: '6vh',
            marginBottom: '4vh'
        }}>
            <div style={{textAlign: 'center'}}>
                <b>
                    {
                      (challenge.isChallenger && challenge.completedChallenge) ? 'Challenge Sent' 
                    : (challenge.isChallenger && challenge.completedChallenge === false) ? 'Challenge Failed' 
                    : (challenge.isChallengee && challenge.completedChallenge) ? 'Challenge Completed' 
                    : (challenge.isChallengee && challenge.completedChallenge === false) && 'Challenge Failed'
                    }
                </b>

                <div
                style={{
                    fontFamily: 'Bungee Spice',
                    lineHeight: '5.5vh',
                    backgroundColor: 'rgb(95, 0, 30)',
                    width: '16vw',
                    height: '5vh',
                    marginTop: '-0.5vh',
                    borderRadius: '8px',
                    borderBottom: '4px solid rgb(75, 0, 10)',
                    cursor: 'pointer'
                }}
                onClick={e => {
                   dispatch(resetGame());
                   dispatch(resetStats());
                   dispatch(resetStatuses());
                   dispatch(resetChallengeState());

                   history.push('/');

                   dispatch(setClickedProfile(true));
                   dispatch(setClickedChallenges(true));

                   e.preventDefault();
                }}
                >
                    View Challenges
                </div>
            </div>
        </div>
    );
};

export default ChallengeStatus;