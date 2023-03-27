const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController');

router.get("/", homeController.getList);
router.post("/libro", homeController.postLibroByCategoria);
router.post("/libro-details", homeController.postDetails);
router.post("/filtro-titulo", homeController.postByTitulo);

module.exports = router;