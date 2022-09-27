import React from "react";

const Bookmark = ({ id, bookmark, onHandleBookmark }) => {
    return (
        <button onClick={() => onHandleBookmark(id)}>
            {bookmark ? (
                <i className="bi bi-bookmark-heart"></i>
            ) : (
                <i className="bi bi-bookmark"></i>
            )}
        </button>
    );
};

export default Bookmark;
