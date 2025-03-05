import MovieCard from '../MovieCard';
import { useEffect, useState } from 'react';
import { Row } from 'antd';

function TopRated(currentTab) {
  const [ratedMovie, SetRatedMovie] = useState([]);
  useEffect(() => {
    SetRatedMovie(JSON.parse(localStorage.getItem('movie')));
  }, [currentTab]);
  return (
    <Row gutter={[16, 16]}>
      {ratedMovie ? (
        <>
          {ratedMovie.map((movie, index) => (
            <MovieCard currentTab={currentTab} key={movie.id || `movie-${index}`} movie={movie} />
          ))}
        </>
      ) : null}
    </Row>
  );
}

export default TopRated;
