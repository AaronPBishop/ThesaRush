import './styles.css';

const Points = ({ hidden, numPoints }) => {
    return (
        <div
        id={
            [
                'points',
                hidden ? "hidden" : null
            ]
                .filter(Boolean)
                .join(" ")
            }>
            {`+${numPoints} points!`}
        </div>
    );
};

export default Points;