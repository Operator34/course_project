import React from "react";

import Quality from "./qualitie"
import BookMark from "./bookmark";

const User = (props) => {

    const {user, onDelete} = props

    return(
        
        <tr key={user._id}>
        <td>{user.name}</td>
        <td>
            {user.qualities.map((quality) => (
                <Quality 
                    key={quality._id}
                    {...quality}
                />
            ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} /5</td>
        <td>    
                <BookMark 
                    key={user._id} 
                    id={user._id}
                    bookmark={user.bookmark}
                    onHandleBookmark = {props.onHandleBookmark}
                />
        </td>
        <td>
            <button
                onClick={() => onDelete(user._id)}
                className="btn btn-danger"
            >
                delete
            </button>
        </td>
    </tr>
    )

}

export default User