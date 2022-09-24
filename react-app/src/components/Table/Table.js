import './Table.css';

const Table = ({data}) => {

    const elements = data.map(items => {
        return (
            <tr>
                <td>{items.year}</td>
                <td>{items.name}</td>
                <td>{items.lot}</td>
                <td>{items.distance}</td>
            </tr>
        )
    })

    return (
        <table className="title">
            <thead>
            <tr>
                <th>Дата</th>
                <th>Имя</th>
                <th>Количество попыток</th>
                <th>Расстояние</th>
            </tr>
            </thead>
            <tbody>
            {elements}
            </tbody>
        </table>
    )
}

export default Table;