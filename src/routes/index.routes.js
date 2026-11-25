const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const RolesModel = require("../models/rolesModel.js");
const CategoriasModel = require("../models/categoriasModel.js");
const MarcasModel = require("../models/marcasModel.js");
const CuponesModel = require("../models/cuponesModel.js");
const UsuariosModel = require("../models/usuariosModel.js");
const ProductosModel = require("../models/productosModel.js");
const PedidosModel = require("../models/pedidosModel.js");
const ResenasModel = require("../models/resenasModel.js");
const PublicacionesModel = require("../models/publicacionesModel.js");
const ComentariosModel = require("../models/comentariosModel.js");
const ReaccionesModel = require("../models/reaccionesModel.js");
const GruposModel = require("../models/gruposModel.js");
const MiembrosGrupoModel = require("../models/miembrosGrupoModel.js");
const NotificacionesModel = require("../models/notificacionesModel.js");
const TicketsSoporteModel = require("../models/ticketsSoporteModel.js");
const MensajesTicketModel = require("../models/mensajesTicketModel.js");

const resources = [
    { path: "roles", model: RolesModel, idType: "number" },
    { path: "categorias", model: CategoriasModel, idType: "number" },
    { path: "marcas", model: MarcasModel, idType: "number" },
    { path: "cupones", model: CuponesModel, idType: "number" },
    { path: "usuarios", model: UsuariosModel, idType: "number" },
    { path: "productos", model: ProductosModel, idType: "number" },
    { path: "pedidos", model: PedidosModel, idType: "number" },
    { path: "resenas", model: ResenasModel, idType: "number" },
    { path: "publicaciones", model: PublicacionesModel, idType: "objectid" },
    { path: "comentarios", model: ComentariosModel, idType: "objectid" },
    { path: "reacciones", model: ReaccionesModel, idType: "objectid" },
    { path: "grupos", model: GruposModel, idType: "objectid" },
    { path: "miembros_grupo", model: MiembrosGrupoModel, idType: "objectid" },
    { path: "notificaciones", model: NotificacionesModel, idType: "objectid" },
    { path: "tickets_soporte", model: TicketsSoporteModel, idType: "objectid" },
    { path: "mensajes_ticket", model: MensajesTicketModel, idType: "objectid" }
];

function parseId(value, idType) {
    if (idType === "number") {
        const numero = Number(value);
        return Number.isInteger(numero) ? numero : null;
    }
    return mongoose.Types.ObjectId.isValid(value) ? value : null;
}

async function nextNumericId(model) {
    const ultimo = await model.findOne().sort({ _id: -1 }).select("_id").lean();
    return (ultimo ? Number(ultimo._id) : 0) + 1;
}

resources.forEach(({ path, model, idType }) => {
    // Listar
    router.get(`/${path}`, async (req, res) => {
        const documentos = await model.find().lean();
        res.json(documentos);
    });

    // Obtener por id
    router.get(`/${path}/:id`, async (req, res) => {
        const id = parseId(req.params.id, idType);
        if (id === null) {
            return res.status(400).json({ error: "ID invalido" });
        }
        const documento = await model.findById(id).lean();
        if (!documento) {
            return res.status(404).json({ error: "No encontrado" });
        }
        res.json(documento);
    });

    // Crear
    router.post(`/${path}`, async (req, res) => {
        const body = { ...req.body };
        if (idType === "number") {
            body._id = await nextNumericId(model);
        } else {
            delete body._id;
        }
        const documento = await model.create(body);
        res.status(201).json(documento);
    });

    // Actualizar
    router.put(`/${path}/:id`, async (req, res) => {
        const id = parseId(req.params.id, idType);
        if (id === null) {
            return res.status(400).json({ error: "ID invalido" });
        }
        const body = { ...req.body };
        delete body._id;
        const documento = await model.findOneAndUpdate({ _id: id }, body, {
            new: true,
            runValidators: true
        });
        if (!documento) {
            return res.status(404).json({ error: "No encontrado" });
        }
        res.json(documento);
    });

    // Eliminar
    router.delete(`/${path}/:id`, async (req, res) => {
        const id = parseId(req.params.id, idType);
        if (id === null) {
            return res.status(400).json({ error: "ID invalido" });
        }
        const documento = await model.findOneAndDelete({ _id: id });
        if (!documento) {
            return res.status(404).json({ error: "No encontrado" });
        }
        res.json({ mensaje: "Eliminado", _id: documento._id });
    });
});

module.exports = router;