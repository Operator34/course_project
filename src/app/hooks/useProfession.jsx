import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ProfessionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    // console.log("useProfessions:", useContext(ProfessionContext));
    return useContext(ProfessionContext);
};
export const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        getProfessionsList();
    }, []);

    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    async function getProfessionsList() {
        try {
            const { content } = await ProfessionService.get();
            // console.log("content professions", content);
            setProfessions(content);
            // console.log("professions после set:", setProfessions);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
