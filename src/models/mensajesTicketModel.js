const mongoose = require("mongoose");
const { Schema } = mongoose;

const autorSchema = new Schema(
    {
        id_usuario: { type: Number },
        nombre: { type: String },
        rol: { type: String }
    },
    { _id: false, versionKey: false }
);

const mensajesTicketSchema = new Schema(
    {
        ticket_id: { type: Schema.Types.ObjectId },
        autor: { type: autorSchema },
        mensaje: { type: String },
        es_interno: { type: Boolean },
        creado_en: { type: Date }
    },
    { collection: "mensajes_ticket", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("mensajes_ticket", mensajesTicketSchema);
