import { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(9);
  const [minPageLimit, setMinPageLimit] = useState(1);

  console.log(setMaxPageLimit, setMinPageLimit);

  useEffect(() => {
    fetchTopAnime();
  }, [currentPage]);

  const fetchTopAnime = () => {
    const topApi = `https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=25&page=${currentPage}`;
    fetch(topApi)
      .then((response) => response.json())
      .then((data) => {
        setTopAnime(data.data);
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
      <h2 className="d-flex justify-content-center" style={{ color: "#ffd000",}}>
        <strong className="height">Top Anime</strong>
      </h2>
      <div className=" d-flex justify-content-center mt-4 phoneb">
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
      {topAnime.length > 0 && (
        <Container className="d-flex flex-wrap justify-content-center gap-4 mt-3">
          {topAnime.map((anime) => (
            <Card key={anime.mal_id} style={{ color: "white", width: "14rem" }}>
              <Card.Img
                style={{ height: "20rem",objectFit: "cover" }}
                variant="top"
                src={anime.images.jpg.image_url}
              />
              <Card.Body>
                <Card.Title>{anime.title_english ?? anime.title}</Card.Title>
                <Card.Text>
                  Episodes: {anime.episodes ?? anime.status}
                </Card.Text>
                <Card.Text>Score: {anime.score}</Card.Text>
                <Card.Text>Popularity: {anime.popularity}</Card.Text>
                <Link to={`/anime/${anime.mal_id}`}>Link ⬅️</Link>
                {/* <a href={anime.url}>Link ⬅️</a> */}
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </div>
  );
};

export default TopAnime;
