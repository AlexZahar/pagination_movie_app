import React, { useState, useEffect } from "react";
import { IState as Props } from "./HomePage";
import styled from "styled-components";
import { Button } from "./HomePage";

const PaginationWrapper = styled.div`
  /* max-width: 600px; */
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const PaginationChildrenWrapper = styled.div`
  max-width: 380px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: auto;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  .active_page {
    font-size: 22px;
    color: rgb(37, 136, 78);
    font-weight: bolder;
  }
`;
const ChildPage = styled.div`
  font-size: 22px;
  /* color: gray; */
  margin: 0 8px;
  width: 12px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;
interface IProps {
  pagination: Props["pagination"];
  activePage: Props["activePage"];
  setActivePage: React.Dispatch<React.SetStateAction<IProps["activePage"]>>;
  handleNewPage: (page: string) => void;
}

const Pagination: React.FC<IProps> = ({ pagination, handleNewPage }) => {
  const [currentPage, setCurrentPage] = useState("1");
  const [activePageIndex, setActivePageIndex] = useState(pagination[0]);
  useEffect(() => {
    console.log("moving to page number:", currentPage);
  }, [currentPage]);

  //   Handle the active page state to highlight the current active page
  const handleActivePage = (page: string) => {
    setActivePageIndex(page);
  };

  const renderPagination = () => {
    return pagination.map((page) => {
      return (
        <ChildPage
          key={page}
          onClick={() => {
            setCurrentPage(page);
            handleNewPage(page);
            handleActivePage(page);
          }}
          data-cy="pagination-children"
          className={page === activePageIndex ? "active_page" : ""}
        >
          <p>{page} </p>
        </ChildPage>
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
    handleActivePage(nextPage);
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
    handleActivePage(prevPage);
    console.log(prevPage, "nextpage");
  };
  return (
    <PaginationWrapper className="PaginationParrent">
      <Button
        disabled={currentPage === pagination[0]}
        onClick={() => {
          setCurrentPage(pagination[0]);
          handleNewPage(pagination[0]);
          handleActivePage(pagination[0]);
        }}
        data-cy="btn-first-page"
      >
        First
      </Button>
      <PaginationChildrenWrapper className="PaginationChildWrapper">
        <Button
          disabled={currentPage === pagination[0]}
          onClick={() => handlePrevPage()}
          data-cy="btn-previous-page"
        >
          &#8592;
        </Button>
        {renderPagination()}
        <Button
          disabled={currentPage === pagination[pagination.length - 1]}
          onClick={() => handleNextPage()}
          data-cy="btn-next-page"
        >
          &#8594;
        </Button>
      </PaginationChildrenWrapper>
      <Button
        disabled={currentPage === pagination[pagination.length - 1]}
        onClick={() => {
          console.log("LENGHT -1", pagination[pagination.length - 1]);
          setCurrentPage(pagination[pagination.length - 1]);
          handleNewPage(pagination[pagination.length - 1]);
          handleActivePage(pagination[pagination.length - 1]);
        }}
        data-cy="btn-last-page"
      >
        Last
      </Button>
    </PaginationWrapper>
  );
};

export default Pagination;
