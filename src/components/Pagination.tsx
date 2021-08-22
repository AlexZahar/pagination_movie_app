import React, { useState, useEffect } from "react";
import { IState as Props } from "./HomePage";
interface IProps {
  pagination: Props["pagination"];
  activePage: Props["activePage"];
  setActivePage: React.Dispatch<React.SetStateAction<IProps["activePage"]>>;
  handleNewPage: (page: string) => void;
}

const Pagination: React.FC<IProps> = ({
  pagination,
  activePage,
  setActivePage,
  handleNewPage,
}) => {
  const [currentPage, setCurrentPage] = useState("1");

  useEffect(() => {
    console.log("moving to page number:", currentPage);
  }, [currentPage]);

  const renderPagination = () => {
    return pagination.map((page) => {
      return (
        <div
          key={page}
          onClick={() => {
            // setPageIndex(pagination.indexOf(page));
            // console.log(currentPageIndex, "current page index");
            setCurrentPage(page);
            handleNewPage(page);
          }}
        >
          {page}
        </div>
      );
    });
  };
  const handleNextPage = () => {
    //   Prevent counter from going higher than the length of the array
    if (parseInt(currentPage) === pagination.length) {
      return;
    }
    const nextPage = (parseInt(currentPage) + 1).toString();
    setCurrentPage(nextPage);
    handleNewPage(nextPage);
    console.log(nextPage, "nextpage");
  };

  const handlePrevPage = () => {
    //   Prevent counter from going negative
    if (parseInt(currentPage) === 0) {
      return;
    }
    const prevPage = (parseInt(currentPage) - 1).toString();
    setCurrentPage(prevPage);
    handleNewPage(prevPage);
    console.log(prevPage, "nextpage");
  };
  return (
    <div className="PaginationParrent">
      <button
        disabled={currentPage === pagination[0]}
        onClick={() => {
          setCurrentPage(pagination[0]);
          handleNewPage(pagination[0]);
        }}
      >
        First Page
      </button>
      <div className="PaginationChildWrapper">
        <button
          disabled={currentPage === pagination[0]}
          onClick={() => handlePrevPage()}
        >
          {" "}
          &#8592;{" "}
        </button>
        <div>{renderPagination()}</div>
        <button
          disabled={currentPage === pagination[pagination.length - 1]}
          onClick={() => handleNextPage()}
        >
          &#8594;
        </button>
      </div>
      <button
        disabled={currentPage === pagination[pagination.length - 1]}
        onClick={() => {
          console.log("LENGHT -1", pagination[pagination.length - 1]);
          setCurrentPage(pagination[pagination.length - 1]);
          handleNewPage(pagination[pagination.length - 1]);
        }}
      >
        Last Page
      </button>
    </div>
  );
};

export default Pagination;
