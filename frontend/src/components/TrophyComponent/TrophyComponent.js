import { useState } from 'react';

import { Trophy } from '@styled-icons/fa-solid/Trophy';
import { Tools } from '@styled-icons/entypo/Tools';

import './styles.css';

const TrophyComponent = ({ trophyType, container }) => {
    const [clicked, setClicked] = useState(false);

    const mapStyles = {
        MasterBlaster: {
            description: 'Earned 50 Bombardier Badges',
            backgroundColor: 'rgb(255,69,0)',
            color: 'yellow',
            boxShadow: '0px 0px 15px 5px rgb(255, 49, 49)',
            border: '4px solid rgb(160, 55, 0)',
            trophyColor: 'black'
        },
        ObeliskOracle: {
            description: 'Earned 50 Stone Crusher Badges',
            backgroundColor: 'rgb(30, 80, 60)',
            color: 'white',
            boxShadow: '0px 0px 14px 8px #383630',
            border: '4px solid rgb(0, 40, 30)',
            trophyColor: 'black'
        },
        KingMidas: {
            description: 'Earned 50 Gold Miner Badges',
            backgroundColor: 'rgb(210, 200, 30)',
            color: 'white',
            boxShadow: '0px 0px 12px 4px #FFD700',
            border: '4px solid yellow',
            trophyColor: 'black'
        },
        AlphabetArchitect: {
            description: 'Earned 50 Word Smith Badges',
            backgroundColor: 'rgb(40, 0, 80)',
            color: 'white',
            boxShadow: '0px 0px 12px 4px rgb(160, 0, 190)',
            border: '4px solid rgb(20, 0, 60)',
            trophyColor: 'black'
        },
        AntimatterVirtuoso: {
            description: 'Earned 50 Void Master Badges',
            backgroundColor: 'black',
            color: 'white',
            boxShadow: '0px 0px 12px 4px white',
            border: '4px solid white',
            trophyColor: 'white'
        }
    };

    return (
        <div 
        onClick={() => setClicked(clicked => !clicked)}
        style={mapStyles[trophyType.replace(/ /g, '')] && {
            backgroundColor: mapStyles[trophyType.replace(/ /g, '')].backgroundColor,
            color: mapStyles[trophyType.replace(/ /g, '')].color,
            boxShadow: mapStyles[trophyType.replace(/ /g, '')].boxShadow,
            border: mapStyles[trophyType.replace(/ /g, '')].border,
            width: container && '14vw',
            height: container && '27vh'
        }}
        id={!clicked ? 'animate-swivel' : 're-animate-swivel'}
        className='trophies'>

            <Trophy 
            style={{
                display: !clicked && trophyType !== 'Alphabet Architect' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: trophyType === 'Antimatter Virtuoso' ? '4vh' : '3vh',
                width: trophyType === 'Antimatter Virtuoso' ? '7vw' : '8vw'
            }}>
            </Trophy>

            <Tools 
            style={{
                display: !clicked && trophyType === 'Alphabet Architect' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }}>
            </Tools>

            {
                !clicked ?
                <p id='animate-text' style={{fontSize: '22px', width: '14vw'}}>{trophyType}</p> 
                :
                <p style={{fontSize: '20px', marginTop: '8vh', width: '10vw'}}>{mapStyles[trophyType.replace(/ /g, '')].description}</p>
            }
        </div>
    );
};

export default TrophyComponent;