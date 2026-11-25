const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriasSchema = new Schema(
    {
        _id: { type: Number },
        nombre: { type: String },
        slug: { type: String },
        descripcion: { type: String },
        activo: { type: Boolean },
        total_productos: { type: Number, default: 0 }
    },
    { collection: "categorias", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("categorias", categoriasSchema);
