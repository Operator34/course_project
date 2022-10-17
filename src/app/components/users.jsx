import React, { useState, useEffect } from "react";
import _ from "lodash";

import api from "../api/index";
import PartyStatus from "./partyStatus";
import UsersTable from "./usersTable";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import GroupList from "./groupList";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    console.log(sortBy, { ...sortBy });

    const pageSize = 8;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.users.fetchAll().then((data) => setUsers(data));
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
    const handleSort = (item) => {
        setSortBy(item);
        console.log(sortBy, item);
    };
    // console.log(selectedProf, users);
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    console.log(sortedUsers);
    const userCount = filteredUsers.length;
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <PartyStatus userCount={userCount} />
                {userCount > 0 && (
                    <UsersTable
                        items={userCrop}
                        onSort={handleSort}
                        handleDelete={handleDelete}
                        handleBookmark={handleBookmark}
                        selectedSort={sortBy}
                        users={users}
                    />
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
