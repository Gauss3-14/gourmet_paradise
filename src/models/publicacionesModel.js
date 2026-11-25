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

const productoSchema = new Schema(
    {
        id_producto: { type: Number },
        nombre: { type: String },
        slug: { type: String }
    },
    { _id: false, versionKey: false }
);

const grupoSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        nombre: { type: String },
        slug: { type: String }
    },
    { versionKey: false }
);

const metricasSchema = new Schema(
    {
        reacciones: { type: Number, default: 0 },
        comentarios: { type: Number, default: 0 }
    },
    { _id: false, versionKey: false }
);

const publicacionesSchema = new Schema(
    {
        autor: { type: autorSchema },
        tipo: { type: String, enum: ["publicacion", "resena"] },
        contenido: { type: String },
        medios: { type: [String], default: [] },
        producto: { type: productoSchema },
        grupo: { type: grupoSchema },
        resena_id: { type: Number },
        etiquetas: { type: [String], default: [] },
        visibilidad: { type: String },
        estado: { type: String },
        metricas: { type: metricasSchema },
        creado_en: { type: Date },
        actualizado_en: { type: Date }
    },
    { collection: "publicaciones", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("publicaciones", publicacionesSchema);
