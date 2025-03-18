import express from "express";
import { myDB, DatabaseError } from "../db/myMongoDB.js";

const router = express.Router();

// Validation middleware
const validatePlayerUpdate = (req, res, next) => {
  const { votes } = req.body;
  if (typeof votes !== 'number') {
    return res.status(400).json({ error: "Votes must be a number" });
  }
  if (votes < 0) {
    return res.status(400).json({ error: "Votes cannot be negative" });
  }
  next();
};

/* GET home page. */
router.get("/", async function (req, res) {
  try {
    const query = req.query.query || {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: "Invalid pagination parameters" });
    }

    const players = await myDB.getPlayers({ query, page, limit });
    res.json({ players });
  } catch (error) {
    console.error("Error fetching players:", error);
    if (error instanceof DatabaseError) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.put("/:id", validatePlayerUpdate, async function (req, res) {
  try {
    const id = req.params.id;
    const player = req.body;

    if (!id) {
      return res.status(400).json({ error: "Player ID is required" });
    }

    const result = await myDB.updatePlayer(id, player);
    res.json({ success: true, result });
  } catch (error) {
    console.error("Error updating player:", error);
    if (error instanceof DatabaseError) {
      if (error.code === 'NOT_FOUND') {
        res.status(404).json({ error: "Player not found" });
      } else {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

export default router;
