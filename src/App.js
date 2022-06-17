import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]); //movie getting state
  const [isLoading, setIsLoading] = useState(false); //Loading state
  const [error, setError] = useState(null); //Error state to handle error response from server such as 401, 403

  async function fecthMoviesHandler() {
    setIsLoading(true);
    setError(null); //clear previos errors from the previous request
    try {
      const response = await fetch("https://swapi.dev/api/film/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      //Transforming the movie data to an object using map function to access values within the Item of results array which is being passed as props to the list of movie
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fecthMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no Movies.</p>}
        {isLoading && <p>Loading... Please wait!</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
