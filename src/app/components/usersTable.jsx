import React from "react";
import User from "./user";
import PropTypes from "prop-types";
const UsersTable = ({ items, handleBookmark, handleDelete }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Качества</th>
                    <th>Профессия</th>
                    <th>Встретился, раз</th>
                    <th>Оценка</th>
                    <th>Избранное</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {items.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        onDelete={handleDelete}
                        onHandleBookmark={handleBookmark}
                    />
                ))}
            </tbody>
        </table>
    );
};
UsersTable.propTypes = {
    items: PropTypes.array.isRequired,
    handleBookmark: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};
export default UsersTable;
