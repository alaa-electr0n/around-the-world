import { createContext, useCallback, useContext, useEffect } from "react";
import { useReducer } from "react";
import { getCities, getCityByCode } from "../../apiCountries";
const CountriesContext = createContext();

const initialState = {
  countriesList: [],
  displayedCountriesList: [],
  country: {},
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

    default:
      return state;
  }
}
function CountriesProvider({ children }) {
  const [
    { countriesList, country, isLoading, error, displayedCountriesList },
    dispatch,
  ] = useReducer(reducerfn, initialState);

  useEffect(function () {
    async function getAllCountries() {
      dispatch({ type: "loading" });
      try {
        const countriesData = await getCities();
        dispatch({ type: "set/countries", payload: countriesData });
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

  return (
    <CountriesContext.Provider
      value={{
        countriesList,
        displayedCountriesList,
        country,
        isLoading,
        error,

        getOneCountry,
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
