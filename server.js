const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const Movie = require("./models/Movie");
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
    // VIA JSON-SERVER
    // const url = "http://localhost:3000/movies";
    // const { data } = await axios.get(url);
    // res.status(200).json(data);

    // VIA MONGODB
    try {
        const movies = await Movie.find();
        res.status(200).json({ success: true, data: movies });
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    }
});

app.get("/api/1/movies/:id", async (req, res) => {
    //     const param = req.params.id;
    //     const url = `http://localhost:3000/movies/${param}`;
    //     const { data } = await axios.get(url);
    //     res.status(200).json(data);

    try {
        const param = req.params.id;
        const movie = await Movie.findById(param);

        // om jag skickar in något som ej existerar
        if (!movie) {
            return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: movie });
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    }
});

app.post("/api/1/movies", async (req, res) => {
    // VIA JSON-SERVER
    // const url = "http://localhost:3000/movies";
    // const body = req.body;
    // const { data } = await axios.post(url, body);
    // res.status(201).json(data);

    // VIA MONGODB
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({ success: true, data: movie });
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    }
});

app.put("/api/1/movies/:id", async (req, res) => {
    try {
        const param = req.params.id;
        const movie = await Movie.findByIdAndUpdate(param, req.body);

        if (!movie) {
            return res.status(404).json({ success: false, error: err });
        }

        res.status(204).send();
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    }
});

app.delete("/api/1/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false });
        }

        res.status(204).send(); 
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    }
});

const PORT = 5020;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
