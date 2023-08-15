import { useState, useEffect } from 'react';
import { Button, Card, Container} from 'react-bootstrap';

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  function handleTop() {
    setShowInfo(true);
    fetchtopAnime();
  }

  useEffect(() => {
    setShowInfo(false);
    fetchtopAnime();
  }, []);

  const fetchtopAnime = () => {
    const topApi =
      'https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=24';
    fetch(topApi)
      .then(response => response.json())
      .then(data => {
        setTopAnime(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <div className='d-flex justify-content-center mt-3'>
        <Button
          variant='success'
          onClick={handleTop}
        >
          Top Anime
        </Button>
      </div>
      {showInfo && topAnime.length > 0 && (
        <Container className='d-flex flex-wrap justify-content-center gap-4 md-4 mt-4'>
          {topAnime.map((anime, index) => (
            <Card key={index} style={{ color: 'white', width: '12rem',}}>
              <Card.Img style={{ height: '18rem', objectFit: 'cover' }} variant='top' src={anime.images.jpg.image_url} />
              <Card.Body>
                <Card.Title>{anime.title_english}</Card.Title>
                <Card.Text>Episodes: {anime.episodes ?? anime.status}</Card.Text>
                <Card.Text>Score: {anime.score}</Card.Text>
                <Card.Text>Popularity: {anime.popularity}</Card.Text>
                <a href={anime.url}>Link ⬅️</a>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </div>
  );
};

export default TopAnime;