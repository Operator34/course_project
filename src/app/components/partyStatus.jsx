import React from "react";

const PartyStatus = (props) => {
    const { userCount: count } = props;

    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    };
    return (
        <h2>
            <span
                className={"badge " + (count > 0 ? "bg-primary" : "bg-danger")}
            >
                {count > 0
                    ? `${count + " " + renderPhrase(count)} с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};

export default PartyStatus;
