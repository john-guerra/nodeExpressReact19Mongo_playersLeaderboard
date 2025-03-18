import PlayersList from "./components/PlayersList";
import PlayerCreateForm from "./components/PlayerCreateForm";
import SearchPlayers from "./components/SearchPlayers";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function App() {
  return (
    <Container>
      <h1>👴🏼 Follow leader</h1>

      <Row>
        <Col xs={12} md={8}>
          <SearchPlayers></SearchPlayers>
          <PlayersList></PlayersList>
        </Col>
        <Col xs={12} md={4} >
          <PlayerCreateForm></PlayerCreateForm>
        </Col>
      </Row>

      <footer>
        <div>Made by John with ❤️ 😅</div>
      </footer>
    </Container>
  );
}
