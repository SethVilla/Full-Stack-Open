import {useEffect, useState} from "react";
import {createResource, getResource} from "../services/services.js";

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        (async () => {
            const res = await getResource(baseUrl)
            setResources(res)
        })()
    }, []);

    const create = async (resource) => {
       const data = await createResource(resource)
        console.log(data)
        setResources(prevState => {
            return [...prevState, data]
        })
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}
