export function displayDate(data) {
    const date = new Date(parseInt(data));
    const dateNow = new Date();
    const yearDif = dateNow.getFullYear() - date.getFullYear();
    console.log("Год ", yearDif);
    if (yearDif === 0) {
        const dayDif = dateNow.getDay() - date.getDay();
        console.log("Дней", dayDif);
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours();
            console.log("Часов", hourDif);
            if (hourDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes();
                console.log("Минут", minutesDif);
                if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
                if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
                if (minutesDif >= 10 && minutesDif < 30) {
                    return "10 минут назад";
                }
                if (minutesDif >= 30 && minutesDif < 60) {
                    return " 30 минут назад";
                }
            }
            return ` ${date.getHours()}:${date.getMinutes()}`;
        }
        return ` ${date.toLocaleString("default", {
            month: "long",
            day: "numeric"
        })}`;
    }
    return ` ${date.getFullYear()}.${date.getMonth() + 1}_${date.getDate()}`;
}
