import { useState, createContext, useContext } from 'react';

export const CreateStatusContext = createContext();

export const useStatusContext = () => useContext(CreateStatusContext);

const ProvideStatusContext = ({ children }) => {
    const [isGameOver, setGameOver] = useState(false);

    return (
        <CreateStatusContext.Provider value={{ isGameOver, setGameOver }}>
            {children}
        </CreateStatusContext.Provider>
    );
};;

export default ProvideStatusContext;