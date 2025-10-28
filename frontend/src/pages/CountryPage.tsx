import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../api/queries";

type Country = {
    id: number;
    name: string;
    code: string;
    emoji: string;
    continent?: {
        id: number;
        name: string;
    };
};

export const CountryPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const { loading, error, data } = useQuery<{ country: Country }>(GET_COUNTRY, {
        variables: { code },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const country = data?.country;

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center p-2">
            <div className="w-100 d-flex justify-content-start mb-4">
                <Link to="/" className="btn btn-secondary">
                    Home
                </Link>
            </div>
            <div className="card text-center p-4" style={{ width: "20rem" }}>
                <p className="fs-1 mb-2">{country?.emoji}</p>
                <h2 className="card-title mb-3">Name: {country?.name}</h2>
                {country?.continent && <p>Continent: {country.continent.name}</p>}
            </div>
        </div>
    );
};