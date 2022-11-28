import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import CommentList from "./comments/commentList";
import AddComment from "./comments/addComment";

const Comments = ({ userId }) => {
    console.log(userId);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => {
            setComments(data);
        });
    }, []);
    const handleRemove = (id) => {
        api.comments
            .remove(id)
            .then((id) =>
                setComments(comments.filter((comment) => comment._id !== id))
            );
    };
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddComment onSubmit={handleSubmit} />
                </div>
            </div>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentList
                            comments={comments}
                            onRemove={handleRemove}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
Comments.propTypes = {
    userId: PropTypes.string,
    user: PropTypes.object
};
export default Comments;
