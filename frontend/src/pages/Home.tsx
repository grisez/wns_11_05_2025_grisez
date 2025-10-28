import CountriesList from "../components/countriesList";
import { AddCountryForm } from "../components/AddCountryForm";

export function HomePage() {
  return (
    <div>
      <AddCountryForm />
      <CountriesList />
    </div>
  );
}
