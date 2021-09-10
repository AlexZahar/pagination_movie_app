import styled from "styled-components";
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  lazy,
  Suspense,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Pagination from "./Pagination";

// import List from "./List";
const List = React.lazy(() => import("./List"));

function hashTitle(title: string) {
  // very expesove to compute
  // jwso web token, base64
}

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
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [movieTitle, setMovieTitle] = useState("Alex");
  const [pagination, setPagination] = useState<IState["pagination"]>([]);
  const [activePage, setActivePage] = useState<IState["activePage"]>("");

  // Fetching a list of movies for test

  async function fetchMovieList(title: string) {
    setIsError(false);

    console.log(movieTitle, "Fetch function");
    await fetch(`${apiUrl}&s=${title}`)
      // await fetch(`${apiUrl}&s=${title}&page=${page}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("something went wrong while requesting posts");
      })
      .then((data) => {
        if (data.Error) {
          setError(data.Error);
          setIsError(true);
          return;
        }
        console.log(data);
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
        // }

        setLoading(false);
      })
      .catch((error) => console.log(error));
  }
  // Perfromance
  // CDN --> Reduce the TFB, Compression (80% less size for assets)
  // Optimizing the APP / JS
  // 1. Memoization --> avoid recomputing / redlecaring functions / values on render

  // Wil be instanciated, parsed, declard on every render
  function test() {
    return movieTitle;
  }
  // Memoize Functions
  /*
  useCallback will return a memoized version of the callback that only 
  changes if one of the dependencies has changed. This is useful when passing 
  callbacks to optimized child components that rely on reference equality 
  to prevent unnecessary renders (e.g. shouldComponentUpdate).
  */
  const memoTest = useCallback(
    function test() {
      return movieTitle;
    },
    [movieTitle]
  ); // this function wills stay the same, unless movieTitle changes

  // Non optimized -- will run on every render
  const value = hashTitle(movieTitle);
  // Docs example
  const memoizedValue = useMemo(() => hashTitle(movieTitle), [movieTitle]);
  // Observer
  // https://refactoring.guru/design-patterns/observer
  // 1. Problem --> 2. Pattern --> 3. Implementation

  // 2. Assets Optimization
  // 2.1 Size --> Compression, Minification(Uglify), Tree shaking(Dependency Tree -- Dead Code)
  // 2.2 Priority -- Critical Assets --> Push some assest to be loaded afer the initial load

  const handleGetMoviesOnThePage = async (title: string, page: string) => {
    await fetch(`${apiUrl}&s=${title}&page=${page}`)
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

        // }

        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchMovieList(movieTitle);
    handleNewPage(activePage);
  }, [activePage]);

  // Saving the user input movie title into it's own state
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitle(e.target.value);
  };

  const handleNewPage = (page: string) => {
    setActivePage(page);

    if (page === activePage) {
      console.log("already on the page number:", page);
      return;
    }
    //  useMemo(
    //   () => handleGetMoviesOnThePage(movieTitle, page),
    //   [movieTitle, page]
    // );

    handleGetMoviesOnThePage(movieTitle, page);
    // setMovieTitle(movieTitle);
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
        <Suspense fallback={<div>Loading data ....</div>}>
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
        </Suspense>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}
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
export default HomePage;
