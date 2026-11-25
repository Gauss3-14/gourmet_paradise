const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriaSchema = new Schema(
    {
        id_categoria: { type: Number },
        nombre: { type: String }
    },
    { _id: false, versionKey: false }
);

const gruposSchema = new Schema(
    {
        nombre: { type: String },
        slug: { type: String },
        descripcion: { type: String },
        categoria: { type: categoriaSchema },
        propietario_id: { type: Number },
        privacidad: { type: String },
        reglas: { type: [String], default: [] },
        imagen: { type: String },
        miembros_count: { type: Number, default: 0 },
        publicaciones_count: { type: Number, default: 0 },
        creado_en: { type: Date },
        actualizado_en: { type: Date }
    },
    { collection: "grupos", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("grupos", gruposSchema);
