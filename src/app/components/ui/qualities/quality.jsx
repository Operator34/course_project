import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";
const Quality = ({ id }) => {
    // console.log("id", id);
    const { getQuality } = useQuality();
    const qual = getQuality(id);
    // console.log("qual", qual);

    return <span className={"badge m-1 bg-" + qual.color}>{qual.name}</span>;
};

Quality.propTypes = {
    id: PropTypes.string
};
export default Quality;
