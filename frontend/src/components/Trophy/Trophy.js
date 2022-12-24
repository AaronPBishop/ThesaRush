import { useState } from 'react';

import './styles.css';

const Trophy = ({ trophyType, container }) => {
    const [clicked, setClicked] = useState(false);

    const mapStyles = {
        MasterBlaster: {
            description: 'Earned 50 Bombardier Badges',
            backgroundColor: 'rgb(255,69,0)',
            color: 'yellow',
            boxShadow: '0px 0px 15px 5px rgb(255, 49, 49)',
            border: '4px solid rgb(180, 65, 0)'
        }
    };

    return (
        <div 
        onClick={() => setClicked(clicked => !clicked)}
        style={mapStyles[trophyType.replace(/ /g, '')] && {
            backgroundImage: clicked && 'none',
            backgroundColor: mapStyles[trophyType.replace(/ /g, '')].backgroundColor,
            color: mapStyles[trophyType.replace(/ /g, '')].color,
            boxShadow: mapStyles[trophyType.replace(/ /g, '')].boxShadow,
            border: mapStyles[trophyType.replace(/ /g, '')].border,
            width: container && '14vw',
            height: container && '27vh',
        }}
        id={!clicked ? 'animate-swivel' : 're-animate-swivel'}
        className='trophies'>
            {
                !clicked ?
                <p id='animate-text' style={{fontSize: '22px', marginTop: !container ? '22vh' : '21vh'}}>{trophyType}</p> :
                <p style={{fontSize: '20px', marginTop: '8vh', width: '10vw'}}>{mapStyles[trophyType.replace(/ /g, '')].description}</p>
            }
        </div>
    );
};

export default Trophy;