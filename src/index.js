// Importamos Libreria
const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./database.js");
const routes = require("./routes/index.routes.js");

// Generamos la app web
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Gourmet Paradise API");
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    });
});

// Rutas de la API
app.use("/api", routes);

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores
app.use((err, req, res, next) => {
    if (err.name === "CastError") {
        return res.status(400).json({ error: "ID invalido" });
    }
    if (err.code === 11000) {
        return res.status(409).json({ error: "Registro duplicado" });
    }
    if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server running on port ", PORT);
        });
    })
    .catch((err) => {
        console.error("Error connecting to DB:", err);
        process.exit(1);
    });
