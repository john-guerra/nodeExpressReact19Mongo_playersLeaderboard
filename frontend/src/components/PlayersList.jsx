import Player from "./Player";
import { useState, useEffect } from "react";

export default function PlayersList() {
  let [players, setPlayers] = useState([]);
  let [updating, setUpdating] = useState(false);

  console.log("Rendering PlayersList", players);

  // Fetch players from the Backend API
  async function fetchPlayers() {
    const res = await fetch("/api/players");
    const playersData = await res.json();
    console.log("Got players", playersData);
    setPlayers(playersData.players);
  }

  async function updatePlayer(player) {
    setUpdating(true);
    const url = `/api/players/${player._id}`;
    console.log("Updating player", url, player);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });
    const updatedPlayer = await res.json();
    console.log("Updated player result", updatedPlayer);
    setUpdating(false);
  }

  useEffect(() => {
    fetchPlayers();

    return () => {
      console.log("Cleanup PlayersList");
    };
  }, []);

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
          fetchPlayers();
        }}
      />
    ));
  }

  return (
    <div className="players">
      <div>
        <strong>Top three players:</strong>{" "}
        {/* REnder top 3 players here */}{" "}
      </div>
      {renderPlayers()}
    </div>
  );
}
