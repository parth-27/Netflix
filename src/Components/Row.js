import React, { useState, useEffect } from "react";

import axios from "../axios"; // default import from our file axios.

import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {

	// we use react hooks for using state in functional components.


  // using react hooks.
  const [movies, setMovies] = useState([]);

  // pulling the information from api when the row loads.
  useEffect(() => {
    // if [](empty array) run once when the row loads and don't run it again.
    async function fetchData() {
      // the value of request will be https://api.themoviedb.org/3/fetchUrl
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();

    // when we use any variable in async which is outside of the block we have to include it in the brackets.
  }, [fetchUrl]);

  const opts = {
    height: "390",
    widht: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

	const [trailerUrl, setTrailerUrl] = useState('');
	
  const handleClick = (movie) => {
		// if video is already playing then close it
	  if (trailerUrl) {
		setTrailerUrl('');
	  } else
	  {
		  movieTrailer(movie?.name || "")
			  .then(url => {
				  const urlParams = new URLSearchParams(new URL(url).search);
				  setTrailerUrl(urlParams.get('v'));
			  })
			  .catch(err => console.error(err));  
		}
  };

	console.log(movies);
	
  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>

      <div className="row__posters">
        {/* Poster */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie?.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
