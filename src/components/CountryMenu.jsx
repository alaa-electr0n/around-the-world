import Select from "react-select";
import { useCountries } from "../context/countriesContext-withLocalStorage";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
function CountryMenu() {
  const { countriesList, dispatch } = useCountries();
  const continents = countriesList.map((country) => country.continents[0]);

  const continentsOptions = continents.reduce((acc, currContienent) => {
    if (!acc.includes(currContienent)) {
      return [...acc, currContienent];
    } else {
      return acc;
    }
  }, []);

  const optionsContienents = continentsOptions.map((continents) => {
    return { value: continents?.toLowerCase(), label: continents };
  });

  // Adding the default option at the start
  const defaultOption = { value: "all", label: "All Regions" };
  optionsContienents.unshift(defaultOption);

  function handleSelect(e) {
    const value = e.value.toLowerCase();
    dispatch({ type: "filter/countries", payload: value });
  }

  return (
    <div>
      <Select
        onChange={handleSelect}
        defaultValue={optionsContienents[0]}
        options={optionsContienents}
        classNames={{
          menuList: () => "dark:bg-gray-800",
          container: () => "dark:bg-gray-800",
          menu: () => "bg-gray-100 dark:bg-gray-800 dark:text-gray-100",
          input: () => "dark:!text-gray-600 ",
          singleValue: () => "dark:text-gray-100",
          control: () =>
            "flex h-12 items-center justify-between gap-12 rounded-md !border-none pl-4 pr-2 shadow dark:bg-gray-800 dark:text-gray-100 md:h-14",
          indicatorSeparator: () => "hidden",
          option: () =>
            `dark:!text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600
            `,
        }}
      />
    </div>
  );
}

export default CountryMenu;
