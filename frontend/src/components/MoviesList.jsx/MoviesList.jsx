import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './MoviesList.scss'
import { customFetch, slugify } from '../../../utils';
import Loader from '../loader/Loader';
import Pagination from '../pagination/Pagination';


const MoviesList = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('')
  const [data, setData] = useState();
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);


  // fecthInitialData fetches a list of movies:
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await customFetch(`/discover/movie?language=en-US&page=${page}`)
        setData(response.results);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
     fetchInitialData();
  }, []);


  // this useEffect makes different API calls based on the state of the 'query' variable to handle the search bar dynamically
  // and update the 'page' variable so that every new search starts on page 1
  useEffect(() => {
      const searchMovie = async () => {
        if (query.trim()) {
          const response = await customFetch(`/search/movie?language=en-US&query=${query}&page=${page}`);
          setData(response.results);
          setTotalPages(response.total_pages);
          setPage(1);
        } else if (query === '') {
          setPage(1);
          const response = await customFetch(`/discover/movie?language=en-US&page=${page}`)
          setData(response.results);
          setTotalPages(response.total_pages);
        } 
    }
    searchMovie();
  }, [query]);

  // handleNextPage and handlePreviousPage handle pagination functionality:
  const handleNextPage = async () => {
    if (page < totalPages) {
      const pageNr = page + 1;
      setPage(pageNr);
  
      try {
        const response = await customFetch(`/discover/movie?language=en-US&page=${pageNr}`)
        setData(response.results);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePreviousPage = async () => {
    if (page !== 1) {
      const pageNr = page - 1;
      setPage(pageNr)

      try {
        const response = await customFetch(`/discover/movie?language=en-US&page=${pageNr}`)
        setData(response.results);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // this function handles navigation to the detailed movie route and
  // creates a dynamic url with the id and by slugifying the movie title:
  const handleDetailsClick = (e) => {
    const info = JSON.parse(e.currentTarget.getAttribute('data-info'));
    const id = info.id;
    const name = info.name;
    navigate(`/${id}/${slugify(name)}`)
  };

  return (
    <div>
      <div className="search">
        <input id="search-bar" type="text" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} />
      </div>
      <div>
        <Pagination totalPages={totalPages} page={page} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
      {data ? 
      <div className="movie-grid">
        {data && data.map((movie) => {
          return (
            <div key={movie.id} className="single-movie">
              <div className="img-container">
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} data-info={JSON.stringify({ name: movie.title, id: movie.id })} onClick={handleDetailsClick} />
              </div>
              <div className="text-container">
                <h2>{movie.title}</h2>
                <p>Rating: {movie.vote_average?.toFixed(1) ?? 'N/A'} / 10</p>
              </div>
            </div>
          );
        })} 
      </div>
      
      :
      <Loader />
      }

      </div>
    </div>
  )
}

export default MoviesList
