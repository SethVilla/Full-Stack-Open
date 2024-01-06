export const PhoneBookList = ({filteredPersons, onDeletePerson}) => {
    return <>
        <h2>Numbers</h2>
        {filteredPersons.map(person =>
            <div key={person.name}>
                {person.name} {person.number}
                <button onClick={() => onDeletePerson(person)}>delete</button>
            </div>)}
    </>
}