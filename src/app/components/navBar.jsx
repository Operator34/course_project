import React from "react";
import { Link, Route } from "react-router-dom";
import Main from "../layouts/main";
import Login from "../layouts/login";
import UsersNav from "../layouts/usersNav";

const NavBar = () => {
    return (
        <div>
            <button>
                <Link to="/"> Main </Link>
            </button>
            <button>
                <Link to="/login"> Login </Link>
            </button>
            <button>
                <Link to="/users"> Users </Link>
            </button>
            <Route path={"/"} component={Main} />
            <Route path={"/login"} component={Login} />
            <Route path={"/users"} component={UsersNav} />
        </div>
    );
};

export default NavBar;
