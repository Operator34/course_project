import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import QualityService from "./../services/qualities.service";

const QualityContext = React.createContext();

export const useQualities = () => {
    // console.log("useQuality:", useContext(QualityContext));
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getQualitiesList();
    }, []);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getQuality(id) {
        return qualities.find((p) => p._id === id);
    }

    async function getQualitiesList() {
        try {
            const { content } = await QualityService.get();
            // console.log("content qualities", content);
            setQualities(content);
            // console.log("qualities после set:", setQualities);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
