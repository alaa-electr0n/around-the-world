import { useNavigate, useParams } from "react-router-dom";
import { useCountries } from "../context/countriesContext-withLocalStorage";
import { useEffect } from "react";
import Loader from "./Loader";
import Error from "./Error";
import Button from "./Button";
import MoreCountryDetails from "./MoreCountryDetails";

function CountryDetails() {
  const { country, isLoading, error, dispatch, getOneCountryByName } =
    useCountries();
  const { countryName } = useParams();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/");
  }
  useEffect(
    function () {
      if (countryName) getOneCountryByName(countryName);
      //keep track of the selected country
      dispatch({ type: "set/selectedCountry", payload: country?.cca2 });
    },

    [countryName, getOneCountryByName, dispatch, country?.cca2],
  );

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="mx-auto mt-10 px-4 sm:mt-12 md:px-16">
      <Button onClick={handleGoBack}>&larr;</Button>
      <MoreCountryDetails />
    </div>
  );
}

export default CountryDetails;
