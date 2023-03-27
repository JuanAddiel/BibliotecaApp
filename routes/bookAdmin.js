const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

router.get("/", bookController.getListBook);
router.get("/create-libro", bookController.getCreateLibros);
router.post("/create-libro", bookController.postCreateLibros);
router.get("/edit-libro/:Id", bookController.getEditLibros);
router.post("/edit-libro", bookController.postEditLibros);
router.post("/delete-libro", bookController.postDeleteLibros);

module.exports = router;