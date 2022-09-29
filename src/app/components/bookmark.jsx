import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, bookmark, onHandleBookmark }) => {
    return (
        <button className = "btn fs-2" onClick={() => onHandleBookmark(id)}>
            {bookmark ? (
                <i className="bi bi-bookmark-heart" ></i>
            ) : (
                <i className="bi bi-bookmark"></i>
            )}
        </button>
    );
};

Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onHandleBookmark: PropTypes.func.isRequired
};
export default Bookmark;
