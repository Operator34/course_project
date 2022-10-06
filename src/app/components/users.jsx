import React, { useState, useEffect } from "react";

import api from "../api/index";
import PartyStatus from "./partyStatus";
import User from "./user";
import HeadTable from "./headTable";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import GroupList from "./groupList";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 2;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        console.log(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf ? users.filter((user) => user.profession === selectedProf) : users;
    const userCount = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleBookmark = (userId) => {
        setUsers(
            users.map((user) => {
                return user._id === userId
                    ? { ...user, bookmark: !user.bookmark }
                    : user;
            })
        );
    };
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem = {selectedProf}
                        items = {professions}
                        onItemSelect = {handleProfessionSelect}
                    />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <PartyStatus userCount={userCount} />
                {userCount > 0 && (
                    <table className="table">
                        <HeadTable />
                        <tbody>
                            {userCrop.map((user) => (
                                <User
                                    key={user._id}
                                    user={user}
                                    onDelete={handleDelete}
                                    onHandleBookmark={handleBookmark}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={userCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Users;
