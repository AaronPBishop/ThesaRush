import { useState } from 'react';

import { Tools } from '@styled-icons/entypo/Tools';
import { BrainCircuit } from '@styled-icons/fluentui-system-filled/BrainCircuit';
import { Sword } from '@styled-icons/remix-fill/Sword';
import { Bomb } from '@styled-icons/fa-solid/Bomb';
import { Mountains } from '@styled-icons/foundation/Mountains';
import { Diamond } from '@styled-icons/ionicons-solid/Diamond';
import { Connectdevelop } from '@styled-icons/fa-brands/Connectdevelop';

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
        TreasureTactician: {
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
            boxShadow: '0px 0px 12px 4px rgb(100, 0, 190)',
            border: '4px solid rgb(20, 0, 60)',
            trophyColor: 'white'
        },
        AntimatterMaestro: {
            description: 'Earned 50 Void Master Badges',
            backgroundColor: 'black',
            color: 'white',
            boxShadow: '0px 0px 12px 4px white',
            border: '4px solid white',
            trophyColor: 'white'
        },
        VengeantVanquisher: {
            description: 'Won 50 Challenges',
            backgroundColor: 'rgb(128, 0, 32)',
            color: 'white',
            boxShadow: '0px 0px 12px 4px red',
            border: '4px solid rgb(105, 0, 0)',
            trophyColor: 'black'
        },
        TypeIInstance: {
            description: 'Attained Cosmic League Status',
            backgroundColor: 'rgba(185, 10, 180, 1)',
            color: 'white',
            boxShadow: '0px 0px 12px 4px purple',
            border: '4px solid rgba(125, 0, 120, 1)',
            trophyColor: 'black'
        }
    };

    if (Object.keys(mapStyles).length > 0) return (
        <div 
        onClick={() => setClicked(clicked => !clicked)}
        style={mapStyles[trophyType.replace(/ /g, '')] && {
            background: mapStyles[trophyType.replace(/ /g, '')].backgroundColor,
            color: mapStyles[trophyType.replace(/ /g, '')].color,
            boxShadow: mapStyles[trophyType.replace(/ /g, '')].boxShadow,
            border: mapStyles[trophyType.replace(/ /g, '')].border,
            width: container && '14vw',
            height: container && '27vh'
        }}
        id={!clicked ? 'animate-swivel' : 're-animate-swivel'}
        className='trophies'>

            <Bomb 
            style={{
                display: !clicked && trophyType === 'Master Blaster' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }}>
            </Bomb>

            <Mountains 
            style={{
                display: !clicked && trophyType === 'Obelisk Oracle' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '1.8vh',
                marginBottom: '-2vh',
                width: '8vw'
            }}>
            </Mountains>

            <Diamond 
            style={{
                display: !clicked && trophyType === 'Treasure Tactician' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }}>
            </Diamond>

            <Connectdevelop 
            style={{
                display: !clicked && trophyType === 'Antimatter Maestro' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '3vh',
                marginBottom: '1vh',
                width: '7vw'
            }}>
            </Connectdevelop>
            
            <Tools 
            style={{
                display: !clicked && trophyType === 'Alphabet Architect' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }}>
            </Tools>

            <Sword 
            style={{
                display: !clicked && trophyType === 'Vengeant Vanquisher' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }}>
            </Sword>

            <BrainCircuit 
            style={{
                display: !clicked && trophyType === 'Type I Instance' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }}>
            </BrainCircuit>

            {
                !clicked ?
                <p 
                id='animate-text' 
                style={{
                    textShadow: '0px 3px 2px black',
                    fontWeight: 'bold', 
                    fontSize: '20px', 
                    width: '14vw'
                }}>
                    {trophyType}
                </p> 
                :
                <p style={{fontSize: '20px', marginTop: '8vh', width: '10vw'}}>{mapStyles[trophyType.replace(/ /g, '')].description}</p>
            }
        </div>
    );
};

export default TrophyComponent;