import { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";

const UpComingAnime = () => {
const [UpcomingAni, setUpcomingAni] = useState([]);
const [showInfo, setShowInfo] = useState(false);

function handleTop() {
    setShowInfo(true);
    fetchUpcomingAni();
}

useEffect(() => {
    setShowInfo(false);
    fetchUpcomingAni();
}, []);

const fetchUpcomingAni = () => {
    const topApi = "https://api.jikan.moe/v4/seasons/upcoming";
    fetch(topApi)
        .then((response) => response.json())
        .then((data) => {
        setUpcomingAni(data.data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
};

return (
    <div>
        <div className="d-flex justify-content-center mt-3">
            <Button variant="success" onClick={handleTop}>
            Upcoming Anime
            </Button>
        </div>
        {showInfo && UpcomingAni.length > 0 && (
            <Container className="d-flex flex-wrap justify-content-center gap-4 md-4 mt-4">
            {UpcomingAni.map((upcoming, index) => (
                <Card key={index} style={{ color: "white", width: "13rem" }}>
                <Card.Img
                    style={{ height: "18rem", objectFit: "cover" }}
                    variant="top"
                    src={upcoming.images.jpg.image_url}
                />
                <Card.Body>
                    <Card.Title>
                    {upcoming.title_english ?? upcoming.title}
                    </Card.Title>
                    <Card.Text>Status: {upcoming.status}</Card.Text>
                    <Card.Text>
                    {" "}
                    <span style={{ fontSize: "inherit" }}>
                        Season: {upcoming.season ?? "Unknown"}
                    </span>
                    </Card.Text>
                    <Card.Text>Popularity: {upcoming.popularity}</Card.Text>
                    <a href={upcoming.url}>Link ⬅️</a>
                </Card.Body>
                </Card>
            ))}
            </Container>
        )}
        </div>
    );
};

export default UpComingAnime;
