const mongoose = require("mongoose");
const { Schema } = mongoose;

const productoSchema = new Schema(
    {
        id_producto: { type: Number },
        nombre: { type: String },
        slug: { type: String }
    },
    { _id: false, versionKey: false }
);

const usuarioSchema = new Schema(
    {
        id_usuario: { type: Number },
        nombre: { type: String }
    },
    { _id: false, versionKey: false }
);

const resenasSchema = new Schema(
    {
        _id: { type: Number },
        producto: { type: productoSchema },
        usuario: { type: usuarioSchema },
        calificacion: { type: Number },
        comentario: { type: String },
        fecha_resena: { type: Date },
        id_publicacion: { type: Schema.Types.ObjectId },
        imagenes: { type: [String], default: [] },
        compra_verificada: { type: Boolean },
        estado: { type: String },
        respuesta_vendedor: { type: Schema.Types.Mixed },
        actualizado_en: { type: Date }
    },
    { collection: "resenas", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("resenas", resenasSchema);
