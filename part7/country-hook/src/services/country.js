import axios from 'axios'

export const searchCountryByName = async (query) => {
    try {
        return await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${query}`)
    } catch (e) {
        return false
    }
}

export const getAllCountries = async () => {
    try {
        return await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    } catch (e) {
        return false
    }
}