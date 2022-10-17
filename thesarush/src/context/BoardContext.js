import { createContext, useContext, useState } from "react";

export const CreateBoardContext = createContext();

export const useBoardContext = () => useContext(CreateBoardContext);

const BoardContextProvider = ({ children }) => {
    const [boardVals, setBoardVals] = useState([]);

    return (
        <CreateBoardContext.Provider value={{ boardVals, setBoardVals }}>
            {children}
        </CreateBoardContext.Provider>
    );
};

export default BoardContextProvider;