import './Filter.css';

const Filter = () => {
    return(
        <form className="filter">
            <select name="colum" required>
                <option value="">Колонка...</option>
                <option value="name">Имя</option>
                <option value="lot">Количество</option>
                <option value="distance">Расстояние</option>
            </select>
            <select name="condition" required>
                <option value="">Условие...</option>
                <option value="equally">Равно</option>
                <option value="contain">Содержит</option>
                <option value="more">Больше</option>
                <option value="less">Меньше</option>
            </select>
            <input type="text" placeholder="Значение для фильтрации"/>
                <button>Применить</button>
        </form>
    )
}

export default Filter;