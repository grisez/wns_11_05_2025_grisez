import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../api/queries";
import { Link } from "react-router-dom";

type Country = {
    code: string;
    name: string;
    emoji: string;
};

const CountriesList: React.FC = () => {
    const { loading, error, data } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="d-flex flex-wrap justify-content-center gap-3 p-3">
            {data?.countries.map((country) => (
                <Link
                    to={`/country/${country.code}`}
                    key={country.code}
                    className="d-flex flex-column align-items-center justify-content-center text-center border rounded p-3 text-decoration-none text-dark"
                    style={{ width: "120px", height: "120px" }}
                >
                    <div className="fw-bold mb-2">{country.name}</div>
                    <div style={{ fontSize: "2rem" }}>{country.emoji}</div>
                </Link>
            ))}
        </div>
    );

};

export default CountriesList;
