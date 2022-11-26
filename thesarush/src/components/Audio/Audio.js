import audio from "../../Station-X.webm";

const Audio = () => {
    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            border: '2px solid rgb(255, 255, 60)',
            borderRadius: '30vw',
            boxShadow: '0px 5px 15px rgb(0 110 0)',
            backgroundColor: 'black',
            width: '6vw',
            height: '4vh'
        }}>
            <button 
            style={{
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'black',
                color: 'white'
            }}
            onClick={() => {
                document.getElementById('music-player').play()
            }}>
                <i className="fa-sharp fa-solid fa-volume-high"></i>
            </button>

            <button 
            style={{
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'black',
                color: 'white'
            }}
            onClick={() => {
                document.getElementById('music-player').pause()
            }}>
                <i className="fa-sharp fa-solid fa-volume-xmark"></i>
            </button>

            <audio id='music-player' autoPlay loop> 
                <source src={audio} type="audio/mpeg" /> 
            </audio>
        </div>
    );
};

export default Audio;