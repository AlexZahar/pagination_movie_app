import React from "react";
import { IState as Props } from "./HomePage";
interface IProps {
  pagination: Props["pagination"];
  activePage: Props["activePage"];
  setActivePage: React.Dispatch<React.SetStateAction<IProps["activePage"]>>;
}
// function Pagination({ pagination }) {
//   return <div className="PaginationWrapper">{pagination}</div>;
// }

const Pagination: React.FC<IProps> = ({
  pagination,
  activePage,
  setActivePage,
}) => {
  function handlePageClick(index: string): void {
    console.log("picked page", index);
    setActivePage(index);
    console.log("active page", activePage);
  }

  const renderPagination = () => {
    return pagination.map((page) => {
      return (
        <div
          key={page}
          onClick={() => {
            handlePageClick(page);
          }}
        >
          {page}
        </div>
      );
    });
  };
  return (
    <div>
      <div>{renderPagination()}</div>
    </div>
  );
};

export default Pagination;
