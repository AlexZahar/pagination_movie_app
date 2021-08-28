import React from "react";
import { IState as Props } from "./HomePage";
// import styled from "styled-components";

// const TableRow = styled.tr`
//   font-size: 50px;
//   td {
//     color: red;
//   }
// `;

interface IProps {
  movies: Props["movies"];
}

const ListItem = ({movie}) => (
  <tr key={movie.imdbID}>
    <td>{movie.Title}</td>
    <td>{movie.Year}</td>
  </tr>
)

const List: React.FC<IProps> = ({ movies }) => {
  return <tbody>{movies.map((movie) => <ListItem movie={movie}/>)}</tbody>;
};

export default List;
