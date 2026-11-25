const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriaSchema = new Schema(
    {
        id_categoria: { type: Number },
        nombre: { type: String },
        slug: { type: String }
    },
    { _id: false, versionKey: false }
);

const marcaSchema = new Schema(
    {
        id_marca: { type: Number },
        nombre: { type: String },
        origen: { type: String },
        sitio_web: { type: String }
    },
    { _id: false, versionKey: false }
);

const varianteSchema = new Schema(
    {
        _id: { type: Number },
        sku: { type: String },
        presentacion: { type: String },
        precio_regular: { type: Schema.Types.Decimal128 },
        precio_oferta: { type: Schema.Types.Decimal128 },
        stock: { type: Number },
        peso_kg: { type: Schema.Types.Decimal128 }
    },
    { versionKey: false }
);

const productosSchema = new Schema(
    {
        _id: { type: Number },
        nombre: { type: String },
        slug: { type: String },
        descripcion: { type: String },
        notas_de_cata: { type: String },
        maridaje_sugerido: { type: String },
        valle_o_region: { type: String },
        activo: { type: Boolean },
        creado_en: { type: Date },
        actualizado_en: { type: Date },
        categoria: { type: categoriaSchema },
        marca: { type: marcaSchema },
        variantes: { type: [varianteSchema], default: [] },
        resumen_resenas: { type: Schema.Types.Mixed },
        precio_min: { type: Schema.Types.Decimal128 },
        precio_max: { type: Schema.Types.Decimal128 },
        stock_total: { type: Number, default: 0 },
        imagenes: { type: [String], default: [] },
        atributos: { type: Schema.Types.Mixed, default: {} },
        tags: { type: [String], default: [] },
        destacado: { type: Boolean },
        nuevo: { type: Boolean },
        meta_titulo: { type: String },
        meta_descripcion: { type: String },
        publicaciones_count: { type: Number, default: 0 },
        auditoria: { type: Schema.Types.Mixed }
    },
    { collection: "productos", versionKey: false, timestamps: false }
);

module.exports = mongoose.model("productos", productosSchema);
