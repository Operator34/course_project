/* eslint-disable */
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    console.log(optionsArray);

    const handleChange = (value) => {
        console.log(value);
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                name={name}
                onChange={handleChange}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string
};
export default MultiSelectField;
