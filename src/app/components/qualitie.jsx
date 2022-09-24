import React from "react";

const Quality = (quality) => {
    //console.log(quality);
    return(
        <span className={"badge m-1 bg-" + quality.color} key={quality._id}>
        {quality.name}
    </span>
    )
}

export default Quality