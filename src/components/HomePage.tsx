/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import List from "./List";

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
}

function HomePage() {
  const [movies, setMovies] = useState<IState["movies"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movieTitle, setMovieTitle] = useState("Mamba");
  const [pagination, setPagination] = useState([""]);

  // Fetching a list of movies for test
  async function fetchMovieList(title?: string, page?: Array<string>) {
    // if (!title || !page) {
    //   title = movieTitle;
    //   page = pagination;
    // }
    await fetch(`${apiUrl}&s=${title}`)
      // await fetch(`${apiUrl}&s=${title}&page=${page}`)
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
        throw new Error("something went wrong while requesting posts");
      })
      .then((data) => {
        console.log("data", data);
        if (data.Error) {
          setError(data.Error);
          return;
        }
        setMovies(data.Search);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchMovieList(movieTitle, pagination);
  }, []);

  // Saving the user input movie title into it's own state
  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitle(e.target.value);
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
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Year</th>
            </tr>
          </thead>

          <List movies={movies}> </List>
        </table>
      ) : (
        <h2>Error: {error}</h2>
      )}
    </div>
  );
}

export default HomePage;
