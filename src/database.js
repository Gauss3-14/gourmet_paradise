const mongoose = require("mongoose");

const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27019/gourmet_paradise_db";

async function connectDB() {
    const db = await mongoose.connect(MONGO_URI);
    console.log("DB is connected to", db.connection.host, db.connection.name);
    return db;
}

module.exports = connectDB;
