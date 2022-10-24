import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({
    user,
    onSort,
    selectedSort,
    handleBookmark,
    onDelete
}) => {
    // console.log("user:", user);
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    id={user._id}
                    onHandleBookmark={handleBookmark}
                    bookmark={user.bookmark}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={user}
        />
    );
};
UsersTable.propTypes = {
    user: PropTypes.array.isRequired,
    handleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
};
export default UsersTable;
