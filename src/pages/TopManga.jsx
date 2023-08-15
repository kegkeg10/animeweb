import { useState, useEffect } from 'react';
import { Button, Card, Container} from 'react-bootstrap';

const TopManga = () => {
  const [topManga, setTopManga] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  function handleTop() {
    setShowInfo(true);
    fetchTopManga();
  }

  useEffect(() => {
    setShowInfo(false);
    fetchTopManga();
  }, []);

  const fetchTopManga = () => {
    const topApi =
      'https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=24';
    fetch(topApi)
      .then(response => response.json())
      .then(data => {
        setTopManga(data.data);
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
          Top Manga
        </Button>
      </div>
      {showInfo && topManga.length > 0 && (
        <Container className='d-flex flex-wrap justify-content-center gap-4 md-4 mt-4'>
          {topManga.map((manga, index) => (
            <Card key={index} style={{ color: 'white', width: '12rem',}}>
              <Card.Img style={{ height: '18rem', objectFit: 'cover' }} variant='top' src={manga.images.jpg.image_url} />
              <Card.Body>
                <Card.Title>{manga.title_english}</Card.Title>
                <Card.Text>Volumes: {manga.volumes ?? manga.status}</Card.Text>
                <Card.Text>Score: {manga.score}</Card.Text>
                <Card.Text>Popularity: {manga.popularity}</Card.Text>
                <a href={manga.url}>Link ⬅️</a>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </div>
  );
};

export default TopManga;