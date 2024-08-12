import { Link } from "react-router-dom";
import { formatNumber } from "../../utils";
import { useCountries } from "../../context/countriesContext-withLocalStorage";

function Country({ country }) {
  const { name, capital, languages, flags, population, continents, cca2 } =
    country;

  const { dispatch, selectedCountryCode } = useCountries();

  // optional chaining and nullish coalescense as the data are undefined till it's arrived from the APi

  const countryName = name?.common ?? "";
  const capitalName = capital ?? "";
  const countryLanguage = Object.values(languages ?? {})[0] ?? "";
  const countryFlag = flags?.png ?? "";
  const region = continents?.[0];

  // const code = country?.cca2 ?? "#";

  //   const countryName = name.common;
  //   const capitalName = capital;
  //   const countryLanguage = Object.values(languages)[0];
  //   const countryFlag = flags.png;

  //set/selectedCountry"

  function handleSelectedCountry() {
    dispatch({ type: "set/selectedCountry ", payload: cca2 });
  }
  const isSelected = cca2 === selectedCountryCode;
  return (
    <li
      className={`h-full rounded-[4px] bg-gray-50 px-2 pb-9 pt-2 shadow lg:w-[264px] dark:bg-blue-950 dark:text-gray-100 ${
        isSelected ? "border-4 border-blue-700 shadow-current" : ""
      }`}
      onClick={handleSelectedCountry}
    >
      <Link to={`/country/${cca2}`}>
        <img
          className="inline-block h-[160px] w-[264px] rounded-[4px]"
          src={countryFlag}
          alt={flags.alt}
        />

        <h2 className="my-3 px-2 text-[18px] font-bold">{countryName}</h2>

        <div className="my-3 mt-3 flex flex-col space-y-2 px-2 text-sm">
          <p>
            {" "}
            <span className="text-sm text-gray-700 dark:text-gray-50">
              Population
            </span>{" "}
            : <span className="font-medium">{formatNumber(population)}</span>
          </p>
          <p>
            <span className="text-sm text-gray-700 dark:text-gray-50">
              Region:
            </span>{" "}
            <span className="font-medium">{region} </span>
          </p>
          <p>
            {" "}
            <span className="text-sm text-gray-700 dark:text-gray-50">
              Capital
            </span>
            : <span className="text-sm font-medium">{capitalName}</span>
          </p>
        </div>
      </Link>
    </li>
  );
}

export default Country;
