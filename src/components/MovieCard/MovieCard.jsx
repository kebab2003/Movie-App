import { GenresContext } from '../Genres/Genres';
import { Card, Row, Col, Rate } from 'antd';

import { useContext } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './MovieCard.css';

const getColor = (points) => {
  if (points > 7) {
    return '#66E900';
  }
  if (points < 7 && points > 5) {
    return '#E9D100';
  }
  if (points >= 3 && points < 5) {
    return '#E97E00';
  }
  return '#E90000';
};

function MovieCard({ movie, getMovieRated, currentTab }) {
  const { genres, loading, error } = useContext(GenresContext);

  if (loading) return <div>Загрузка жанров...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ padding: '18px', boxSizing: 'border-box' }}>
      <Card
        hoverable
        style={{ width: '100%', margin: 0, overflow: 'hidden' }}
        // bodyStyle={{ padding: 12 }}
      >
        <Row gutter={16}>
          {/*  картинка */}
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <img
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4,
              }}
            />
          </Col>

          {/* правая колонка */}
          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* заголовок */}
              <h3 style={{ marginBottom: 8 }}>{movie.title}</h3>
              <span
                style={{
                  margin: '2px 2px 10px',
                  color: '#827E7E',
                }}
              >
                {/* дата */}
                {movie.release_date
                  ? format(new Date(movie.release_date), 'd MMMM yyyy', { locale: ru })
                  : 'Дата релиза неизвестна'}
              </span>

              {/* жанры */}
              <div style={{ marginBottom: 12, flexWrap: 'wrap' }}>
                {movie.genre_ids?.map((genreId) => (
                  <span
                    key={genreId}
                    style={{
                      display: 'inline-block',
                      margin: '2px',
                      padding: '4px 8px',
                      background: '#f0f0f0',
                      borderRadius: '4px',
                      fontSize: 12,
                    }}
                  >
                    {genres[genreId] || 'Unknown Genre'}
                  </span>
                ))}
              </div>
              <div style={{ borderColor: `${getColor(movie.vote_average)}` }} className="vote_average">
                <div>{Math.round(movie.vote_average * 10) / 10}</div>
              </div>

              {/* описание */}
              <div
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                  marginBottom: 12,
                  fontSize: 14,
                }}
              >
                {movie.overview.split(' ').splice(0, 30).join(' ')}...
              </div>

              {/* рейтинг */}
              <div style={{ marginTop: 'auto' }}>
                {currentTab?.currentTab ? (
                  <Rate count={10} allowHalf value={movie.rated ?? 0} disabled />
                ) : (
                  <Rate
                    onChange={(value) => getMovieRated(value, movie)}
                    count={10}
                    allowHalf
                    defaultValue={movie.rated ?? 0}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

export default MovieCard;
