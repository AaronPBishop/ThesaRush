const OfferLife = ({ userLives }) => {
    userLives = 1;

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Roboto',
            color: 'white',
            border: '4px solid rgb(10, 100, 140)',
            borderRadius: '100vh',
            backgroundColor: 'rgb(20, 20, 20)',
            width: '20vw',
            height: '40vh',
            margin: 'auto'
        }}>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '10vw', margin: 'auto'}}>
                <p 
                style={{
                    padding: '1vw',
                    backgroundColor: 'rgb(140, 0, 55)', 
                    borderBottom: '3.5px solid rgb(105, 0, 40)',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    USE LIFE
                </p>
                <p>{userLives} lives available</p>
            </div>
        </div>
    );
};

export default OfferLife;