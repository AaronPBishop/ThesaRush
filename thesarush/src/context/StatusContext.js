import { useState, createContext, useContext } from 'react';

export const CreateStatusContext = createContext();

export const useStatusContext = () => useContext(CreateStatusContext);

const ProvideStatusContext = ({ children }) => {
    const [isGameOver, setGameOver] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    return (
        <CreateStatusContext.Provider value={{ isGameOver, setGameOver, submitted, setSubmitted }}>
            {children}
        </CreateStatusContext.Provider>
    );
};;

export default ProvideStatusContext;