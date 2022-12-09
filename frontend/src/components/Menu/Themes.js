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
                dispatch(setBackgroundColor('rgb(10, 10, 30)'));
            }}
            style={{backgroundColor: 'rgb(10, 10, 30)'}}
            className='theme-containers'
            >
                <li>Midnight</li>
            </div>

            <div
            onClick={() => {
                dispatch(setBackgroundColor('rgb(45, 0, 25)'));
            }}
            style={{backgroundColor: 'rgb(45, 0, 25)'}}
            className='theme-containers'
            >
                <li>Dawn</li>
            </div>

            <div
            onClick={() => {
                dispatch(setBackgroundColor('rgb(0, 30, 25)'));
            }}
            style={{backgroundColor: 'rgb(0, 30, 25)'}}
            className='theme-containers'
            >
                <li>Meadow</li>
            </div>
        </div>
    )
};

export default Themes;