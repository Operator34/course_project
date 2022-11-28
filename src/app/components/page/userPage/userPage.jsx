import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import CompletedMeetingsCard from "../../ui/completedMeetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setUser(user);
        });
    }, []);
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard user={user} />
                        <CompletedMeetingsCard user={user} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <Comments userId={userId} />
                    </div>
                </div>
            </div>
        );
    }
    return <h1>Loading</h1>;
};
UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
