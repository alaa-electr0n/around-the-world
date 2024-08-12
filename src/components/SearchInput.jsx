import { useEffect, useState } from "react";
import { useCountries } from "../context/countriesContext-withLocalStorage";

function SearchInput() {
  const { dispatch } = useCountries();
  const [searchInput, setSearchInput] = useState("");

  function handleSearch(e) {
    setSearchInput(e.target.value.trim());
  }

  // delay the dispatch till the user type a meaningful searchterm
  useEffect(
    function () {
      const typingDelay = setTimeout(function () {
        dispatch({ type: "search/countries", payload: searchInput });
      }, 300);

      return function () {
        clearTimeout(typingDelay);
      };
    },
    [dispatch, searchInput],
  );

  return (
    <form className="relative flex-1">
      <div className="absolute left-8 top-5">
        <img src="../src/assets/search-lense.svg" />
      </div>
      <input
        type="text"
        placeholder="search..."
        name="search"
        className="h-12 w-full max-w-md rounded-full pl-20 shadow sm:w-[80%] md:h-14 dark:bg-gray-800"
        value={searchInput}
        onChange={handleSearch}
      />
    </form>
  );
}

export default SearchInput;
