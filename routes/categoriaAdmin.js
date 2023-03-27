const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriasController');


router.get("/", categoriaController.getCountBookCategoria);
router.get("/create-categoria", categoriaController.getCreateCategoria);
router.post("/create-categoria", categoriaController.postCreateCategoria);
router.get("/edit-categoria/:Id", categoriaController.getEditCategoria);
router.post("/edit-categoria", categoriaController.postEditCategoria);
router.post("/delete-categoria", categoriaController.postDeleteCategoria);

module.exports = router;