import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/qualities.service";

const QualityContext = React.createContext();

export const useQuality = () => {
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
        getQualities();
    }, []);

    async function getQualities() {
        try {
            const { content } = await qualityService.get();
            console.log(content);
            setQualities(content);
            console.log(qualities);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualityContext.Provider value={(isLoading, qualities)}>
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
