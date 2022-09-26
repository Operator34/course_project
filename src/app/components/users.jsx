import React, { useState } from "react";
import api from "../api/index"
import SearchStatus from "./searchStatus";

import User from "./user"
import HeadTable from "./headTable";
import Pagination from "./pagination";
import paginate from "../utils/paginate";

const Users = () => {
    
    const [users, setUsers] = useState(api.users.fetchAll());
    const userCount = users.length
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const userCrop = paginate(users,currentPage,pageSize)


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
                        {userCrop.map((user) => (
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
            <Pagination 
            itemsCount={userCount}
            pageSize={pageSize}
            currentPage = {currentPage}
            onPageChange={handlePageChange}
            />
        </>
    );
};

export default Users;
