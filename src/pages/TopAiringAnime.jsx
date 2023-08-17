import { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const TopAiringAnime = () => {
  const [TopAirAnime, setTopAirAnime] = useState([]);

  useEffect(() => {
    fetchTopAirAnime();
  }, []);

  const fetchTopAirAnime = () => {
    const topApi = "https://api.jikan.moe/v4/seasons/now?limit=25";
    fetch(topApi)
      .then((response) => response.json())
      .then((data) => {
        setTopAirAnime(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      {TopAirAnime.length > 0 && (
        <Container className='d-flex flex-wrap justify-content-center gap-4 md-4 mt-4'>
          {TopAirAnime.map(anime => (
            <Card key={anime.mal_id} style={{ color: 'white', width: '12rem' }}>

                <Card.Img
                  style={{ height: '18rem', objectFit: 'cover' }}
                  variant='top'
                  src={anime.images.jpg.image_url}
                />
                <Card.Body>
                  <Card.Title>{anime.title_english}</Card.Title>
                  <Card.Text>Episodes: {anime.episodes ?? anime.status}</Card.Text>
                  <Card.Text>Score: {anime.score}</Card.Text>
                  <Card.Text>Popularity: {anime.popularity}</Card.Text>
                  <Link to={`/anime/${anime.mal_id}`}>Link ⬅️
              </Link>
                  {/* <a href={anime.url}>Link ⬅️</a> */}
                </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </div>
  );
};

export default TopAiringAnime;

//https://api.jikan.moe/v4/seasons/now
