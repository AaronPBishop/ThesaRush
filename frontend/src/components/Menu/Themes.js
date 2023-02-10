import { useDispatch } from 'react-redux';

import { setBackgroundColor } from '../../store/menu';

const Themes = () => {
    const dispatch = useDispatch();

    const mapThemeStyles = {
        classic: ['3px solid rgb(0, 0, 0)', '0px 0px 4px 1.5px rgb(220, 220, 220)'],
        midnight: ['3px solid rgb(5, 5, 20)', '0px 0px 4px 2px rgb(20, 30, 80)'],
        dawn: ['3px solid rgb(35, 0, 10)', '0px 0px 4px 2px rgb(70, 0, 30)'],
        meadow: ['3px solid rgb(0, 15, 25)', '0px 0px 4px 2px rgb(0, 35, 45)']
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: 'auto'}}>
            <div
            style={{
                backgroundColor: 'black',
                display: 'flex', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                marginTop: '-1vh', 
                margin: 'auto',
                paddingTop: '5vh',
                border: '2px solid rgb(120, 120, 255)',
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
        </div>
    );
};

export default Themes;