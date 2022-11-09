import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserForm from "../components/ui/editUserForm";

const Users = () => {
    const { userId, edit } = useParams();
    return userId ? (
        edit ? (
            <EditUserForm userId={userId} />
        ) : (
            <UserPage userId={userId} />
        )
    ) : (
        <UsersListPage />
    );
};

export default Users;
