import { useState, useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';

const RandomManga = () => {
    const [RandomAnime, setRandomAnime] = useState(null);
    const [showInfo, setShowInfo] = useState(false);

    function handleRandom() {
        setShowInfo(true);
        fetchRandomAnime();
    }

    useEffect(() => {
        setShowInfo(false);
        fetchRandomAnime();
    }, []);

    const fetchRandomAnime = () => {
        const randomApi = 'https://api.jikan.moe/v4/random/anime';
        fetch(randomApi)
            .then(response => response.json())
            .then(data => {
                setRandomAnime(data);
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
                    onClick={handleRandom}
                >
                    Random Anime
                </Button>
            </div>
            {showInfo && RandomAnime && (
                <Container className='d-flex flex-wrap justify-content-center gap-4 md-4 mt-4'>
                    <Card style={{ color: 'white', width: '13rem' }}>
                        <Card.Img
                            style={{ height: '18rem', objectFit: 'cover' }}
                            variant='top'
                            src={RandomAnime.data.images.jpg.image_url}
                        />
                        <Card.Body>
                        <Card.Title>{RandomAnime.title_english ?? RandomAnime.title}</Card.Title>
                        <Card.Text>Episode Count: {RandomAnime.data.episodes}</Card.Text>
                        <Card.Text>Score: {RandomAnime.data.score}</Card.Text>
                        <Card.Text>Popularity: {RandomAnime.data.popularity}</Card.Text>
                            <a href={RandomAnime.data.url} className='btn btn-link'>
                                Link ⬅️
                            </a>
                        </Card.Body>
                    </Card>
                </Container>
            )}
        </div>
    );
};

export default RandomManga;