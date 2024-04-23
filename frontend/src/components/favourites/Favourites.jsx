import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { slugify, getFavouriteMovies, handleRemoveFromFavourites } from "../../../utils";
import '../home/Home.scss'
import './Favourites.scss'

const Favourites = () => {
    const [movies, setMovies] = useState(null);
    const navigate = useNavigate();

  // fetchs the favourtie movies from the DB on initial load:
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const movies = await getFavouriteMovies(); 
          setMovies(movies); 
        } catch (error) {
          console.error('Failed to fetch movies:', error);
        }
      };
    
      fetchMovies();
    }, []);

    // Redirects the user to the detailed movie page:
    const handleDetailsClick = (e) => {
        const info = JSON.parse(e.currentTarget.getAttribute('data-info'));
        const id = info.id;
        const name = info.name;
        navigate(`/${id}/${slugify(name)}`)
    };

    const removeFromFavourites = (movieID) => {
      handleRemoveFromFavourites(movieID, setMovies);
    };

  return (
    <div className="movie-grid">
      {movies && movies.map((movie) => {
         return (
            <div key={movie.movie.id} className="single-movie">
              <div className="img-container" data-info={JSON.stringify({ name: movie.movie.title, id: movie.movie.id })} onClick={handleDetailsClick}>
                <img src={`https://image.tmdb.org/t/p/original/${movie.movie.poster_path}`} alt={movie.movie.title} />
              </div>
              <div className="text-container">
                <h2>{movie.movie.title}</h2>
                <p>{movie.movie.vote_average?.toFixed(1) ?? 'N/A'} / 10</p>
                <button className="remove-btn" onClick={() => removeFromFavourites(movie.movie.id)}>Remove from Favourites</button>
              </div>
            </div>
          );
      })};
    </div>
  )
}

export default Favourites
