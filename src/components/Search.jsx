import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Search() {
const [search, setSearch] = useState("");
const [animeData, setAnimeData] = useState([]);

const getData = async () => {
    try {
    const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${search}&limit=5`
    );
    const resData = await res.json();
        setAnimeData(resData.data);
    } catch (error) {
    console.error("Error fetching data:", error);
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    getData();
};

    return (
        <div>
        <Form inline className="searcher" onSubmit={handleSubmit}>
            <Row>
            <Col xs="auto">
                <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                />
            </Col>
            <Col xs="auto">
                <Button type="submit" onClick={getData}>
                Submit
                </Button>
            </Col>
            </Row>
        </Form>
        <Container className="d-flex flex-wrap justify-content-center gap-4 md-4 mt-4">
            {animeData.map((anime) => (
            <div key={anime.mal_id}>
                <Card style={{ width: "12rem", color: "white" }}>
                <Card.Img
                    style={{ height: "18rem", objectFit: "cover" }}
                    variant="top"
                    src={anime.images.jpg.image_url}
                />
                <Card.Body>
                <div style={{ maxHeight: "3.6rem", overflow: "hidden" }}>
                    <Card.Title>{anime.title_english}</Card.Title>
                    </div>
                    <Card.Text>
                    Episodes: {anime.episodes ?? anime.status}
                    </Card.Text>
                    <Card.Text>Score: {anime.score}</Card.Text>
                    <Card.Text>Popularity: {anime.popularity}</Card.Text>
                    <Link to={`/anime/${anime.mal_id}`}>Link ⬅️
                    </Link>
                    <div className="embed-responsive embed-responsive-21by9"> {/* Use 16:9 aspect ratio for a typical video */}
                    {/* <iframe
                        className="embed-responsive-item"
                        // src={anime?.trailer.embed_url}
                        style={{ width: '500px', height: '300px' }} // Set iframe dimensions to 100% width and height
                    ></iframe> */}
                </div>
                </Card.Body>
                </Card>
            </div>
            ))}
        </Container>
        </div>
    );
}

export default Search;