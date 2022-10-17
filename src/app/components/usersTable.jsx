import React from "react";
// import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";

const UsersTable = ({
    items,
    onSort,
    selectedSort,
    handleBookmark,
    handleDelete,
    users,
    ...rest
}) => {
    console.log("items:", items, "users", users);
    const columns = {
        name: { path: "name", name: "Имя" },
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
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
            {/* <tbody>
                {items.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        onDelete={handleDelete}
                        onHandleBookmark={handleBookmark}
                        id={user._id}
                        name={user.name}
                    />
                ))}
            </tbody> */}
        </table>
    );
};
UsersTable.propTypes = {
    items: PropTypes.array.isRequired,
    handleBookmark: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};
export default UsersTable;
