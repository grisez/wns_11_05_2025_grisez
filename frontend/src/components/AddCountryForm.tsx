import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY } from "../api/mutations";
import { GET_COUNTRIES } from "../api/queries";

export const AddCountryForm: React.FC = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [emoji, setEmoji] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const [addCountry] = useMutation(ADD_COUNTRY, {
        refetchQueries: [{ query: GET_COUNTRIES }],
    });

    const validateForm = () => {
        if (name.length < 2 || name.length > 50) {
            return "Name must be between 2 and 50 characters.";
        }
        if (code.length < 2 || code.length > 3) {
            return "Code must be between 2 and 3 characters.";
        }
        if (emoji.length > 4) {
            return "Emoji must be 4 characters max.";
        }
        return "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setSuccess("");
            return;
        }

        try {
            await addCountry({
                variables: { data: { name, code, emoji } },
            });
            setSuccess("Perfect! Country added!");
            setError("");
            setName("");
            setCode("");
            setEmoji("");
        } catch {
            setError("Failed to add country.");
            setSuccess("");
        }
    };

    return (
        <div className="container my-4">
            <div className="card p-2">
                {error && <div className="alert alert-danger w-100 text-center">{error}</div>}
                {success && <div className="alert alert-success w-100 text-center">{success}</div>}

                <h3 className="text-center mb-3 py-2" >Add a Country</h3>
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-wrap justify-content-center align-items-center gap-2"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control w-auto"
                    />
                    <input
                        type="text"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="form-control w-auto"
                    />
                    <input
                        type="text"
                        placeholder="Emoji"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                        className="form-control w-auto"
                    />
                    <button type="submit" className="btn btn-secondary">
                        Add Country
                    </button>
                </form>
            </div>
        </div>
    );
};
