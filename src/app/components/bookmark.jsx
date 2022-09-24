import React from "react";

const Bookmark = (props) => {
  const {user, onHandleBookmark} = props

  return (
    <button 
     onClick={() => onHandleBookmark(user._id)}
    >  
      {user.bookmark ? <i className='bi bi-bookmark-heart'></i> : <i className='bi bi-bookmark'></i>} 
    </button>
  );
};


export default Bookmark