import React, { useState } from "react";
import api from "../api/index"
import SearchStatus from "./searchStatus";
import HeadTable from "./headTable";

import User from "./user"

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
            {userCount > 0 && (
                <table className="table">
                <HeadTable />
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
