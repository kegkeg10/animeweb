import { useState, useEffect } from 'react';
import { Button, Card, Container} from 'react-bootstrap';

const TopManga = () => {
  const [topManga, setTopManga] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(9);
  const [minPageLimit, setMinPageLimit] = useState(1);
  console.log(setMaxPageLimit, setMinPageLimit);

  useEffect(() => {
    fetchTopManga();
  }, [currentPage]);

  const fetchTopManga = () => {
    const topApi =
      `https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=24&page=${currentPage}`;
    fetch(topApi)
      .then(response => response.json())
      .then(data => {
        setTopManga(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
      {topManga.length > 0 && (
        <Container className='d-flex flex-wrap justify-content-center gap-4 md-4 mt-4'>
          {topManga.map((manga, index) => (
            <Card key={index} style={{ color: 'white', width: "13rem",}}>
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