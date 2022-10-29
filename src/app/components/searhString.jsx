import React from "react";
import PropTypes from "prop-types";

const SearchString = ({ handleSearchSubmit, value }) => {
    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
                Поиск
            </span>
            <input
                placeholder="Введите имя"
                id="nameSearch"
                value={value}
                type="text"
                name="nameSearch"
                className="form-control"
                onChange={handleSearchSubmit}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
            ></input>
        </div>
    );
};
SearchString.propTypes = {
    handleSearchSubmit: PropTypes.func,
    value: PropTypes.string
};

export default SearchString;
