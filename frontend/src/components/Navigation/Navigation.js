import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SignUp from "./SignUp.js";
import LogIn from "./LogIn.js";
import User from "./User.js";

const Navigation = () => {
    const user = useSelector(state => state.user);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (user.userName) setLoggedIn(true);
    }, [user]);

    if (!loggedIn) return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <SignUp />
            <LogIn />
        </div>
    );

    return (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <User userName={user.userName} />
        </div>
    );
};

export default Navigation;