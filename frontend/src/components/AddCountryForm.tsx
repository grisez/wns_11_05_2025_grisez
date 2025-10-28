import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY } from "../api/mutations";
import { GET_COUNTRIES } from "../api/queries";

export const AddCountryForm: React.FC = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [emoji, setEmoji] = useState("");

    const [addCountry] = useMutation(ADD_COUNTRY, {
        refetchQueries: [{ query: GET_COUNTRIES }],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !code || !emoji) return;

        addCountry({
            variables: { data: { name, code, emoji } },
        });

        setName("");
        setCode("");
        setEmoji("");
    };

    return (
        <div className="container my-4">
            <div className="card p-2">
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
