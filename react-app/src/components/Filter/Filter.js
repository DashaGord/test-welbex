import './Filter.css';
import React, {useContext} from 'react';
import {DataContext} from '../../App';


const Filter = ({onSub}) => {

    const {columnName, setColumnName, condition, setCondition, value, setValue, setPage} = useContext(DataContext);

    function onFormSubmit() {
        setPage(0);
        onSub(0);
    }

    return (
        <form className="filter" onSubmit={e => { e.preventDefault(); }}>
            <select name="colum" required value={columnName} onChange={e => setColumnName(e.target.value)}>
                <option value="">Колонка...</option>
                <option value="name">Имя</option>
                <option value="lot">Количество</option>
                <option value="distance">Расстояние</option>
            </select>
            <select name="condition" required value={condition} onChange={e => setCondition(e.target.value)}>
                <option value="">Условие...</option>
                <option value="=">Равно</option>
                <option value="like">Содержит</option>
                <option value=">">Больше</option>
                <option value="<">Меньше</option>
            </select>
            <input
                id="value"
                name="value"
                type="text"
                onChange={e => setValue(e.target.value)}
                value={value}
                placeholder="Значение для фильтрации"
            />
            <button onClick={onFormSubmit} >ПРИМЕНИТЬ</button>
        </form>
    )
}

export default Filter;