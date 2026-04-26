import { PORT } from "#config";
import express from "express";

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`\x1b[35mMain app listening at http://localhost:${PORT}\x1b`);
});
