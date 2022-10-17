import { createContext, useContext, useState } from "react";

export const CreateColumnContext = createContext();

export const useColumnContext = () => useContext(CreateColumnContext);

const ColumnContextProvider = ({ children }) => {
    const [columnVals, setColumnVals] = useState([]);

    return (
        <CreateColumnContext.Provider value={{ columnVals, setColumnVals }}>
            {children}
        </CreateColumnContext.Provider>
    );
};

export default ColumnContextProvider;