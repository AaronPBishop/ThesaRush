import './styles.css';

const ChallengePoints = ({ hidden, numPoints }) => {
    return (
        <div
        style={{
            fontFamily: 'Bungee Spice',
            visibility: hidden === false ? 'hidden' : 'visible',
            fontSize: '24px'
        }}>
            {`+${numPoints} points!`}
        </div>
    );
};

export default ChallengePoints;