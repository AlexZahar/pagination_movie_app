import React from "react";
import { IState as IProps } from "./HomePage";

const List: React.FC<IProps> = ({ movies }) => {
  const renderList = (): JSX.Element[] => {
    return movies.map((movie) => {
      return (
        <tr key={movie.imdbID}>
          <td>{movie.Title}</td>
          <td>{movie.Year}</td>
        </tr>
      );
    });
  };

  return <tbody>{renderList()}</tbody>;
};

export default List;
