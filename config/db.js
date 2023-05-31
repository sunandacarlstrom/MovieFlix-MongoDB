// Importerar paketet Mongoose
const mongoose = require("mongoose");

// Skapar en funktion för att ansluta till Mongoose
const connect = async () => {
    // Ansluta mig till Mongoose
    console.log(process.env.DB_PASSWORD);
    const conn = await mongoose.connect(process.env.DB_PASSWORD);
    console.log(`MongoDB connected ${conn.connection.host}`);
};

// Exporterar denna modul
module.exports = connect;
