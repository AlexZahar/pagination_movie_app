/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import List from "./List";
import Pagination from "./Pagination";

const apiUrl = "http://www.omdbapi.com/?apikey=2827a2ec";
// http://www.omdbapi.com/?i=tt3896198&apikey=2827a2ec

export interface IState {
  movies: {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
  }[];
  pagination: string[];
  activePage: string;
}

function HomePage() {
  const [movies, setMovies] = useState<IState["movies"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [pagination, setPagination] = useState<IState["pagination"]>([]);
  const [activePage, setActivePage] = useState<IState["activePage"]>("");
  // Fetching a list of movies for test

  async function fetchMovieList(title: string, page?: string) {
    await fetch(`${apiUrl}&s=${title}&page=${activePage}`)
      // await fetch(`${apiUrl}&s=${title}&page=${page}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("something went wrong while requesting posts");
      })
      .then((data) => {
        if (data.Error) {
          setError(data.Error);
          return;
        }
        // Populate the movie list array
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
        // }
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    console.log("changed");
    fetchMovieList(movieTitle, activePage);
  }, [activePage]);

  // Saving the user input movie title into it's own state
  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitle(e.target.value);
  };

  const handleNewPage = (page: string) => {
    setActivePage(page);
  };
  return (
    <div>
      <div>
        <input
          type="text"
          value={movieTitle}
          placeholder="Search your title"
          onChange={handleTitleChange}
        />
        <button onClick={() => fetchMovieList(movieTitle)}>Search Title</button>
      </div>
      {!loading ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Release Year</th>
              </tr>
            </thead>

            <List movies={movies}> </List>
          </table>
          <Pagination
            pagination={pagination}
            activePage={activePage}
            setActivePage={setActivePage}
            handleNewPage={handleNewPage}
          ></Pagination>
        </div>
      ) : (
        <h2>Choose a movie title</h2>
      )}
    </div>
  );
}

export default HomePage;
