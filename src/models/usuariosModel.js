const mongoose = require("mongoose");
const { Schema } = mongoose;

const rolSchema = new Schema(
    {
        id_rol: { type: Number },
        nombre: { type: String }
    },
    { _id: false, versionKey: false }
);

const direccionSchema = new Schema(
    {
        _id: { type: Number },
        direccion_linea1: { type: String },
        referencia: { type: String },
        distrito: { type: String },
        ciudad: { type: String },
        departamento: { type: String },
        codigo_postal: { type: String },
        es_predeterminada: { type: Boolean }
    },
    { versionKey: false }
);

const usuariosSchema = new Schema(
    {
        _id: { type: Number },
        nombre: { type: String },
        apellido: { type: String },
        email: { type: String },
        nombre_usuario: { type: String },
        password_hash: { type: String },
        telefono: { type: String },
        tipo_documento: { type: String, enum: ["DNI", "CE", "PASAPORTE", "RUC"] },
        numero_documento: { type: String },
        activo: { type: Boolean },
        estado: { type: String },
        avatar: { type: String },
        biografia: { type: String },
        sitio_web: { type: String },
        publicaciones_count: { type: Number, default: 0 },
        ultima_actividad: { type: Date },
        creado_en: { type: Date },
        actualizado_en: { type: Date },
        rol: { type: rolSchema },
        direcciones: { type: [direccionSchema], default: [] }
    },
    { collection: "usuarios", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("usuarios", usuariosSchema);
