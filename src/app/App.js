import React from "react";
import Users from "./components/users";
import NavBar from "./components/navBar";

const App = () => {
    return (
        <React.StrictMode>
            <NavBar />
            <Users />
        </React.StrictMode>
    );
};

export default App;
