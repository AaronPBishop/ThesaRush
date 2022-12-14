import { useDispatch } from 'react-redux';

import { setBackgroundColor } from '../../store/menu';

const Themes = () => {
    const dispatch = useDispatch();

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginLeft: '2.5vw'}}>
            <div 
            onClick={() => {
                dispatch(setBackgroundColor('rgb(0, 0, 0)'));
            }}
            style={{backgroundColor: 'rgb(0, 0, 0)'}}
            className='theme-containers'>
                <li>Classic</li>
            </div>

            <div
            onClick={() => {
                dispatch(setBackgroundColor('linear-gradient(rgb(10, 10, 30), rgb(5, 5, 20)'));
            }}
            style={{background: 'linear-gradient(rgb(10, 10, 30), rgb(5, 5, 20)'}}
            className='theme-containers'
            >
                <li>Midnight</li>
            </div>

            <div
            onClick={() => {
                dispatch(setBackgroundColor('linear-gradient(rgb(45, 0, 25), rgb(30, 0, 10)'));
            }}
            style={{background: 'linear-gradient(rgb(45, 0, 25), rgb(30, 0, 10)'}}
            className='theme-containers'
            >
                <li>Dawn</li>
            </div>

            <div
            onClick={() => {
                dispatch(setBackgroundColor('linear-gradient(rgb(0, 25, 25), rgb(0, 15, 15)'));
            }}
            style={{background: 'linear-gradient(rgb(0, 25, 25), rgb(0, 15, 15)'}}
            className='theme-containers'
            >
                <li>Meadow</li>
            </div>
        </div>
    )
};

export default Themes;