import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "./../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "LOADING qual...";
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality} id={quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
