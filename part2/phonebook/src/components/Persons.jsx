const Person = ({ person, onDelete }) => {
    const handleDelete = () => onDelete(person.id)
    return (
        <li key={person.id}>
            {person.name} {person.number}
            <button onClick={handleDelete}>delete</button>
        </li>
    )
}

const Persons = ({ persons, deletePerson }) => {
    return (
        <ul>
            {persons.map(person =>
                <Person key={person.id} person={person} onDelete={deletePerson} />
            )}
        </ul>
    )
}

export default Persons