const mongoose = require("mongoose");
const { Schema } = mongoose;

const rolesSchema = new Schema(
    {
        _id: { type: Number },
        nombre: { type: String },
        descripcion: { type: String },
        permisos: { type: [String], default: [] },
        actualizado_en: { type: Date }
    },
    { collection: "roles", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("roles", rolesSchema);
