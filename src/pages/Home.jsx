import Header from "../components/Header";
import CountriesList from "../components/CountriesList";
import Error from "../components/Error";
import Loader from "../components/Loader";
import SubHeader from "../components/SubHeader";
import { useCountries } from "../context/countriesContext-withLocalStorage";

function Home() {
  const { isLoading, error } = useCountries();
  isLoading && <Loader />;
  error && <Error message="Error getting the Countries" />;
  return (
    <>
      {!isLoading && !error && (
        <main className="mx-auto w-11/12">
          <SubHeader />
          <CountriesList />
        </main>
      )}
    </>
  );
}

export default Home;
