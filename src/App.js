import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// uses api key from  omdbapi
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=315af659";




const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // calls our api key to fetch the movie
  // async means the data isnt readily available
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    // return data.results;
  };
  useEffect(() => {
    searchMovies("Venom");
  }, []);

  return (
    <div className="app">
      <h1> Movieland</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          // changes the input to whatever is typed by the user
          onChange={(e) => {setSearchTerm(e.target.value)}}
        />
        {/* makes the search icon work */}
        <img src={SearchIcon} alt="search" onClick={()=> searchMovies(searchTerm) }/>
      </div>

{/* checks if a movie is available. i.e. at least one array item is available at movies,SetMovies */}
      {movies?.length > 0 ? (
        <div className="container">
          {/* maps the each movie and passes it to the MovieCard component */}
          {movies.map((movie) => (
            <MovieCard  movie={movie} />
          ))}
        </div>
      ) : (
        // shows this instead if the array is empty
        <div className="empty">
          <h1>No movies found.</h1>
        </div>
      )}
    </div>
  );
};

export default App;
