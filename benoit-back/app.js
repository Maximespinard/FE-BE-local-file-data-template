import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
dotenv.config();

// variables
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file);
const defaultData = { posts: [] };
const db = new Low(adapter, defaultData);

// To read data from JSON file
await db.read();

app.get("/data", async (req, res) => {
  const data = db.data.data;
  console.log(db);
  res.send(data);
});

app.post("/data/add", async (req, res) => {
  const post = {
    id: nanoid(),
    name: req.body.name,
  };
  await db.data.data.push(post);
  await db.write();
  res.send(post);
});

app.delete("/data/delete/:id", async (req, res) => {
  const id = req.params.id;
  await db.data.data.splice(id, 1);
  await db.write();
  res.send(id);
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
