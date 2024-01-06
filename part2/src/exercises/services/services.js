import axios from 'axios'

const basePhoneBookUrl = "/api/persons"

export const getPhoneBookInfo = async (newPerson) => {
    const res = await axios.post(basePhoneBookUrl, newPerson)
    return res.data
}


export const addNewPerson = async (newPerson) => {
    const res = await axios.post(basePhoneBookUrl, newPerson)
    return res.data
}

export const updatePerson = async (newPerson) => {
    const res = await axios.put(`${basePhoneBookUrl}/${newPerson.id}`, newPerson)
    return res.data
}

export const findPersonById = async (id) => {
  const res =  await axios.get(`${basePhoneBookUrl}/${id}`)
    return res.data
}

export const deletePerson = async (id) => {
    try {
        const res = await axios.delete(`${basePhoneBookUrl}/${id}`)
        res.success = true
        return res
    } catch (e) {
        return {success: false}
    }
}

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

export const getWeather = async (lat, long) => {
    try {
        console.log(import.meta.env)
        console.log(import.meta.env.VITE_WEATHER_API_KEY, lat, long)
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${lat},${long}&aqi=no`, {
            method: "GET",
        })
        const data = await res.json();
        console.log(data)
        return data
    } catch (e) {
        console.log(e)
    }
}