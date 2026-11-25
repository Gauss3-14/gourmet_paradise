const mongoose = require("mongoose");
const { Schema } = mongoose;

const referenciaSchema = new Schema(
    {
        coleccion: { type: String },
        id: { type: Schema.Types.Mixed }
    },
    { _id: false, versionKey: false }
);

const notificacionesSchema = new Schema(
    {
        usuario_id: { type: Number },
        tipo: { type: String, enum: ["reaccion", "comentario", "grupo", "soporte"] },
        titulo: { type: String },
        mensaje: { type: String },
        referencia: { type: referenciaSchema },
        leida: { type: Boolean },
        creado_en: { type: Date }
    },
    { collection: "notificaciones", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("notificaciones", notificacionesSchema);
