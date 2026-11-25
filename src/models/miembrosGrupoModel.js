const mongoose = require("mongoose");
const { Schema } = mongoose;

const miembrosGrupoSchema = new Schema(
    {
        id_grupo: { type: Schema.Types.ObjectId },
        id_usuario: { type: Number },
        rol: { type: String, enum: ["admin", "moderador", "miembro"] },
        estado: { type: String },
        unido_en: { type: Date }
    },
    { collection: "miembros_grupo", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("miembros_grupo", miembrosGrupoSchema);
