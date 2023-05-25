// Importera express modulen...
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

// läs in inställningarna så tidigt i applikationen som det är möjligt
dotenv.config({ path: "./config/settings.env" });

// Instansiera express
const app = express();

// retunera ett objekt
const response = {
    status: "error",
    statusCode: 404,
    data: null,
    error: null,
};

// Sätt upp endpoint resurser
// och anropa api
app.get("/api/v1/movies", async (req, res) => {
    // använd miljövariabler som är placerade i config-mappen
    const url = process.env.BASE_URL + "movie/popular";
    const api_key = process.env.API_KEY;

    // const response = await fetch(`${url}?api_key=${api_key}`);
    // console.log(response);
    // const { results } = await response.json();
    // console.log(results);

    // istället för att använda fetch
    // Eftersom Axios skickar tillbaka ett större paket (skapar data och retunerar där i data från TMDB api:et) måste jag använda destrucering för att få ut den data jag vill ha
    const { data } = await axios.get(`${url}?api_key=${api_key}`);
    // kontrollerar vad jag får ut
    // console.log(data);
    // retunerar till Postman
    // res.status(200).json(data.results);

    // om inga fel uppstår kommer detta att skrivas ut i Postman
    response.status = "success";
    response.statusCode = 200;
    response.data = data.results;
    res.status(response.statusCode).json(response);
});

// Här används antingen värdet från process.env.PORT, eller standardvärdet 5030 om PORT inte är tillgängligt i miljövariabler
const PORT = process.env.PORT || 5030;

// Starta upp servern...
app.listen(PORT, console.log(`Servern är uppe och kör på port ${PORT}`));
