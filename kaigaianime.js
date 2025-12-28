"use strict";

const express = require("express");
const app = express();
const PORT = 8080;

const animeList = require("./animeData");

app.use(express.json());
app.use(express.static(__dirname));

app.get("/anime", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/anime", (req, res) => {
  res.json(animeList);
});

app.get("/api/anime/:id", (req, res) => {
  const id = Number(req.params.id);
  const anime = animeList.find(a => a.id === id);
  res.json(anime);
});

app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});

app.post("/api/anime", (req, res) => {
  const newAnime = {
    id: animeList.length + 1,
    title: req.body.title,
    description: req.body.description
  };
  animeList.push(newAnime);
  res.json(newAnime);
});

app.put("/api/anime/:id", (req, res) => {
  const id = Number(req.params.id);
  const anime = animeList.find(a => a.id === id);

  if (!anime) {
    res.status(404).json({ error: "not found" });
    return;
  }

  anime.title = req.body.title;
  anime.description = req.body.description;
  res.json(anime);
});

app.delete("/api/anime/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = animeList.findIndex(a => a.id === id);
  if (index === -1) {
    res.status(404).json({ error: "not found" });
    return;
  }

  animeList.splice(index, 1); // ← ここが超重要
  console.log("削除:", id);

  res.json({ message: "deleted" });
});


