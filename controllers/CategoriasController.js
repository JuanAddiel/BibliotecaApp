const Categorias = require('../models/categorias');
const Libros = require('../models/book');
const Sequelize = require('../context/appContext');



exports.getCountBookCategoria = (req, res, next) => {
    Categorias.findAll({
        attributes: ['id', 'nombre', 'descripcion', [Sequelize.fn('COUNT', Sequelize.col('Books.id')), 'cantidad_libros']],
        include: [{
          model: Libros,
          attributes: []
        }],
        group: ['Categorias.id']
      })
        .then((result) => {
            const categoria = result.map((result) => result.dataValues);
            res.render("categoria/categoria-list", {
                pageTitle: "Categorias",
                homeCategoria: true,
                categorias: categoria,
                hasCategoria: categoria.length > 0
            });
        })
        .catch(err => console.log(err));
}

exports.getCreateCategoria = (req, res, next) => {
    res.render("categoria/save-categoria", {
        pageTitle: "Crear Editorial",
        homeCategoria: true,
        editMode: false
    });
}

exports.postCreateCategoria = (req, res, next) => {
    const nombre = req.body.Nombre;
    const descripcion = req.body.Descripcion;

    Categorias.create({
        nombre: nombre,
        descripcion: descripcion
    })
        .then((result) => {
            res.redirect("/categoria");
        })
        .catch(err => console.log(err));
}

exports.getEditCategoria = (req, res, next) => {
    const categoriaId = req.params.Id;
    const edit = req.query.edit;
    if (!edit) {
        return res.redirect("/");
    }
    Categorias.findOne({ where: { id: categoriaId } })
        .then((result) => {
            const categoria = result.dataValues;
            if (!categoria) {
                return res.redirect("/categoria");
            }
            res.render("categoria/save-categoria", {
                pageTitle: "Editar Categoria",
                categoriaActive: true,
                editMode: edit,
                categoria: categoria,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postEditCategoria = (req, res, next) => {
    const categoriaId = req.body.Id;
    const nombre = req.body.Nombre;
    const descripcion = req.body.Descripcion;
    Categorias.update({
        nombre: nombre,
        descripcion: descripcion
    },
        { where: { id: categoriaId } }
    )
        .then((result) => {
            res.redirect("/categoria");
        })
        .catch(err => console.log(err));
}

exports.postDeleteCategoria = (req, res, next) => {
    const categoriaId = req.body.Id;
    Categorias.destroy({ where: { id: categoriaId } })
        .then((result) => {
            res.redirect("/categoria");
        })
        .catch(err => console.log(err));
}
