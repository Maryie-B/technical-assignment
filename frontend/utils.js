// const API_KEY = import.meta.env.VITE_APY_KEY;

const token = import.meta.env.VITE_API_ACCESS_TOKEN;
const port = import.meta.env.VITE_PORT;

export const customFetch = async (url) => {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${url}`, options);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      return data; 
  } catch (error) {
      console.error("Fetching error: ", error.message);
      return null; 
  }
}


export const slugify = (title) => {
  title = title.replace(/^\s+|\s+$/g, '');
  title = title.toLowerCase(); 
  title = title.replace(/[^a-z0-9 -]/g, '')
           .replace(/\s+/g, '-') 
           .replace(/-+/g, '-'); 
           return title;
}


export const getFavouriteMovies = async () => {
  const token = localStorage.getItem('token');
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
      },
  };

  try {
      const response = await fetch(`http://127.0.0.1:${port}/favourites`, options);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json(); 
      return data;
          
  } catch (error) {
     console.log(error);

  }
};


export const handleRemoveFromFavourites = async (movieID, updateMoviesCallback) => {
  const token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
    };
    try {
      const response = await fetch(`http://127.0.0.1:${port}/favourites/${movieID}`, options);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const updatedMovies = await getFavouriteMovies(); 
      updateMoviesCallback(updatedMovies); 
          
    } catch (error) {
       console.error(error);
    }
}


export const handleAddFavourites = async (movie, setIsFavouriteCallback, onError) => {
  const token = localStorage.getItem('token');
  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ movie }), 
  };

  try {
    const response = await fetch(`http://127.0.0.1:${port}/favourites`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    setIsFavouriteCallback(true);
  } catch (err) {
    console.error(err);
    if (onError) {
      onError(err);
    }
  }
};
