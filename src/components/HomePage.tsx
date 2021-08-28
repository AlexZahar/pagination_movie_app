import styled from "styled-components";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import List from "./List";
import Pagination from "./Pagination";

// SOLID Principles
const apiUrl = "http://www.omdbapi.com/?apikey=2827a2ec";
// http://www.omdbapi.com/?i=tt3896198&apikey=2827a2ec

export interface IMovie{
   //try to use better names since it can be confused
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export interface IState {
  movies: IMovie[];
  pagination: string[];
  activePage: string;
}

function HomePage() {
  // As little as possible, as much as necesary
  const [movies, setMovies] = useState<IState["movies"]>([]); // YES
  const [loading, setLoading] = useState(true); // YES
  const [isError, setIsError] = useState(false); // YES
  const [error, setError] = useState(""); // YES
  const [movieTitle, setMovieTitle] = useState(""); // SearchTerm

  const [pagination, setPagination] = useState<IState["pagination"]>([]);// YES --Y as a single number totalPage
  const [activePage, setActivePage] = useState<number>(0);// YES

  // Fetching a list of movies for test
  async function fetchMovieList() {
    setIsError(false);

    const response = await fetch(`${apiUrl}&s=${movieTitle}&page=${activePage}`);
    const data = await response.json();

    if (data.Error) {
      setError(data.Error);
      setIsError(true);
      return;
    }

    // Populate the movie list array
    setPagination(["0"]);
    setMovies(data.Search);

    // Calculate the number of pages available for this title only if not calculated before.
    // if (!pagination.length) {
    console.log("calculating pagination");

    //  Using Math.ceil() to round pages number up to the next largest integer.
    const totalPages = Math.ceil(parseInt(data.totalResults) / 10);
    const pages = [];
    for (let p = 1; p <= totalPages; p++) {
      pages.push(p.toString());
    }
    setPagination(pages);

    setLoading(false);

  }

  useEffect(() => {
    // handleNewPage(activePage);
    fetchMovieList()
  }, [activePage]);

  // Saving the user input movie title into it's own state
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitle(e.target.value);
  };

  return (
    <div>
      <SearchWrapper>
        <input
          data-testid="search-input"
          data-cy="input-movie-title"
          type="text"
          value={movieTitle}
          placeholder="Search your title"
          onChange={handleTitleChange}
        />
        <Button
          onClick={() => {
            fetchMovieList(movieTitle);
          }}
          data-cy="btn-search-title"
          data-testid="btn-search-title"
        >
          Search
        </Button>
      </SearchWrapper>
      {!loading && !isError ? (
        <TableWrapper>
          <Table data-testid="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Release Year</th>
              </tr>
            </thead>

            <List movies={movies}> </List>
          </Table>
          {pagination.length > 1 ? (
            <Pagination
              pagination={pagination}
              activePage={activePage}
              setActivePage={setActivePage}
              handleNewPage={handleNewPage}
            />
          ) : null}
        </TableWrapper>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default HomePage;


const SearchWrapper = styled.div`
  margin-top: 40px;
  input {
    font-size: 20px;
  }
`;

const TableWrapper = styled.div`
  display: flex;
  max-width: 600px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin: 40px auto;
`;

export const Button = styled.button`
  background: transparent;
  border-radius: 8px;
  border: 2px solid #04aa6d;
  color: #04aa6d;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 16px;
  /* max-width: 100px;
  width: 100%; */
  :disabled {
    color: red;
  }

  :hover {
    cursor: pointer;
    color: white;
    background: #04aa6d;
    /* font-weight: bolder; */
  }
  :disabled {
    color: gray;
    border: 2px solid gray;
    :hover {
      border: 2px solid gray;
      color: gray;
      background-color: white;
      cursor: not-allowed;
    }
  }
`;

const Table = styled.table`
  font-size: 20px;
  margin-bottom: 40px;
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr {
    height: 80px;
  }
  tr:nth-child(even) {
    background-color: #dbdbdb67;
  }
  tr:hover {
    background-color: #64d4abca;
    /* color: white; */
  }
`;
