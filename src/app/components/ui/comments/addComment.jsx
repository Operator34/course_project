import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import TextArea from "../../common/form/textArea";
import { validador } from "../../../utils/validador";

const initialData = { userId: "", content: "" };
const AddComment = ({ onSubmit }) => {
    const [users, setUsers] = useState();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState(initialData);

    useEffect(() => {
        api.users
            .fetchAll()
            .then((data) =>
                setUsers(
                    data.map((user) => ({ label: user.name, value: user._id }))
                )
            );
    });
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Введите комментарий"
            }
        }
    };

    const validate = () => {
        const errors = validador(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    if (users) {
        return (
            <div>
                <h2>Оставить комментарий</h2>
                <form onSubmit={handleSubmit}>
                    <SelectField
                        value={data.userId}
                        defaultOption="Выберите пользователя"
                        name="userId"
                        error={errors.userId}
                        onChange={handleChange}
                        options={users}
                    />
                    <TextArea
                        value={data.content}
                        name="content"
                        label="Сообщение"
                        error={errors.content}
                        onChange={handleChange}
                    />
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary">
                            Опубликовать
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};

AddComment.propTypes = {
    onSubmit: PropTypes.func
};

export default AddComment;
