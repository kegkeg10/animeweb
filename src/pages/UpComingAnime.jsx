import { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const UpComingAnime = () => {
const [UpcomingAni, setUpcomingAni] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [maxPageLimit, setMaxPageLimit] = useState(5);
const [minPageLimit, setMinPageLimit] = useState(1);
console.log(setMaxPageLimit, setMinPageLimit);

const handlePageChange = (newPage) => {
    if (newPage >= minPageLimit && newPage <= maxPageLimit) {
        setCurrentPage(newPage);
    }
};


useEffect(() => {
    fetchUpcomingAni();
}, [currentPage]);

const fetchUpcomingAni = () => {
    const topApi = `https://api.jikan.moe/v4/seasons/upcoming?page=${currentPage}`;
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
        {UpcomingAni.length > 0 && (
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
                    <Link to={`/anime/${upcoming.mal_id}`}>Link ⬅️
                    </Link>
                </Card.Body>
                </Card>
            ))}
            </Container>
        )}
        </div>
    );
};

export default UpComingAnime;
