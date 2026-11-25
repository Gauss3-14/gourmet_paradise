const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema(
    {
        id_usuario: { type: Number },
        nombre: { type: String },
        email: { type: String }
    },
    { _id: false, versionKey: false }
);

const ticketsSoporteSchema = new Schema(
    {
        numero_ticket: { type: String },
        usuario: { type: usuarioSchema },
        asunto: { type: String },
        categoria: { type: String, enum: ["cuenta", "otro", "pago", "pedido", "producto"] },
        prioridad: { type: String, enum: ["alta", "baja", "media", "urgente"] },
        estado: { type: String, enum: ["abierto", "cerrado", "en_proceso", "resuelto"] },
        asignado_a: { type: Number },
        mensajes_count: { type: Number, default: 0 },
        ultimo_mensaje_en: { type: Date },
        creado_en: { type: Date },
        actualizado_en: { type: Date },
        cerrado_en: { type: Date }
    },
    { collection: "tickets_soporte", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("tickets_soporte", ticketsSoporteSchema);
