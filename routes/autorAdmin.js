const express = require('express');
const router = express.Router();
const autorController = require('../controllers/AutorController');

router.get("/", autorController.getCountBookAutor);
router.get("/create-autor", autorController.getCreateAutor);
router.post("/create-autor", autorController.postCreateAutor);
router.get("/edit-autor/:Id", autorController.getEditAutor);
router.post("/edit-autor", autorController.postEditAutor);
router.post("/delete-autor", autorController.postDeleteAutor);

module.exports = router;