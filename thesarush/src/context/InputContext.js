import { createContext, useContext, useState } from "react";

export const CreateInputContext = createContext();

export const useInputContext = () => useContext(CreateInputContext);

const InputContextProvider = ({ children }) => {
    const [inputVal, setInputVal] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    return (
        <CreateInputContext.Provider value={{ inputVal, setInputVal, submitted, setSubmitted }}>
            {children}
        </CreateInputContext.Provider>
    );
};

export default InputContextProvider;