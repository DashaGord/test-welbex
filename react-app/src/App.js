import './App.css';
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";



function App() {
    const data = [
        {
            date: 1991,
            name: 'Майк Пауэлл',
            lot: 1,
            distance: 8.95
        },
        {
            date: 1988,
            name: 'Галина Чистякова',
            lot: 2,
            distance: 7.52
        }
    ]
  return (
    <div className="App">
        <h1 className="header">Таблица <span>лучших результатов по прыжкам в длину</span></h1>
        <Filter/>
        <Table data={data}/>
      <Pagination/>
    </div>
  );
}

export default App;
