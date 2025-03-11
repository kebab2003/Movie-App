import { createContext, useState, useEffect, useMemo } from 'react';

export const GenresContext = createContext();

export function GenresProvider({ children }) {
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=8fe31e1331443a8ff55a121e4ba2a2a4'
        );
        const data = await response.json();

        const genresMap = data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setGenres(genresMap);
        localStorage.setItem('genres', JSON.stringify(genresMap));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const cachedGenres = localStorage.getItem('genres');
    if (cachedGenres) {
      setGenres(JSON.parse(cachedGenres));
      setLoading(false);
    } else {
      fetchGenres();
    }
  }, []);
  const value = useMemo(() => ({ genres, loading, error }), [genres, loading, error]);

  return <GenresContext.Provider value={value}>{children}</GenresContext.Provider>;
}
