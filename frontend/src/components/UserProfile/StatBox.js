import { useState } from "react";

const StatBox = ({ statName, statTotal }) => {
    const [clicked, setClicked] = useState(true);

    return (
         <div 
            onClick={() => setClicked(clicked => !clicked)}
            id={clicked ? 'stat-swivel' : 'stat-re-swivel'}
            className='user-stat-boxes'>
                <p style={{marginTop: clicked && '-0.5vh'}}>{statName}</p>
                {
                    clicked &&
                    <p style={{
                        marginTop: '-1vh', 
                        color: 'rgb(95, 255, 0)', 
                        fontWeight: 'bold', 
                        textShadow: '0px 1px 2px black',
                        letterSpacing: '1px'
                    }}>
                        {statTotal}
                    </p>
                }
            </div>
    )
};

export default StatBox;