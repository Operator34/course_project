import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../api";

import { validador } from "../../utils/validador";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const EditUserForm = ({ userId }) => {
    // const userId = match.params.userID;
    // console.log(userId);
    const [data, setData] = useState();
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const history = useHistory();
    useEffect(() => {
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData({
                ...data,
                profession: profession._id,
                qualities: transformData(qualities)
            })
        );
        api.professions.fetchAll().then((data) => setProfession(data));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target);
    };
    const transformData = (data) => {
        return data.map((elem) => ({ label: elem.name, value: elem._id }));
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
        name: {
            isRequired: {
                message: "Поле имя обязательно для заполнения"
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

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log(profession, qualities);
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then(() => history.push("/users/" + userId));
    };

    console.log("professions", professions);
    console.log("qualities", qualities);
    if (data && professions.length > 0) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                options={professions}
                                onChange={handleChange}
                                defaultOption="Сhoose..."
                                name="profession"
                                error={errors.profession}
                                value={data.profession}
                                label="Выберите свою профессию"
                            />
                            <MultiSelectField
                                name="qualities"
                                onChange={handleChange}
                                options={qualities}
                                label="Выберите ваши качества"
                                defaultValue={data.qualities}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return <h1>Loading...</h1>;
};
EditUserForm.propTypes = {
    userId: PropTypes.string
};
export default EditUserForm;
