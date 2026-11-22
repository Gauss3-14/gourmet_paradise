// Importamos Libreria
const express = require("express");
// Generamos la app web
const app = express();
app.listen(3000);

app.get("/", (req, res) => {
    res.send("SO desde Node.js con express");
});

console.log("Server running on port ", 3000);