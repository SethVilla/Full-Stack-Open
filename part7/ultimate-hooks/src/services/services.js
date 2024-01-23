import axios from 'axios'

export const getResource = async (url) => {
    const res = await axios.get(url)
    return res.data
}


export const createResource = async ({url, resource}) => {
    try {
        const res = await axios.post(url, resource)
        res.success = true
        return res.data
    } catch (e) {
        console.log(e)
        return {
            success: false,
            error: e.response.data.error
        }
    }
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