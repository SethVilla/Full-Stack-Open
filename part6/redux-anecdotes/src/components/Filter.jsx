import {onKeyWordChange} from "../reducers/filterReducer.js";
import {useDispatch} from "react-redux";

export const Filter = () => {

    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(onKeyWordChange({keyword: event.target.value}))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}