const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const axios = require("axios");

// Global miljövariabler med hemligheter initeras
require("dotenv").config();

// Hämta express, instansiera express.
const app = express();
app.use(cors());
app.use(express.json());

// Anropar MongoDB
connect();

// Skapa endpoints dvs resurser
app.get("/api/1/movies", async (req, res) => {
    const url = "http://localhost:3000/movies";
    const { data } = await axios.get(url);
    res.status(200).json(data);
});

app.get("/api/1/movies/:id", async (req, res) => {
    const param = req.params.id;
    const url = `http://localhost:3000/movies/${param}`;
    const { data } = await axios.get(url);
    res.status(200).json(data);
});

app.post("/api/1/movies", async (req, res) => {
    const url = "http://localhost:3000/movies";
    const body = req.body;
    const { data } = await axios.post(url, body);
    res.status(201).json(data);
});

const PORT = 5020;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
