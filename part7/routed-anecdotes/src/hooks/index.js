import { useState } from 'react'

export const useField = ({id, type, name}) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onReset = () => {
        setValue('')
    }

    return {
        id,
        type,
        value,
        onChange,
        onReset
    }
}

export const useAnotherHook = () => {

}