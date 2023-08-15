import { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";

const TopAiringAnime = () => {
  const [TopAirAnime, setTopAirAnime] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  function handleTop() {
    setShowInfo(true);
    fetchTopAirAnime();
  }

  useEffect(() => {
    setShowInfo(false);
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
        <div className="d-flex justify-content-center mt-3">
            <Button variant="success" onClick={handleTop}>
            Currently Airing Anime
            </Button>
        </div>
        {showInfo && TopAirAnime.length > 0 && (
            <Container className="d-flex flex-wrap justify-content-center gap-4 md-4 mt-4">
            {TopAirAnime.map((season, index) => (
                <Card key={index} style={{ color: "white", width: "13rem" }}>
                <Card.Img
                    style={{ height: "18rem", objectFit: "cover" }}
                    variant="top"
                    src={season.images.jpg.image_url}
                />
                <Card.Body>
                    <Card.Title>{season.title_english ?? season.title}</Card.Title>
                    <Card.Text>Episode Count: {season.episodes}</Card.Text>
                    <Card.Text>Score: {season.score}</Card.Text>
                    <Card.Text>Popularity: {season.popularity}</Card.Text>
                    <a href={season.url}>Link ⬅️</a>
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
