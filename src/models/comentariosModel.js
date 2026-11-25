const mongoose = require("mongoose");
const { Schema } = mongoose;

const autorSchema = new Schema(
    {
        id_usuario: { type: Number },
        nombre: { type: String },
        nombre_usuario: { type: String },
        avatar: { type: String }
    },
    { _id: false, versionKey: false }
);

const comentariosSchema = new Schema(
    {
        publicacion_id: { type: Schema.Types.ObjectId },
        autor: { type: autorSchema },
        contenido: { type: String },
        estado: { type: String },
        reacciones_count: { type: Number, default: 0 },
        creado_en: { type: Date },
        actualizado_en: { type: Date }
    },
    { collection: "comentarios", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("comentarios", comentariosSchema);
