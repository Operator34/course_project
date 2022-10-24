import React, { useEffect, useState } from "react";
import api from "../api/index";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { Link } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setUser(user);
            console.log(user);
        });
    }, []);
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>{user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <Link to={"/users"} className="btn btn-primary" role="button">
                    Все пользователи
                </Link>
            </>
        );
    }
    return <h1>Loading</h1>;
};
UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
