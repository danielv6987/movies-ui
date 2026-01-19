import { useEffect, useState } from 'react';

const App = () => {
  const [movies, setMovies] = useState([]);
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const apiVersion = import.meta.env.VITE_API_VERSION;

  const getMovies = async () => {

    const response = await fetch('https://api.trakt.tv/movies/popular',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'trakt-api-key': clientId,
          'trakt-api-version': apiVersion,
        }
      });
    const data = await response.json();
    console.log(data);
    setMovies(data);
  }

  useEffect(() => {
  getMovies()
  }, []);

  return (
    <>
      {movies.length > 0 && movies.map((movie:any) => {
        console.log("movie", movie)
        return(
          <div key={movie.title}>
            <div>{movie.title}</div>
            <div>testing</div>
            {movie.images && movie.images.thumb.length > 0 && <img src={`https://${movie.images.thumb[0]}`} alt={movie.title} />}
          </div>
        )
      })}
    </>
  );
}

export default App;
