import { useParams } from "react-router-dom";
import { useCountries } from "../../context/countriesContext-withLocalStorage";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

function CountryDetails() {
  const { country, getOneCountry, isLoading, error, dispatch } = useCountries();
  const { code } = useParams();

  useEffect(
    function () {
      if (code) getOneCountry(code);
      //keep track of the selected country
      dispatch({ type: "set/selectedCountry", payload: code });
    },

    [code, getOneCountry, dispatch],
  );

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  const countryName = country?.name?.official ?? "";

  return (
    <div>
      <p>country Name : {countryName}</p>
    </div>
  );
}

export default CountryDetails;
