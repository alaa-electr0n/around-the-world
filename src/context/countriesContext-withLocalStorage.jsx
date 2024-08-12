import { createContext, useCallback, useContext, useEffect } from "react";
import { useReducer } from "react";
import { getCities, getCityByCode, getCityByName } from "../apiCountries";
const CountriesContext = createContext();

const initialState = {
  countriesList: [],
  displayedCountriesList: [],
  country: {},
  selectedCountryCode: "",
  isLoading: false,
  error: "",
};

function reducerfn(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    //start
    case "set/countries":
      return {
        ...state,
        countriesList: action.payload,
        displayedCountriesList: action.payload,
        isLoading: false,
      };
    case "set/country":
      return {
        ...state,
        isLoading: false,
        country: action.payload,
      };
    case "failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    //filter countries
    case "filter/countries":
      if (action.payload === "all") {
        return { ...state, displayedCountriesList: state.countriesList };
      } else {
        return {
          ...state,
          displayedCountriesList: state.countriesList.filter(
            (country) => country.continents[0].toLowerCase() === action.payload,
          ),
        };
      }
    //search countries
    case "search/countries":
      if (!action.payload) {
        return {
          ...state,
          displayedCountriesList: state.countriesList,
        };
      } else {
        const filteredCountries = state.countriesList.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(action.payload.toLowerCase()),
        );
        return {
          ...state,
          displayedCountriesList: filteredCountries,
        };
      }

    //track the last selected country
    case "set/selectedCountry":
      return {
        ...state,
        selectedCountryCode: action.payload,
      };
    default:
      return state;
  }
}
function CountriesProvider({ children }) {
  const [
    {
      countriesList,
      country,
      isLoading,
      error,
      displayedCountriesList,
      selectedCountryCode,
    },
    dispatch,
  ] = useReducer(reducerfn, initialState);

  useEffect(function () {
    async function getAllCountries() {
      dispatch({ type: "loading" });
      try {
        //get the data from local storage api
        const countriesInLocalStorage = localStorage.getItem("countries");

        if (countriesInLocalStorage)
          dispatch({
            type: "set/countries",
            payload: JSON.parse(countriesInLocalStorage),
          });

        //if no data in local storage then fetch the data from the countries api
        const countriesData = await getCities();
        dispatch({ type: "set/countries", payload: countriesData });

        //then set the data in the local storage api
        localStorage.setItem("countries", JSON.stringify(countriesData));
      } catch (err) {
        dispatch({ type: "failed", payLoad: "Error getting the countries" });
      }
    }

    getAllCountries();
  }, []);

  const getOneCountry = useCallback(async function (code) {
    dispatch({ type: "loading" });
    try {
      const countryData = await getCityByCode(code);
      dispatch({ type: "set/country", payload: countryData });
    } catch (err) {
      dispatch({
        type: "failed",
        payLoad: "Error getting the country details",
      });
    }
  }, []);

  const getOneCountryByName = useCallback(async function (name) {
    dispatch({ type: "loading" });
    try {
      const countryData = await getCityByName(name);
      dispatch({ type: "set/country", payload: countryData });
    } catch (err) {
      dispatch({
        type: "failed",
        payLoad: "Error getting the country details",
      });
    }
  }, []);

  return (
    <CountriesContext.Provider
      value={{
        countriesList,
        displayedCountriesList,
        country,
        selectedCountryCode,
        isLoading,
        error,
        dispatch,
        getOneCountry,
        getOneCountryByName,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountriesContext);
  if (context === undefined)
    throw new Error("You are using the countries context outside its provider");
  return context;
}

export default CountriesProvider;
