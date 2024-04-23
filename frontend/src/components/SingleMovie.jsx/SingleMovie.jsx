/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import './SingleMovie.scss'
import { customFetch, handleRemoveFromFavourites, getFavouriteMovies, handleAddFavourites } from "../../../utils";
import Loader from "../loader/Loader";

const SingleMovie = () => {
    const [movie, setMovie] = useState(null);
    const id = useParams().id;
    const navigate = useNavigate();
    const [isFavourite, setIsFavourite] = useState(false);
    const [_, setFavouriteMovies] = useState([]);

    // fetches the details for the current movie:
    const fetchDetails = async () => { 
      try {
        const response = await customFetch(`/movie/${id}?language=en-US`);
        setMovie(response);
      } catch (error) {
        console.log(error);
      }
    }
    

    // fetches the movie details from the API on load,
    // gets the favourite movies list from the DB for the currently logged in user,
    // checks if the current movie is in the favourite movie list and sets isFavourite appropriately
    useEffect(() => {
      fetchDetails();
      const fetchMovies = async () => {
        try {
          const movies = await getFavouriteMovies(); 
          setFavouriteMovies(movies); 
          const isFav = movies.some(movie => movie.movie.id === parseInt(id));
          setIsFavourite(isFav);
        } catch (error) {
          console.error('Failed to fetch movies:', error);
        }
      };
      fetchMovies();
    }, [id]);


    // adss the current movie to the favourite list
    const handleAddToFavourites = (movie) => {
      handleAddFavourites(movie, setIsFavourite);
      setIsFavourite(true);
    };


    // removes the current movie from the favourite list
    const handleRemove = (id) => {
      handleRemoveFromFavourites(id, setFavouriteMovies);
      setIsFavourite(false);
    }


    return (
      <>
      {movie ? 
        <div className="movie">
          <button onClick={() => navigate('/')}>Back to Search!</button>
          <h1>{movie.title}</h1>
          <p>{movie.vote_average?.toFixed(1) ?? 'N/A'} / 10</p>
          <p>{movie.overview}</p>
          <h2>{movie.tagline}</h2>
          <div className="container">
          < img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="" />
          </div>
          <button onClick={isFavourite ? () => handleRemove(movie.id) : () => handleAddToFavourites(movie)}>
            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </button>
          <p>Release date: {movie.release_date}</p>
          <p>Number of votes: {movie.vote_count}</p>
          <p>Genres: 
          {movie.genres.map((g, index) => (
            <span key={g.id}>
               {` ${g.name}`}{index < movie.genres.length - 1 ? ',' : ''}
            </span>
          ))}
          </p>
        </div>
        :
        <Loader />
      }
      </>
    )
}

export default SingleMovie
