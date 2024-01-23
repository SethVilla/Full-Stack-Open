import {useEffect, useState} from "react";
import {searchCountryByName} from "../services/country";

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        (async () => {
            const res = await searchCountryByName(name)
            if (res) {
                res.found = true
                setCountry(res)
            } else {
                setCountry({found: false})
            }
        })()
    }, [name])

    return country
}
