import { useCountries } from "../context/countriesContext-withLocalStorage";
import Loader from "./Loader";
import Error from "./Error";
import Country from "./County-v2Name";
import EmptyResult from "./EmptyResult";

function CountriesList() {
  const { displayedCountriesList, isLoading, error } = useCountries();

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <>
      {displayedCountriesList && displayedCountriesList.length ? (
        <ul className="sm:mt-18 mx-auto mt-10 grid grid-cols-1 place-items-center items-center gap-1 px-2 sm:grid-cols-2 sm:gap-1.5 md:grid-cols-3 md:gap-2 lg:grid-cols-4 lg:gap-3">
          {displayedCountriesList.map((country) => (
            <Country country={country} key={country.name.official} />
          ))}
        </ul>
      ) : (
        <EmptyResult />
      )}
    </>
  );
}

export default CountriesList;
