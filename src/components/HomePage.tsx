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

  // Fetching a list of movies for test
  async function fetchMovieList() {
    const response = await fetch(`${apiUrl}&s=batman&page=5`);
    const data = await response.json();
    setMovies(data.Search);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovieList();
    console.log("useEffect", movies);
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
        <p>Waiting for data to be fetched...</p>
      )}
    </div>
  );
}

export default HomePage;
