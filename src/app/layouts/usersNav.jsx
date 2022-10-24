import React from "react";
import { useParams } from "react-router-dom";
import Users from "../components/users";
import UserPage from "../components/userPage";

const UsersNav = () => {
    const { userId } = useParams();
    return userId ? <UserPage /> : <Users />;
};

export default UsersNav;
