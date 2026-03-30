import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import "./search.css";

// interfata pentru structura unui oras
interface City {
  latitude: string;
  longitude: string;
  name: string;
  countryCode: string;
}

// interfata pt proprietatile componentei de cautare
interface SearchProps {
  onSearchChange: (searchData: City | null) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<City | null>(null);
  // const [showText, setShowText] = useState<boolean>(true);

  // functia asincrona pentru incarcarea optiunilor de cautare
  const loadOptions = async (inputValue: string) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const responseData = await response.json();

    // maparea datele oraselor pentru a le folosi in optiuni
    const options = responseData.data.map((city: City) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    }));

    return { options };
  };

  // functia pentru gestionarea schimbarii cautarii
  const handleOnChange = (searchData: City | null) => {
    setSearch(searchData);
    onSearchChange(searchData);
    // setShowText(false);
  };

  return (
    <main className="bodySearch">
      <div className="search-container">
        <div className="search-bar-container">
          <AsyncPaginate
            className="search-bar"
            placeholder="Căutare oraș..."
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
          />
          {/* {showText && <p className="search-text">Introduceți orașul dorit...</p>} */}
        </div>
      </div>
    </main>
  );
};

export default Search;
