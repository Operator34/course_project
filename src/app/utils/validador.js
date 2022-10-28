/* eslint-disable */
export function validador(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isEmail": {
                const emailRexExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRexExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRexExp = /[A-Z]+/g;
                statusValidate = !capitalRexExp.test(data);
                break;
            }
            case "inContainDigit": {
                const digitRexExp = /\d+/g;
                statusValidate = !digitRexExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }

            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
