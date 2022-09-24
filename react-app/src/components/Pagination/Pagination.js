import React, {useContext} from 'react';
import {DataContext} from '../../App';

const paginationElem = 3;

const Pagination = ({onSub}) => {
    const {page, count} = useContext(DataContext);
    
    // let currentPage = page === 0 ? page + 1 : page;
    let currentPage = page + 1;

    let lastPage = count;
    const arrayLeft = [];
    const arrayRight = [];

    for (let i = currentPage - 1; i > 1; i--) {
        if (arrayLeft.length === paginationElem - 1) {
            break;
        }
        arrayLeft.push(i);
    }
    arrayLeft.reverse();

    for (let i = currentPage + 1; i < lastPage; i++) {
        if (arrayRight.length === paginationElem - 1) {
            break;
        }
        arrayRight.push(i);
    }

    function renderLink(num) {
        return (
            <button onClick={e => onSub(num - 1)}>{num}</button>
        )
    }

    return (
        <div id="pagination">
            <span>{currentPage !== 1 && renderLink(1)}</span>
            {currentPage > paginationElem + 1 && <b> ... </b>}
            <span>{arrayLeft.map((num) => renderLink(num))}</span>
            <span style={{background: "red"}} >{renderLink(currentPage)}</span>
            <span>{arrayRight.map((num) => renderLink(num))}</span>
            {lastPage - currentPage > paginationElem && <b> ... </b>}
            <span>{lastPage !== 0 && lastPage !== 1 && lastPage !== currentPage && renderLink(lastPage)}</span>
        </div>
    )
}
export default Pagination;