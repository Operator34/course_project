/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import api from "../../../api";
import PartyStatus from "../../ui/partyStatus";
import UsersTable from "../../ui/usersTable";
import Pagination from "../../common/pagination";
import paginate from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchString from "../../ui/searchString";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [searchString, setSearchString] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    const { users } = useUser();

    // useEffect(() => {
    //     api.users.fetchAll().then((data) => setUsers(data));
    // }, []);

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };

    const handleBookmark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray)
        console.log(newArray);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchString]);

    const handleProfessionSelect = (item) => {
        if (searchString !== "") setSearchString("");
        setSelectedProf(item);
    };

    const handleSearchSubmit = ({ target }) => {
        setSelectedProf(undefined);
        setSearchString(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (user) => {
        setSortBy(user);
    };

    if (users) {
        const filteredUsers = searchString
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(searchString.toLowerCase())
              )
            : selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

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
                    <SearchString
                        value={searchString}
                        handleSearchSubmit={handleSearchSubmit}
                    />
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

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
