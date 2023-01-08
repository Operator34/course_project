import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
    return (
        <>
            <NavBar />

            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route
                            path={"/users/:userId?/:edit?"}
                            component={Users}
                        />
                        <Route path={"/login/:type?"} component={Login} />
                        <Route exact path={"/"} component={Main} />
                        <Redirect to={"/"} />
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>

            <ToastContainer />
        </>
    );
};

export default App;
