import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersNav from "./layouts/usersNav";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path={"/login"} component={Login} />
                <Route path={"/users/:userId?"} component={UsersNav} />
                <Route exact path={"/"} component={Main} />
                <Redirect to={"/"} />
            </Switch>
        </>
    );
};

export default App;
