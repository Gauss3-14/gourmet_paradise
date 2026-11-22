const {Router} = require("express");
const router = Router();

const ModelUser = require("../userModel.js");

router.get("/algo", (req, res) => {
    res.send("Estas buscando algo ?");
});


// CRUD - Crear
router.post("/crear", async(req, res) => {
    const body = req.body;
    const respuesta = await ModelUser.create(body);
    res.send(respuesta);
});


router.put("/:id", async(req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findOneAndUpdate({_id: id}, body);
    res.send(respuesta);
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.deleteOne({_id: id});
    res.send(respuesta);
});

module.exports = router;