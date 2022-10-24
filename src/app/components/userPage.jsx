import React from "react";
import api from "../api/index";
import { useParams } from "react-router-dom";

const UserPage = () => {
    const params = useParams();
    console.log(api);
    console.log("params", params.userId);
    api.users.getById(params.userId).then((user) => console.log(user));
    // const [users, setUsers] = useState([]);
    // console.log(users);
    return (
        <>
            <h1>Имя</h1>
            <h2>Профессия</h2>
            <h3>Качества</h3>
            <p>completedMeetings:</p>
            <h2>Rate</h2>
            <button>Все пользователи</button>
        </>
    );
};

export default UserPage;
