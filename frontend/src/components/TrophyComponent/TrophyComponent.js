import { useState } from 'react';

import { Tools } from '@styled-icons/entypo/Tools';
import { BrainCircuit } from '@styled-icons/fluentui-system-filled/BrainCircuit';
import { Sword } from '@styled-icons/remix-fill/Sword';
import { Atom } from '@styled-icons/boxicons-regular/Atom';
import { Ethereum } from '@styled-icons/simple-icons/Ethereum';
import { Diamond } from '@styled-icons/ionicons-solid/Diamond';
import { Connectdevelop } from '@styled-icons/fa-brands/Connectdevelop';
import { Pytorchlightning } from '@styled-icons/simple-icons/Pytorchlightning';
import { Storm } from '@styled-icons/crypto/Storm';

import './styles.css';

const TrophyComponent = ({ trophyType, container }) => {
    const [clicked, setClicked] = useState(false);

    const mapStyles = {
        MasterBlaster: {
            header: 'Earned 50 Bombardier Badges',
            backgroundColor: 'rgb(255,69,0)',
            color: 'yellow',
            boxShadow: '0px 0px 15px 5px rgb(255, 49, 49)',
            border: '4px solid rgb(160, 55, 0)',
            trophyColor: 'yellow',
            description: 'A glowing mantle brimming with atomic energy, primed to diverge in a cataclysmic explosion if the seal is ever broken. Those brave enough to adorn it have achieved mastery of explosive technologies.',
            descriptionBackground: 'rgb(160, 55, 0)',
            pointTotal: 4000
        },
        ObeliskOracle: {
            header: 'Earned 50 Stone Crusher Badges',
            backgroundColor: 'rgb(10, 115, 60)',
            color: 'white',
            boxShadow: '0px 0px 14px 8px #383630',
            border: '4px solid rgb(0, 70, 40)',
            trophyColor: 'black',
            description: 'An immensely heavy insignia crafted from an array of desecrated stone fragments for the stoic mountain sovereignties as a sign of their unrivaled strength.',
            descriptionBackground: 'rgb(0, 70, 40)',
            pointTotal: 3000
        },
        TreasureTactician: {
            header: 'Earned 50 Gold Miner Badges',
            backgroundColor: 'rgb(210, 200, 30)',
            color: 'white',
            boxShadow: '0px 0px 12px 4px #FFD700',
            border: '4px solid yellow',
            trophyColor: 'black',
            description: 'This flawlessly shimmering mark of wealth is typically flaunted by a royal lineage of treasure hoarders. Those who attain it are rarely content with their fortunes...',
            descriptionBackground: 'rgb(150, 140, 20)',
            pointTotal: 3000
        },
        AlphabetArchitect: {
            header: 'Earned 50 Word Smith Badges',
            backgroundColor: 'rgb(40, 0, 80)',
            color: 'white',
            boxShadow: '0px 0px 12px 4px rgb(100, 0, 190)',
            border: '4px solid rgb(20, 0, 60)',
            trophyColor: 'white',
            description: 'Adorned by those who have proven their linguistic excellence with unusual feats of alphabetical engineering, whose words are immortalized in starlight.',
            descriptionBackground: 'rgb(20, 0, 60)',
            pointTotal: 8000
        },
        AntimatterMaestro: {
            header: 'Earned 50 Void Master Badges',
            backgroundColor: 'black',
            color: 'white',
            boxShadow: '0px 0px 12px 4px white',
            border: '4px solid white',
            trophyColor: 'white',
            description: 'A masterfully crafted ensign forged by the reputed guardians of the Endless Void. Those powerful enough to brandish it are rumored to have mastered a fraction of the Void\'s arcane power.',
            descriptionBackground: 'rgb(30, 30, 30)',
            pointTotal: 4000
        },
        VengeantVanquisher: {
            header: 'Defeated 50 Challengers',
            backgroundColor: 'rgb(128, 0, 32)',
            color: 'white',
            boxShadow: '0px 0px 12px 4px red',
            border: '4px solid rgb(105, 0, 0)',
            trophyColor: 'black',
            description: 'A distinguishing seal of recognition fashioned by the unfathomable champions of the great Alphabet Wars.',
            descriptionBackground: 'rgb(105, 0, 0)',
            pointTotal: 12000
        },
        CosmicIntellect: {
            header: 'Attained Cosmic League Status',
            backgroundColor: 'rgba(185, 10, 180, 1)',
            color: 'white',
            boxShadow: '0px 0px 12px 4px purple',
            border: '4px solid rgba(125, 0, 120, 1)',
            trophyColor: 'black',
            description: 'Those who attain this emblem are said to be imbued with an ancient intelligence known only to the cosmos itself.',
            descriptionBackground: 'rgb(125, 0, 120)',
            pointTotal: 15000
        },
        SkyboltSummoner: {
            header: 'Earned 50 Fulminator Badges',
            backgroundColor: 'rgba(30, 50, 255, 1)',
            color: 'white',
            boxShadow: '0px 0px 12px 4px rgb(0, 40, 255)',
            border: '4px solid rgb(0, 140, 255)',
            trophyColor: 'rgb(0, 255, 195)',
            description: 'This scarce medallion is obtainable only by those with an acute mastery of elemental storm magic. The few who adorn it are known to decimate the alphabet-arena with flashes of archaic energy and all the fury of the megacosm.',
            descriptionBackground: 'rgb(0, 140, 255)',
            pointTotal: 10000
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
            height: container && '27vh',
        }}
        id={!clicked ? 'animate-swivel' : 're-animate-swivel'}
        className='trophies'>

            <Atom 
            style={{
                display: !clicked && trophyType === 'Master Blaster' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }}>
            </Atom>

            <Ethereum 
            style={{
                display: !clicked && trophyType === 'Obelisk Oracle' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '1vh',
                marginBottom: '-1vh',
                width: '8vw'
            }}>
            </Ethereum>

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
                display: !clicked && trophyType === 'Cosmic Intellect' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }}>
            </BrainCircuit>

            <Pytorchlightning 
            style={{
                display: !clicked && trophyType === 'Skybolt Summoner' ? 'block' : 'none',
                color: mapStyles[trophyType.replace(/ /g, '')].trophyColor,
                marginTop: '2.5vh',
                width: '7vw'
            }}>
            </Pytorchlightning>

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
                <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', flexWrap: 'wrap', overflowY: 'hidden', overflowX: 'hidden'}}>
                    <p style={{textShadow: trophyType === 'Treasure Tactician' ? '0px 2px 1px black' : 'none', fontSize: '20px', fontWeight: 'bold', marginTop: '1.5vh', width: '12vw'}}>
                        {mapStyles[trophyType.replace(/ /g, '')].header}
                    </p>

                    <b style={{textShadow: trophyType === 'Treasure Tactician' ? '0px 2px 2px black' : 'none', marginTop: '-1.5vh'}}>
                        +{mapStyles[trophyType.replace(/ /g, '')].pointTotal} points
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
                        backgroundColor: mapStyles[trophyType.replace(/ /g, '')].descriptionBackground
                    }}>
                        {mapStyles[trophyType.replace(/ /g, '')].description}
                    </p>
                </div>
            }
        </div>
    );
};

export default TrophyComponent;