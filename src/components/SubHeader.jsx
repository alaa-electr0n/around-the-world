import CountryMenu from "./CountryMenu";
import SearchInput from "./SearchInput";

function SubHeader() {
  return (
    <div className="md:px- container mx-auto px-5">
      <div className="md: flex flex-col justify-between gap-10 sm:flex-row md:h-14 md:gap-6">
        <SearchInput />
        <CountryMenu />
      </div>
    </div>
  );
}

export default SubHeader;
