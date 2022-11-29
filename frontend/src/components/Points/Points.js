import './styles.css';

const Points = ({ hidden, numPoints }) => {
    return (
        <div
        id={hidden ? 'hidden' : 'points'}
        style={{
            visibility: hidden ? 'hidden' : 'visible',

            color: numPoints < 8 ? 'white' 
            : numPoints >= 8 && numPoints <= 12 ? 'rgb(0, 255, 0    )'
            : numPoints > 12 && 'rgb(255, 252, 0)',

            fontWeight: numPoints > 12 && 'bold',

            fontSize: numPoints >= 8 && numPoints <= 12 ? 
            '22px' : numPoints > 12 && '24px'
        }}
        >
            {`+${numPoints} points!`}
        </div>
    );
};

export default Points;