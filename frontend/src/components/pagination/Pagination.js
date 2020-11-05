import React, {useState, useEffect} from 'react';
import './Pagination.css';

const Pagination = (props) => {
  const {nasaCollection, search, totalHits, currentPage} = props;
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const calculatePagination = () => {
      if (nasaCollection) {
        const pages = [];
        const totalPages = Math.ceil(totalHits / 100);
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(start + 5, totalPages);
        for (let i = start; i <= end; i++) {
          pages.push(Number(i));
        }
        setPageNumbers(pages);
      }
    };
    calculatePagination();
  }, [nasaCollection, currentPage, totalHits]);

  const renderPageNumbers = () => {
    return pageNumbers.map(number => {
      return (
        <a
          className={currentPage === number ? 'active' : ''}
          key={number}
          id={number}
          onClick={(event) => search(event, Number(event.target.id))}
        >
          {number}
        </a>
      );
    });
  };

  const getLastPage = () => {
    if (pageNumbers.length === 0) {
      return currentPage;
    }
    return pageNumbers.reduce((a, b) => {
      return Math.max(a, b);
    });
  };

  return (
    <div>
      <div className="pagination">
        {currentPage > 1 &&
        (
          <a href="#"
             onClick={(event) => search(event, currentPage - 1)}
          >&laquo;</a>
        )}
        {renderPageNumbers()}
        {getLastPage() !== currentPage &&
        (
          <a href="#"
             onClick={(event) => search(event, currentPage + 1)}
          >&raquo;</a>
        )}
      </div>
    </div>
  );
};

export default Pagination;
