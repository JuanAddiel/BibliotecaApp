const Autor = require('../models/autor');
const Libros = require('../models/book');
const Sequelize = require('../context/appContext');

exports.getCountBookAutor = (req, res, next) => {
    Autor.findAll({
        attributes: ['id', 'nombre', 'correo', [Sequelize.fn('COUNT', Sequelize.col('Books.id')), 'cantidad_libros']],
        include: [{
          model: Libros,
          attributes: []
        }],
        group: ['Autor.id']
      })
        .then((result) => {
            const autor = result.map((result) => result.dataValues);
            res.render("autor/autor-list", {
                pageTitle: "Autores",
                autorActive: true,
                autor: autor,
                hasAutor: autor.length > 0
            });
        })
        .catch(err => console.log(err));
}


exports.getCreateAutor = (req, res, next) => {
    res.render("autor/save-autor", {
        pageTitle: "Crear Autor",
        homeAutor: true,
        editMode: false
    });
}

exports.postCreateAutor = (req, res, next) => {
    const nombre = req.body.nombre;
    const correo = req.body.correo;

    Autor.create({
        nombre: nombre,
        correo: correo
    })
        .then((result) => {
            res.redirect("/autor");
        })
        .catch(err => console.log(err));
}

exports.getEditAutor = (req, res, next) => {
    const autorId = req.params.Id;
    const edit = req.query.edit;
    if (!edit) {
        return res.redirect("/");
    }
    Autor.findOne({ where: { id: autorId } })
        .then((result) => {
            const autor = result.dataValues;
            if (!autor) {
                return res.redirect("/");
            }
            res.render("autor/save-autor", {
                pageTitle: "Editar Autor",
                autorActive: true,
                editMode: edit,
                autor: autor,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postEditAutor = (req, res, next) => {
    const autorId = req.body.Id;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    Autor.update({
        nombre: nombre,
        correo: correo
    },
        { where: { id: autorId } }
    )
        .then((result) => {
            res.redirect("/autor");
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postDeleteAutor = (req, res, next) => {
    const autorId = req.body.Id;
    Autor.destroy({ where: { id: autorId } })
        .then((result) => {
            res.redirect("/autor");
        })
        .catch((err) => {
            console.log(err);
        });
}