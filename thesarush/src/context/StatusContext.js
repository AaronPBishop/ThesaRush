import { useState, createContext, useContext } from 'react';

export const CreateStatusContext = createContext();

export const useStatusContext = () => useContext(CreateStatusContext);

const ProvideStatusContext = ({ children }) => {
    const [cleared, setCleared] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [tileDropped, setTileDropped] = useState(false);

    return (
        <CreateStatusContext.Provider value={{ 
            cleared, setCleared,
            submitted, setSubmitted, 
            tileDropped, setTileDropped 
        }}>
            {children}
        </CreateStatusContext.Provider>
    );
};;

export default ProvideStatusContext;