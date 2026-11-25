const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema(
    {
        id_usuario: { type: Number },
        nombre: { type: String },
        nombre_usuario: { type: String },
        avatar: { type: String }
    },
    { _id: false, versionKey: false }
);

const reaccionesSchema = new Schema(
    {
        objetivo_tipo: { type: String, enum: ["publicacion", "comentario"] },
        objetivo_id: { type: Schema.Types.ObjectId },
        usuario: { type: usuarioSchema },
        tipo: { type: String, enum: ["like", "love", "util"] },
        creado_en: { type: Date }
    },
    { collection: "reacciones", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("reacciones", reaccionesSchema);
