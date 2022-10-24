import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

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
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const pageSize = 8;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (user) => {
        setSelectedProf(user);
        console.log("user:", user);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (user) => {
        setSortBy(user);
    };

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleBookmark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    if (users.length) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        console.log("sortedUsers:", sortedUsers);
        const userCount = filteredUsers.length;
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                            user={userCrop}
                            onSort={handleSort}
                            onDelete={handleDelete}
                            handleBookmark={handleBookmark}
                            selectedSort={sortBy}
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
    }
    return "LOADING...";
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
