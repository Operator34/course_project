import React, { useState } from "react";
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    
    const numberOfPeople =() => {
        return users.length===0?<h3>Никто с тобой не тусанет</h3>:<h3>{users.length} {renderPhrase(users.length)} с тобой сегодня</h3>
    }

    const getBageNumberOfPeopleClasses = () => {
        let classes = 'badge m-2 '
        classes+=users.length===0?'bg-danger':'bg-primary'
        return classes
    }

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !==userId))
     };
    const renderPhrase = (number) => {
        const lastNumber = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return 'человек тусанет';
        if (lastNumber === 2 || lastNumber===3 || lastNumber === 4) return 'человека тусанут'
        if (lastNumber === 1) return 'человек тусанет'
        return 'человек тусанет'    
    }

    return (
        <div>
            <span className={getBageNumberOfPeopleClasses()}>{numberOfPeople()}</span>
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((item) => (
                                    <span className={"badge m-2 bg-"+item.color} key = {item._id}>
                                        {item.name}
                                    </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                                    delete
                                </button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            )}
        </div> 
        
    )       
}
export default Users