import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path={"/users/:userId?/:edit?"} component={Users} />
                <Route path={"/login/:type?"} component={Login} />
                <Route exact path={"/"} component={Main} />
                <Redirect to={"/"} />
            </Switch>
            <ToastContainer />
        </>
    );
};

export default App;
