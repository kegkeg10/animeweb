import { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const TopAiringAnime = () => {
  const [TopAirAnime, setTopAirAnime] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(1);
  console.log(setMaxPageLimit, setMinPageLimit);


  useEffect(() => {
    fetchTopAirAnime();
  }, [currentPage]);

  const fetchTopAirAnime = () => {
    const topApi = `https://api.jikan.moe/v4/seasons/now?limit=24&page=${currentPage}`;
    fetch(topApi)
      .then((response) => response.json())
      .then((data) => {
        setTopAirAnime(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= minPageLimit && newPage <= maxPageLimit) {
      setCurrentPage(newPage);
    }
  };


  return (
    <div>
      <div className="d-flex justify-content-center mt-4">
        <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === minPageLimit}
            >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === maxPageLimit}
            className="ms-2"
            >
            Next
          </Button>
        </div>
      {TopAirAnime.length > 0 && (
        <Container className='d-flex flex-wrap justify-content-center gap-4 md-4 mt-4'>
          {TopAirAnime.map(anime => (
            <Card key={anime.mal_id} style={{ color: 'white', width: "14rem" }}>

                <Card.Img
                  style={{ height: '18rem', objectFit: 'cover' }}
                  variant='top'
                  src={anime.images.jpg.image_url}
                />
                <Card.Body>
                  <Card.Title>{anime.title_english ?? anime.title}</Card.Title>
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
      <div className="d-flex justify-content-center mt-4"></div>
    </div>
  );
};

export default TopAiringAnime;

//https://api.jikan.moe/v4/seasons/now
