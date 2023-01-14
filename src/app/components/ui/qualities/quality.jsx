import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";
const Quality = ({ id }) => {
    // console.log("id", id);
    const { getQuality } = useQualities();
    const qual = getQuality(id);
    // console.log("qual", qual);

    return <span className={"badge m-1 bg-" + qual.color}>{qual.name}</span>;
};

Quality.propTypes = {
    id: PropTypes.string
};
export default Quality;
