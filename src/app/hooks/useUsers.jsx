import React from "react";
import PropTypes from "prop-types";

const userContext = React.createContext();

export const useUser = () => {
    return userContext(userContext);
};

const UserProvider = ({ children }) => {
    return <userContext.Provider>{children}</userContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default UserProvider;
