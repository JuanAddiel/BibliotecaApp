const express = require('express');
const router = express.Router();
const editorialController = require('../controllers/EditorialController');

router.get("/", editorialController.getCountBookEditorial);
router.get("/create-editorial", editorialController.getCreateEditorial);
router.post("/create-editorial", editorialController.postCreateEditorial);
router.get("/edit-editorial/:Id", editorialController.getEditEditorial);
router.post("/edit-editorial", editorialController.postEditEditorial);
router.post("/delete-editorial", editorialController.postDeleteEditorial);

module.exports = router;