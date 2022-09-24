import React, { useState } from "react";
import User from "./user"
import api from "../api/index"
import SearchStatus from "./searchStatus";

const Users = () => {
    
    const [users, setUsers] = useState(api.users.fetchAll());
    console.log(users);
    const userCount = users.length

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleBookmark = (userId) => {
        setUsers(users.map((user) => {
            return user._id === userId ? {...user, bookmark:!user.bookmark} : user
        }))
    } 

    return (
        <>
        <SearchStatus
            userCount = {userCount}
         />
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <User 
                            key={user._id}
                            user={user}
                            onDelete = {handleDelete}
                            onHandleBookmark = {handleBookmark}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Users;
