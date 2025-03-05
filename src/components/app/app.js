import Header from '../Header';
import MovieList from '../MovieList';
import { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { Spin, Pagination, message } from 'antd';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movieRated, setMovieRated] = useState([]);

  const getMovieRated = (value, data) => {
    setMovieRated((oldData) => {
      const getNewData = (movieData) => {
        let flag = false;
        movieData.map((movie) => {
          if (movie.id === data.id) {
            flag = true;
            movie.rated = value;
          }
          return movie;
        });
        if (flag) {
          return [...movieData];
        }
        return [...movieData, { ...data, rated: value }];
      };
      const newData = getNewData(oldData);
      localStorage.setItem('movie', JSON.stringify(newData));
      return newData;
    });
  };

  const getTopRatedMovies = async (page = 1) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmUzMWUxMzMxNDQzYThmZjU1YTEyMWU0YmEyYTJhNCIsIm5iZiI6MTczNzE3NzA1OS41ODA5OTk5LCJzdWIiOiI2NzhiMzdlM2QwOTRlYTdhZjE0MmY4NWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.J2LQVV7JB6byxMAVQwDgfBBWviWPXbniBy08PabA7Fw',
      },
    };
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Ошибка при запросе к API');
      }
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      message.error('Ошибка при запросе к API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = useCallback(async (searchQuery, page = 1) => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    const apiKey = '8fe31e1331443a8ff55a121e4ba2a2a4';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Ошибка при запросе к API');
      }
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      message.error('Ошибка при запросе к API:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery, page) => {
        searchMovies(searchQuery, page);
      }, 1000),
    [searchMovies]
  );

  useEffect(() => {
    if (!query) {
      getTopRatedMovies(currentPage);
    } else {
      debouncedSearch(query, currentPage);
    }
  }, [query, currentPage, debouncedSearch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    debouncedSearch(query, 1);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  let content;

  if (isLoading) {
    content = <Spin size="large" style={{ marginTop: '20px' }} />;
  } else if (movies.length === 0) {
    content = <p style={{ textAlign: 'center', marginTop: '20px' }}>Ничего не найдено</p>;
  } else {
    content = (
      <>
        <MovieList movies={movies} getMovieRated={getMovieRated} movieRated={movieRated} />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Pagination
            current={currentPage}
            total={totalPages * 20}
            pageSize={20}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Header query={query} onSubmit={handleSubmit} onChange={handleInputChange} />
      {content}
    </>
  );
}

export default App;
