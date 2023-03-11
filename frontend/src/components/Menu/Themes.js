import { useDispatch, useSelector } from 'react-redux';

import { setBackgroundColor, setBackdropType } from '../../store/menu';

const Themes = () => {
    const dispatch = useDispatch();

    const backDrop = useSelector(state => state.menu.backDrop);

    const mapThemeStyles = {
        classic: ['3px solid rgb(0, 0, 0)', '0px 0px 4px 1.5px rgb(220, 220, 220)'],
        midnight: ['3px solid rgb(5, 5, 20)', '0px 0px 4px 2px rgb(20, 30, 80)'],
        dawn: ['3px solid rgb(35, 0, 10)', '0px 0px 4px 2px rgb(70, 0, 30)'],
        meadow: ['3px solid rgb(0, 15, 25)', '0px 0px 4px 2px rgb(0, 35, 45)']
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: 'auto'}}>
            <div
            style={{
                backgroundColor: 'black',
                display: 'flex', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                marginTop: '-3vh', 
                paddingTop: '5vh',
                border: 'none',
                boxShadow: '0px 0px 6px 2px rgb(120, 120, 255)',
                borderRadius: '12px',
                width: '28vw'
            }}>
                <div 
                onClick={() => {
                    dispatch(setBackgroundColor('rgb(0, 0, 0)'));

                    window.localStorage.setItem("backgroundColor", "rgb(0, 0, 0)");
                }}
                style={{backgroundColor: 'rgb(0, 0, 0)', border: mapThemeStyles['classic'][0], boxShadow: mapThemeStyles['classic'][1]}}
                className='theme-containers'>
                    <li>Classic</li>
                </div>

                <div
                onClick={() => {
                    dispatch(setBackgroundColor('linear-gradient(rgb(10, 10, 30), rgb(5, 5, 20)'));

                    window.localStorage.setItem("backgroundColor", "linear-gradient(rgb(10, 10, 30), rgb(5, 5, 20)");
                }}
                style={{background: 'linear-gradient(rgb(10, 10, 30), rgb(5, 5, 20)', border: mapThemeStyles['midnight'][0], boxShadow: mapThemeStyles['midnight'][1]}}
                className='theme-containers'
                >
                    <li>Midnight</li>
                </div>

                <div
                onClick={() => {
                    dispatch(setBackgroundColor('linear-gradient(rgb(45, 0, 25), rgb(30, 0, 10)'));

                    window.localStorage.setItem("backgroundColor", "linear-gradient(rgb(45, 0, 25), rgb(30, 0, 10)");
                }}
                style={{background: 'linear-gradient(rgb(45, 0, 25), rgb(30, 0, 10)', border: mapThemeStyles['dawn'][0], boxShadow: mapThemeStyles['dawn'][1]}}
                className='theme-containers'
                >
                    <li>Dawn</li>
                </div>

                <div
                onClick={() => {
                    dispatch(setBackgroundColor('linear-gradient(rgb(0, 20, 30), rgb(0, 15, 25)'));

                    window.localStorage.setItem("backgroundColor", "linear-gradient(rgb(0, 20, 30), rgb(0, 15, 25)");
                }}
                style={{background: 'linear-gradient(rgb(0, 20, 30), rgb(0, 15, 25)', border: mapThemeStyles['meadow'][0], boxShadow: mapThemeStyles['meadow'][1]}}
                className='theme-containers'
                >
                    <li>Meadow</li>
                </div>
            </div>

            <div
            onClick={() => {
                if (!window.localStorage.getItem("backDrop") || window.localStorage.getItem("backDrop") === 'dynamic') {
                    dispatch(setBackdropType('static'));
                    window.localStorage.setItem("backDrop", "static");

                    return;
                };

                if (window.localStorage.getItem("backDrop") === 'static') {
                    dispatch(setBackdropType('dynamic'));
                    window.localStorage.setItem("backDrop", "dynamic");

                    return;
                };
            }}
            style={{
                fontFamily: 'Bungee Spice',
                textShadow: '0px 2px 1px black',
                fontSize: '20px',
                lineHeight: '7.4vh',
                height: '7vh',
                width: '18vw',
                marginTop: '3.5vh',
                borderRadius: '12px',
                backgroundColor: 'rgb(140, 0, 55)', 
                border: 'none',
                borderBottom: '3.5px solid rgb(105, 0, 40)', 
                cursor: 'pointer'
            }}>
                {
                    backDrop === 'dynamic' ? 'Dynamic Backdrop' : 'Static Backdrop'
                }
            </div>
        </div>
    );
};

export default Themes;