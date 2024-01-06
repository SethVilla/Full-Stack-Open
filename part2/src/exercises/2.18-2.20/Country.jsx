import {useEffect, useState} from "react";
import {getWeather} from "../services/services.js";

export const Country = ({country}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [weather, setWeather] = useState(null)
    console.log(country)
    useEffect(() => {
        (async () => {
            const latlng = country.latlng
            const res = await getWeather(latlng[0], latlng[1])
            setWeather(res.current)
        })()
    }, []);
    return <>
        <h2>{country.name.common}</h2>
        <button onClick={() => setShowDetails(!showDetails)}>{!showDetails ? "show details": "hide details"}</button>
        {showDetails && <>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <ul>
                {Object.values(country.languages).map(lan => <li key={lan}>{lan}</li>)}
            </ul>
            <div>
                <img src={country.flags.png} alt={country.flags.alt}/>
            </div>
            {weather &&
                <>
                    <h2>Weather in {country.name.common}</h2>
                    <p>temperature {weather.temp_c} Celcius</p>
                    <p>wind {weather.wind_mph} m/h</p>
                </>
            }
        </>}
    </>
}