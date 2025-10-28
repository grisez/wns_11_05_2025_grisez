import React from "react";

interface AlertMessageProps {
    message: string;
    type: "success" | "danger";
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
    return (
        <div className={`alert alert-${type} text-center`} role="alert">
            {message}
        </div>
    );
};
