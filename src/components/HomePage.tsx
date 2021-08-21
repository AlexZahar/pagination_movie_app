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

  // Fetching a list of movies for test
  async function fetchMovieList() {
    await fetch(`${apiUrl}&s=batman&page=99`)
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
    fetchMovieList();
  }, []);

  return (
    <div>
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
