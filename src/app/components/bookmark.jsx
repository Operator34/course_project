import React from "react";

const Bookmark = (props) => {
    console.log(props.user.bookmark);
  return (
    <button 
     onClick={() => props.onHandleBookmark(props.user._id) }
    >  
       { console.log(props.user.bookmark)}
       {props.user.bookmark ? <i className='bi bi-bookmark-heart'></i> : <i className='bi bi-bookmark'></i>} 
    </button>
  );
};


export default Bookmark