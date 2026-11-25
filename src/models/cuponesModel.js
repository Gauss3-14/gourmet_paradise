const mongoose = require("mongoose");
const { Schema } = mongoose;

const cuponesSchema = new Schema(
    {
        _id: { type: Number },
        codigo: { type: String },
        tipo_descuento: { type: String, enum: ["FIJO", "PORCENTAJE"] },
        valor_descuento: { type: Schema.Types.Decimal128 },
        compra_minima: { type: Schema.Types.Decimal128 },
        fecha_expiracion: { type: Date },
        activo: { type: Boolean }
    },
    { collection: "cupones", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("cupones", cuponesSchema);
