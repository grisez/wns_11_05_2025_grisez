import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="header d-flex flex-column justify-content-center align-items-center text-white">
      <h1 className="header-title">Checkpoint : frontend</h1>
      <Link to="/" className="header-link text-white">
        Countries
      </Link>
    </header>
  );
}

