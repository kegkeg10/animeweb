import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const AnimeItem = () => {
const { id } = useParams();

const [anime, setAnime] = useState({});
const [showMoreContent, setShowMoreContent] = useState(false);

const { synopsis, trailer } = anime;

const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
};

useEffect(() => {
    getAnime(id);
}, []);

    return (
        <div className=" d-flex pt-5 justify-content-center vh-100" style={{ backgroundColor: "#35a3c59b",maxHeight: '100vh', }}>
        <div className="d-flex align-items-start ">
            <img
            className="pb-5 imager"
            src={anime.images?.jpg.large_image_url}
            alt="Anime Poster"
            />
            <div className="ml-4 pt-5" style={{ color: "#FFFFFF", padding: "65px" }}>
            <Container style={{ width: "58rem" }} fluid={false}>
                <Card.Title>
                <strong>{anime.title_english ?? anime.title}</strong>
                </Card.Title>
                <br />
                <Card.Text>
                <strong>Score: {anime.score}</strong>
                </Card.Text>
                <Card.Text><strong>Episodes: </strong> {anime.episodes ?? anime.status}</Card.Text>
                <Card.Text>{anime.duration}</Card.Text>
                <Card.Text><strong>Popularity: </strong>{anime.popularity}</Card.Text>
                <Card.Text><strong>Status: </strong>{anime.status}</Card.Text>
                <Card.Text><strong>Rating: </strong>{anime.rating}</Card.Text>
                <Card.Text><strong>Season It Aired: </strong>{anime.season}</Card.Text>
                <Card.Text><strong>Rank: </strong>{anime.rank}</Card.Text>
                <Card.Text className="text-wrap bd-highlight">
                {showMoreContent
                    ? synopsis
                    : synopsis?.substring(0, 159) + "...."}
                <button
                    className="button"
                    onClick={() => {
                    setShowMoreContent(!showMoreContent);
                    }}
                >
                    {showMoreContent ? "Show Less" : "Read More"}
                </button>
                </Card.Text>
                <div className="trailer embed-responsive embed-responsive-21by9"> {/* Use 16:9 aspect ratio for a typical video */}
                    <iframe
                        className="embed-responsive-item"
                        src={trailer?.embed_url}
                        style={{ width: '500px', height: '300px' }} // Set iframe dimensions to 100% width and height
                    ></iframe>
                </div>
            </Container>
            </div>
        </div>
        </div>
    );
};

export default AnimeItem;
