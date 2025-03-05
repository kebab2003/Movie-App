import MovieCard from '../MovieCard';
import { Row } from 'antd';

function MovieList({ movies, getMovieRated }) {
  return (
    <Row style={{ margin: '0 18px' }}>
      {movies.map((movie, index) => (
        <MovieCard getMovieRated={getMovieRated} key={movie.id || `movie-${index}`} movie={movie} />
      ))}
    </Row>
  );
}

export default MovieList;
