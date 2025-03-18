import Player from "./Player";
import { useState, useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";

export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  async function fetchPlayers() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/players");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const playersData = await res.json();
      setPlayers(playersData.players);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching players:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updatePlayer(player) {
    try {
      setUpdating(true);
      setError(null);
      const url = `/api/players/${player._id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      await fetchPlayers(); // Refresh the list after update
    } catch (err) {
      setError(err.message);
      console.error("Error updating player:", err);
    } finally {
      setUpdating(false);
    }
  }

  useEffect(() => {
    fetchPlayers();
    return () => {
      setPlayers([]);
      setError(null);
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        Error: {error}
        <button
          className="btn btn-outline-danger ms-3"
          onClick={fetchPlayers}
        >
          Retry
        </button>
      </Alert>
    );
  }

  function renderPlayers() {
    return players.map((p, index) => (
      <Player
        key={`Player_${index}`}
        name={p.name}
        votes={p.votes}
        updating={updating}
        setVotes={(votes) => {
          const newPlayer = { ...p, votes };
          updatePlayer(newPlayer);
        }}
      />
    ));
  }

  return (
    <div className="players">
      <div className="mb-3">
        <strong>Top three players:</strong>
        {players.slice(0, 3).map((p, index) => (
          <span key={index} className="ms-2">
            {index + 1}. {p.name} ({p.votes} votes)
          </span>
        ))}
      </div>
      {renderPlayers()}
    </div>
  );
}
