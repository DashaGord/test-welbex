import './App.css';
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import React, {useEffect, useState} from 'react';
import DataService from "./service/DataService";
import {createContext} from 'react';


export const DataContext = createContext();

const dataService = new DataService();

const App = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [columnName, setColumnName] = useState("");
    const [condition, setCondition] = useState("");
    const [value, setValue] = useState("");
    const [page, setPage] = useState(0);


    function fetchAvailableData() {
        dataService.getComments().then(res => {
            setData(res.appModels);
            setCount(res.count);
        })
    }

    function fetchFilteredData(page) {
        if (columnName !== "" && condition !== "" && value !== "") {
            dataService.getCommentsWithParams(columnName, condition, value, page).then(res => {
                setData(res.appModels);
                setCount(res.count);
            })
        }
    }

    function paginationFetch(page) {
        setPage(page);
        if (columnName !== "" && condition !== "" && value !== "") {
            fetchFilteredData(page);
        } else {
            dataService.getCommentsPaginate(page).then(res => {
                setData(res.appModels);
                setCount(res.count);
            })
        }
    }

    useEffect(() => {
        fetchAvailableData();
    }, []);


    return (
        <div className="App">
            <h1 className="header">Таблица <span>лучших результатов по прыжкам в длину</span></h1>
            <DataContext.Provider value={{columnName, setColumnName, condition, setCondition, value, setValue, setPage}}>
                <Filter onSub={fetchFilteredData}/>
            </DataContext.Provider>
            <Table data={data}/>
            <DataContext.Provider value={{page, setPage, count}}>
                <Pagination onSub={paginationFetch}/>
            </DataContext.Provider>
        </div>
    );
}

export default App;
