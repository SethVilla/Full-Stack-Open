export const AddPerson = ({addPerson, onInputChange}) => {
    return <> <h2>add a new</h2>
    <form onSubmit={addPerson}>
        <div>
            name: <input name="name" onChange={onInputChange}/>
        </div>
        <div>
            number: <input name="number" onChange={onInputChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    </>
}