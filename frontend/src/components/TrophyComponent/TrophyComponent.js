import { useState } from 'react';

import { Tools } from '@styled-icons/entypo/Tools';
import { BrainCircuit } from '@styled-icons/fluentui-system-filled/BrainCircuit';
import { Sword } from '@styled-icons/remix-fill/Sword';
import { Atom } from '@styled-icons/boxicons-regular/Atom';
import { Ethereum } from '@styled-icons/simple-icons/Ethereum';
import { Diamond } from '@styled-icons/ionicons-solid/Diamond';
import { Connectdevelop } from '@styled-icons/fa-brands/Connectdevelop';
import { BoltLightning } from '@styled-icons/fa-solid/BoltLightning';
import { Radioactive } from '@styled-icons/bootstrap/Radioactive';
import { Trophy } from '@styled-icons/fa-solid/Trophy';

import mapTrophies from './mapTrophies.js';

import './styles.css';

const TrophyComponent = ({ trophyType, container }) => {
    const [clicked, setClicked] = useState(false);

    if (Object.keys(mapTrophies).length > 0) return (
        <div 
        onClick={() => setClicked(clicked => !clicked)}
        style={mapTrophies[trophyType.replace(/ /g, '')] && {
            background: mapTrophies[trophyType.replace(/ /g, '')].backgroundColor,
            color: mapTrophies[trophyType.replace(/ /g, '')].color,
            boxShadow: mapTrophies[trophyType.replace(/ /g, '')].boxShadow,
            border: mapTrophies[trophyType.replace(/ /g, '')].border,
            width: container && '14vw',
            height: container && '27vh',
        }}
        id={!clicked ? 'animate-swivel' : 're-animate-swivel'}
        className='trophies'>

            <Atom 
            style={{
                display: !clicked && trophyType === 'Master Blaster' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }} />

            <Ethereum 
            style={{
                display: !clicked && trophyType === 'Obelisk Oracle' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '1vh',
                marginBottom: '-1vh',
                width: '8vw'
            }} />

            <Diamond 
            style={{
                display: !clicked && trophyType === 'Treasure Tactician' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }} />

            <Connectdevelop 
            style={{
                display: !clicked && trophyType === 'Antimatter Maestro' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '3vh',
                marginBottom: '1vh',
                width: '7vw'
            }} />
            
            <Tools 
            style={{
                display: !clicked && trophyType === 'Alphabet Architect' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }} />

            <Sword 
            style={{
                display: !clicked && trophyType === 'Vengeant Vanquisher' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }} />

            <BrainCircuit 
            style={{
                display: !clicked && trophyType === 'Cosmic Intellect' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }} />

            <BoltLightning 
            style={{
                display: !clicked && trophyType === 'Skybolt Summoner' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '4vh',
                width: '4.5vw'
            }} />

            <Radioactive 
            style={{
                display: !clicked && trophyType === 'Ruination Ruler' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '4vh',
                width: '6.2vw'
            }} />

            <Trophy 
            style={{
                display: !clicked && trophyType === 'Apex Achiever' ? 'block' : 'none',
                color: mapTrophies[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '5vh',
                width: '6.5vw'
            }} />

            {
                !clicked ?
                <p 
                id='animate-text' 
                style={{
                    textShadow: trophyType === 'Ruination Ruler' ? '0px 3px 2px rgb(200, 200, 0)' : '0px 3px 2px black',
                    fontWeight: 'bold', 
                    fontSize: '20px', 
                    width: '14vw'
                }}>
                    {trophyType}
                </p> 
                :
                <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', flexWrap: 'wrap', overflowY: 'hidden', overflowX: 'hidden'}}>
                    <p style={{textShadow: trophyType === 'Treasure Tactician' ? '0px 2px 1px black' : trophyType === 'Ruination Ruler' ? '0px 3px 2px rgb(200, 200, 0)' : 'none', fontSize: '20px', fontWeight: 'bold', marginTop: '1.5vh', width: '12vw'}}>
                        {mapTrophies[trophyType.replace(/ /g, '')].header}
                    </p>

                    <b style={{color: trophyType === 'Ruination Ruler' && 'rgb(200, 0, 0)', textShadow: trophyType === 'Treasure Tactician' ? '0px 2px 2px black' : 'none', marginTop: '-1.5vh'}}>
                        +{mapTrophies[trophyType.replace(/ /g, '')].pointTotal} points
                    </b>

                    <p 
                    id='trophy-desc'
                    style={{
                        fontSize: '15px', 
                        fontStyle: 'italic',
                        textShadow: 'none',
                        padding: '0.4vw',
                        marginTop: '1.2vh',
                        scrollBehavior: 'smooth',
                        color: 'white',
                        width: '12vw',
                        maxHeight: '11vh',
                        overflowY: 'auto',
                        borderRadius: '10px',
                        backgroundColor: mapTrophies[trophyType.replace(/ /g, '')].descriptionBackground
                    }}>
                        {mapTrophies[trophyType.replace(/ /g, '')].description}
                    </p>
                </div>
            }
        </div>
    );
};

export default TrophyComponent;