import React from "react";
import PropTypes from "prop-types";

import Quality from "./quality";
import BookMark from "./bookmark";

const User = ({ user, onDelete, onHandleBookmark }) => {
    return (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} /5</td>
            <td>
                <BookMark
                    key={user._id}
                    id={user._id}
                    bookmark={user.bookmark}
                    onHandleBookmark={onHandleBookmark}
                />
            </td>
            <td>
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onHandleBookmark: PropTypes.func.isRequired
};

export default User;
