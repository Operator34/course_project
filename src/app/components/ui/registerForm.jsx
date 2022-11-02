import React, { useEffect, useState } from "react";
import { validador } from "../../utils/validador";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: ""
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    // useEffect(() => {
    //     console.log(professions);
    // }, [professions]);
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        // console.log(target.name);
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательная для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Поле пароль обязательно для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотябы одну заглавную букву"
            },
            inContainDigit: {
                message: "Пароль должен содержать хотябы одну цифру"
            },
            min: {
                message: "Пароль должен содержать не менее восьми символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validador(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    // console.log(isValid);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
                classes="passField"
            />
            <SelectField
                onChange={handleChange}
                options={professions}
                defaultOption="Сhoose..."
                error={errors.profession}
                value={data.profession}
                label="Выберите свою профессию"
            />

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};
export default RegisterForm;
