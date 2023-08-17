import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopAnime from "./pages/TopAnime";
import AnimeItem from "./pages/AnimeItem";
import TopAiringAnime from './pages/TopAiringAnime'
import UpComingAnime from './pages/UpComingAnime'

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="success" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">Anime Flow</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" activeClassName="active">Top Anime</Nav.Link>
            <Nav.Link as={Link} to="Topairing" activeClassName="active">Top Airing Anime</Nav.Link>
            <Nav.Link as={Link} to="Upcominganime" activeClassName="active">Upcoming Anime</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<TopAnime />} />
        <Route path="Topairing" element={<TopAiringAnime />} />
        <Route path="Upcominganime" element={<UpComingAnime />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
