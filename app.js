import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import debugPckg from "debug";
import indexRouter from "./routes/index.js";

const debug = debugPckg("express-mongodb-players-leaderboard:backend");

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.use("/api/players", indexRouter);

app.listen(PORT, () => {
  debug(`Backend is running on port ${PORT}`);
});

export default app;
