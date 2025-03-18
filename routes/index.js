import express from "express";
import { myDB } from "../db/myMongoDB.js";

const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res) {
  const query = req.query.query || {};
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  console.log("getPlayers query", query, page, limit);

  try {
    const players = await myDB.getPlayers({ query, page, limit });
    console.log("get players", players.length);
    res.json({ players: players });
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

router.put("/:id", async function (req, res) {
  const id = req.params.id;
  const player = req.body;
  console.log("update player", id, player);

  try {
    const newPlayer = await myDB.updatePlayer(id, player);
    res.json({ player: newPlayer });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ error: "Failed to update player" });
  }
});

export default router;
