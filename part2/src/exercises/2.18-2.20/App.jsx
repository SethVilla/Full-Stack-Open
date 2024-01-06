import {useEffect, useState} from "react";
import {getAllCountries, searchCountryByName} from "../services/services.js";
import {Country} from "./Country.jsx";

export const App = () => {
    const [countries, setCountries] = useState([])

    const [filteredCountries, setFilteredCountries] = useState([])

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        (async () => {
            const countries = await getAllCountries();
            setCountries(countries.data)
        })()
    }, []);

    useEffect(() => {
        if (countries.length > 0) {
            const debounceTimer = setTimeout(async () => {
                setFilteredCountries(() => {
                    return countries ? countries.filter(country =>
                        (country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            country.name.official.toLowerCase().includes(searchTerm.toLowerCase()))
                    ) : []
                })
            }, 500);
            return () => clearTimeout(debounceTimer);
        }
        }, [searchTerm]);

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <ul>
                {filteredCountries.length < 10 ? filteredCountries.map(country => <li key={country.name.official}>
                    <Country country={country}/>
                </li>) : <p>Too Many Matches specify another filter</p>}
            </ul>
        </div>
    );
}