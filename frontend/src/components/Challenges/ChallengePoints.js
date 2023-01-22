import './styles.css';

const ChallengePoints = ({ hidden, numPoints }) => {
    return (
        <div
        id='challenge-points'
        style={{
            display: hidden === true ? 'block' : 'none',
            fontFamily: 'Bungee Spice',
            fontSize: '24px'
        }}>
            {`+${numPoints} points!`}
        </div>
    );
};

export default ChallengePoints;