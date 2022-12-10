import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SignUp from "./SignUp.js";
import LogIn from "./LogIn.js";
import LogOut from "./LogOut.js";
import User from "./User.js";

const Navigation = () => {
    const user = useSelector(state => state.user);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (user.user_id) setLoggedIn(true);
        if (!user.user_id) setLoggedIn(false);
    }, [user]);

    if (!loggedIn) return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <SignUp loggedIn={loggedIn} />
            <LogIn loggedIn={loggedIn} />
        </div>
    );

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <LogOut />
            <User userName={user.user_name} />
        </div>
    );
};

export default Navigation;