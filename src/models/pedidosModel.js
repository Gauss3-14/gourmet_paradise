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

const direccionSchema = new Schema(
    {
        id_direccion: { type: Number },
        direccion_linea1: { type: String },
        referencia: { type: String },
        distrito: { type: String },
        ciudad: { type: String },
        departamento: { type: String },
        codigo_postal: { type: String }
    },
    { _id: false, versionKey: false }
);

const cuponSchema = new Schema(
    {
        id_cupon: { type: Number },
        codigo: { type: String },
        tipo_descuento: { type: String },
        valor_descuento: { type: Schema.Types.Decimal128 }
    },
    { _id: false, versionKey: false }
);

const historialSchema = new Schema(
    {
        estado: { type: String },
        fecha: { type: Date },
        usuario: { type: String },
        comentario: { type: String }
    },
    { _id: false, versionKey: false }
);

const envioSchema = new Schema(
    {
        transportista: { type: String },
        tracking: { type: String },
        fecha_envio: { type: Date },
        fecha_entrega_estimada: { type: Date },
        fecha_entrega_real: { type: Date }
    },
    { _id: false, versionKey: false }
);

const itemSchema = new Schema(
    {
        _id: { type: Number },
        id_variante: { type: Number },
        id_producto: { type: Number },
        sku: { type: String },
        nombre_producto: { type: String },
        presentacion: { type: String },
        cantidad: { type: Number },
        precio_unitario: { type: Schema.Types.Decimal128 },
        subtotal_linea: { type: Schema.Types.Decimal128 }
    },
    { versionKey: false }
);

const pagoSchema = new Schema(
    {
        _id: { type: Number },
        metodo_pago: { type: String },
        transaccion_id: { type: String },
        monto: { type: Schema.Types.Decimal128 },
        estado_pago: { type: String },
        fecha_pago: { type: Date }
    },
    { versionKey: false }
);

const pedidosSchema = new Schema(
    {
        _id: { type: Number },
        numero_pedido: { type: String },
        usuario: { type: usuarioSchema },
        direccion_envio: { type: direccionSchema },
        cupon: { type: cuponSchema },
        estado_pedido: {
            type: String,
            enum: ["PENDIENTE", "PAGADO", "EN_PREPARACION", "ENVIADO", "ENTREGADO", "CANCELADO"]
        },
        moneda: { type: String },
        tipo_entrega: { type: String },
        origen: { type: String },
        subtotal: { type: Schema.Types.Decimal128 },
        descuento: { type: Schema.Types.Decimal128 },
        costo_envio: { type: Schema.Types.Decimal128 },
        total: { type: Schema.Types.Decimal128 },
        fecha_pedido: { type: Date },
        historial_estados: { type: [historialSchema], default: [] },
        envio: { type: envioSchema },
        notas: { type: String },
        facturacion: { type: Schema.Types.Mixed },
        items: { type: [itemSchema], default: [] },
        pagos: { type: [pagoSchema], default: [] },
        actualizado_en: { type: Date },
        auditoria: { type: Schema.Types.Mixed }
    },
    { collection: "pedidos", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("pedidos", pedidosSchema);
