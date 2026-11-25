const mongoose = require("mongoose");
const { Schema } = mongoose;

const marcasSchema = new Schema(
    {
        _id: { type: Number },
        nombre: { type: String },
        origen: { type: String },
        sitio_web: { type: String },
        total_productos: { type: Number, default: 0 }
    },
    { collection: "marcas", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("marcas", marcasSchema);
