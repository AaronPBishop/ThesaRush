import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Bomb } from '@styled-icons/fa-solid/Bomb';
import { BoltLightning } from '@styled-icons/fa-solid/BoltLightning';
import { Connectdevelop } from '@styled-icons/fa-brands/Connectdevelop';

const RewardChart = ({ orderedInputLen }) => {
    const menu = useSelector(state => state.menu);
    const stats = useSelector(state => state.game.stats);

    const [isDragging, setIsDragging] = useState(false);
    const [origin, setOrigin] = useState({ x: 0, y: 0 });
    const [translation, setTranslation] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newTranslation = {
                    x: e.clientX - origin.x,
                    y: e.clientY - origin.y,
                };

                setTranslation(newTranslation);
            };
        };

        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, origin]);
    
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setOrigin({ x: e.clientX - translation.x, y: e.clientY - translation.y });
    };

    return (
        <div
        id="draggable-element"
        ref={draggableRef}
        onMouseDown={handleMouseDown}
        style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
            flexWrap: 'wrap',
            paddingBottom: '1vh',
            position: 'fixed',
            width: '18vw',
            height: '30vh',
            background: menu.backgroundColor,
            border: 'none',
            borderRadius: '12px',
            contain: 'strict',
            boxShadow: '0px 0px 12px 2px rgb(90, 90, 210)',
            zIndex: '100',
            opacity: '0.985',
            cursor: isDragging ? "grabbing" : "grab",
            transform: `translate(${translation.x}px, ${translation.y}px)`,
        }}>
            <div 
            style={{
                display: 'flex', 
                justifyContent: 'flex-start', 
                paddingLeft: '0.5vw',
                paddingRight: '0.5vw',
                width: '90%', 
                height: '10vh', 
                contain: 'strict'
            }}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Bomb
                    style={{
                        minWidth: '2.5vw',
                        maxWidth: '2.5vw',
                        color: 'rgb(255,69,0)',
                        marginRight: '0.8vw'
                    }}>
                    </Bomb>
                </div>

                <div 
                style={{
                    width: '90%', 
                    height: '25%', 
                    boxShadow: 
                    orderedInputLen < 6 || orderedInputLen >= 8 ? '0px 0px 6px 2px rgb(200, 20, 20)' 
                    : (orderedInputLen >= 6 && orderedInputLen < 8) && '0px 0px 10px 4px rgb(255, 49, 49)', 
                    borderRadius: '10px', 
                    marginTop: '4.4vh', 
                    contain: 'strict'
                }}>
                    <div 
                    style={{
                        backgroundColor: 'rgb(255,69,0)', 
                        maxWidth: `${(orderedInputLen / 6) * 100}%`, 
                        height: '100%', 
                        borderRadius: '10px'
                    }}>
                    </div>
                </div>
            </div>

            <div 
            style={{
                display: 'flex', 
                justifyContent: 'flex-start', 
                paddingLeft: '0.5vw',
                paddingRight: '0.5vw',
                width: '90%', 
                height: '10vh', 
                contain: 'strict'
            }}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <BoltLightning
                    style={{
                        minWidth: '2vw',
                        maxWidth: '2vw',
                        color: 'rgb(255, 255, 0)',
                        marginRight: '1.25vw'
                    }}>
                    </BoltLightning>
                </div>

                <div 
                style={{
                    width: '90%', 
                    height: '25%', 
                    boxShadow: 
                    orderedInputLen < 8 ? '0px 0px 6px 2px rgb(200, 200, 0)' 
                    : orderedInputLen >= 8 && '0px 0px 10px 4px rgb(255, 255, 0)', 
                    borderRadius: '10px', 
                    marginTop: '4vh', 
                    contain: 'strict'
                }}>
                    <div 
                    style={{
                        fontFamily: 'Bungee Spice',
                        textAlign: 'center',
                        textShadow: '0px 1px 1px black',
                        fontSize: '14px',
                        backgroundColor: 'rgb(255, 255, 0)', 
                        maxWidth: `${(orderedInputLen / 8) * 100}%`, 
                        height: '100%', 
                        borderRadius: '10px'
                    }}>
                            {
                                orderedInputLen >= 8 && orderedInputLen < 10 ? '35% Charged' 
                                : orderedInputLen >= 10 && orderedInputLen < 12 ? '70% Charged' 
                                : orderedInputLen >= 12 && 'Fully Charged'
                            }
                    </div>
                </div>
            </div>

            <div 
            style={{
                display: 'flex', 
                justifyContent: 'flex-start', 
                paddingLeft: '0.2vw',
                paddingRight: '0.5vw',
                width: '90%', 
                height: '10vh', 
                contain: 'strict'
            }}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Connectdevelop
                    style={{
                        minWidth: '2.6vw',
                        maxWidth: '2.6vw',
                        color: 'white',
                        marginRight: '0.8vw'
                    }}>
                    </Connectdevelop>
                </div>

                <div 
                style={{
                    width: '90%', 
                    height: '25%', 
                    boxShadow: 
                    stats.trackScore < 60 ? '0px 0px 6px 2px rgb(200, 200, 200)' 
                    : stats.trackScore >= 60 && '0px 0px 10px 4px rgb(255, 255, 255)', 
                    borderRadius: '10px', 
                    marginTop: '4vh', 
                    contain: 'strict'
                }}>
                    <div 
                    style={{
                        backgroundColor: 'white', 
                        maxWidth: `${(stats.trackScore / 60) * 100}%`, 
                        height: '100%', 
                        borderRadius: '10px'
                    }}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardChart;