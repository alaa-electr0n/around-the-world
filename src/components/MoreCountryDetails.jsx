import { useCountries } from "../context/countriesContext-withLocalStorage";
import { formatNumber } from "../utils";

function MoreCountryDetails() {
  const { country } = useCountries();
  console.log(country);

  const currenciesObj = country?.currencies;

  const formattedCurrencies = Object.values(currenciesObj ?? {}).map(
    (obj) => `${obj.name}, "${obj.symbol}" `,
  );

  const languagesObj = country?.languages;
  const formattedLanguages = Object.values(languagesObj ?? {}).join(", ");

  return (
    <section className="mx-auto mt-10 flex h-full w-[90%] flex-col sm:w-full sm:gap-2 md:grid md:grid-cols-[auto_1fr] md:gap-3">
      <div className="grow p-2 sm:p-4 md:flex-1">
        <img
          src={country?.flags?.png}
          alt={country?.flags?.alt}
          className="inline-block max-w-full"
        />
      </div>
      <div className="flex flex-col justify-evenly gap-3 space-x-2 space-y-2 md:grid md:grid-flow-row md:grid-cols-[auto_auto] md:gap-2 md:px-4">
        <h2 className="col-span-2 mt-2 text-3xl font-bold tracking-wider text-blue-950 sm:text-6xl md:mb-8 dark:text-gray-200">
          {country?.name?.common}
        </h2>
        <div className="space-y-2 sm:space-y-4">
          <p>
            <span className="text-lg font-semibold capitalize">
              Population:{" "}
            </span>
            <span className="font-medium text-gray-600 dark:text-slate-100">
              {formatNumber(country?.population)}
            </span>
          </p>
          <p>
            <span className="text-lg font-semibold capitalize">Region: </span>
            <span className="font-medium text-gray-600 dark:text-slate-100">
              {country?.region}
            </span>
          </p>
          {country?.subregion && (
            <p>
              <span className="text-lg font-semibold capitalize">
                Sub Region:{" "}
              </span>
              <span className="font-medium text-gray-600 dark:text-slate-100">
                {country?.subregion}
              </span>
            </p>
          )}
          <p>
            <span className="text-lg font-semibold capitalize">Capital: </span>
            <span className="font-medium text-gray-600 dark:text-slate-100">
              {country?.capital}
            </span>
          </p>
        </div>
        <div className="space-y-2 sm:space-y-4">
          <p>
            <span className="text-lg font-semibold capitalize">
              Top Level Domain:{" "}
            </span>
            <span className="font-medium text-gray-600 dark:text-slate-100">{`"${country?.tld}"`}</span>
          </p>
          <p>
            <span className="text-lg font-semibold capitalize">
              Currencies:{" "}
            </span>
            <span className="font-medium text-gray-600 dark:text-slate-100">
              {formattedCurrencies}
            </span>
          </p>
          <p>
            <span className="text-lg font-semibold capitalize">
              Languages:{" "}
            </span>
            <span className="font-medium text-gray-600 dark:text-slate-100">
              {formattedLanguages}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default MoreCountryDetails;
