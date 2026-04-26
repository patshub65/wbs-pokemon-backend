import { CLIENT_BASE_URL, PORT } from "#config";
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: CLIENT_BASE_URL,
    /**
     * (exposedHeaders) These response headers are allowed to be read by frontend JavaScript.
     * Because in browsers, even if the server sends headers, JavaScript cannot automatically read all of them in cross-origin requests.
     **/
    exposedHeaders: ["WWW-Authenticate"],
  }),
);

app.use(express.json());

// app.use('/battle', battleRouter)
app.use("/leaderboard");

app.use("*splat", () => {});
// app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`\x1b[35mMain app listening at http://localhost:${PORT}\x1b`);
});
