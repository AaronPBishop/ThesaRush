import './styles.css';

const Points = ({ hidden, numPoints }) => {
    return (
        <div
        id={hidden ? 'hidden' : 'points'}
        style={{
            visibility: hidden ? 'hidden' : 'visible',
            color: numPoints < 8 ? 'white' : 'rgb(255, 255, 0)',
            fontWeight: numPoints >= 8 && 'bold',
            fontSize: numPoints >= 8 && '22px'
        }}
        >
            {`+${numPoints} points!`}
        </div>
    );
};

export default Points;