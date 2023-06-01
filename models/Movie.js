const mongoose = require("mongoose");

// Skapar ett schema
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title is required, please try again"],
        unique: true,
    },
    length: String,
    genre: {
        type: [String],
        // Enum = lista av valbara alternativ
        enum: ["Action", "Adventure", "Comedy", "Drama", "Horror", "Romantic", "Thriller", "Musical"],
    },
});

module.exports = mongoose.model("Movie", MovieSchema);
