import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TopAnime from '../pages/TopAnime';
import TopManga from '../pages/TopManga';
import TopAiringAnime from '../pages/TopAiringAnime';
import UpComingAnime from '../pages/UpComingAnime';
import RandomManga from '../pages/RandomManga';

function Naver() {
    return (
        <Router>
            <Navbar expand="lg" className="bg-body-secondary">
                <Container>
                    <Navbar.Brand href="/">Anime Flow</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Anime" id="basic-nav-dropdown">
                                <Link to="/topanime">Top Anime</Link>
                                <br />
                                <Link to="/topairanime">Airing Anime</Link>
                                <br />
                                <Link to="/upcoming">Upcoming Anime</Link>
                                {/* Other Anime links */}
                            </NavDropdown>
                            <NavDropdown title="Manga" id="basic-nav-dropdown">
                                <Link to="/topmanga">Top Manga</Link>
                                <br />
                                <Link to="/Randommanga">Random Manga</Link>
                                {/* Other Manga links */}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/topanime" element={<TopAnime />} />
                <Route path="/topmanga" element={<TopManga />} />
                <Route path="/topairanime" element={<TopAiringAnime />} />
                <Route path="/upcoming" element={<UpComingAnime />} />
                <Route path="/Randommanga" element={<RandomManga />} />
                {/* Define other routes */}
            </Routes>
        </Router>
    );
}

export default Naver;