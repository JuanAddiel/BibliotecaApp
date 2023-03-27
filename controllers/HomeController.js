const Libro = require('../models/book');
const Categorias = require('../models/categorias');
const Editorial = require('../models/editoriales');
const Autor = require('../models/autor');


exports.postByTitulo = (req, res, next) => {
    const tituloBook = req.body.Titulo;
    Categorias.findAll()
        .then((result) => {
            const categoria = result.map((result) => result.dataValues);

            Libro.findAll({ include: [{ model: Autor }, { model: Editorial }, { model: Categorias }], where: { titulo: tituloBook } })
                .then((result) => {
                    const libro = result.map((result) => result.dataValues);
                    res.render("home/libro-list", {
                        pageTitle: "Home",
                        libro: libro,
                        categoria: categoria,
                        hasLibros: libro.length > 0,
                        byName: true
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        })

}
exports.getList = (req, res, next) => {
    Autor.findAll()
        .then((result) => {
            const autor = result.map((result) => result.dataValues);

            Editorial.findAll()
                .then((result) => {
                    const editorial = result.map((result) => result.dataValues);

                    Categorias.findAll()
                        .then((result) => {
                            const categoria = result.map((result) => result.dataValues);
                            Libro.findAll({ include: [{ model: Categorias }, { model: Editorial }, { model: Autor }] })
                                .then((result) => {
                                    const libro = result.map((result) => result.dataValues);

                                    res.render("home/libro-list", {
                                        pageTitle: "Home",
                                        libro: libro,
                                        categoria: categoria,
                                        editorial: editorial,
                                        autor: autor,
                                        hasLibros: libro.length > 0


                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }).catch((error) => {
                            console.log(error);
                        })
                }).catch((error) => {
                    console.log(error);
                })
        }).catch((error) => {
            console.log(error);
        })
}

exports.postDetails = (req, res, next) => {
    const libroId = req.body.Id;
    Autor.findAll()
        .then((result) => {
            const autor = result.map((result) => result.dataValues);

            Editorial.findAll()
                .then((result) => {
                    const editorial = result.map((result) => result.dataValues);

                    Categorias.findAll()
                        .then((result) => {
                            const categoria = result.map((result) => result.dataValues);
                            Libro.findAll({ include: [{ model: Categorias }, { model: Editorial }, { model: Autor }], where: { id: libroId } })
                                .then((result) => {
                                    const libro = result.map((result) => result.dataValues);
                                    res.render("home/libro-details", {
                                        pageTitle: "Home",
                                        libro: libro,
                                        categoria: categoria,
                                        editorial: editorial,
                                        autor: autor,
                                        hasLibros: libro.length > 0
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }).catch((error) => {
                            console.log(error);
                        })
                }).catch((error) => {
                    console.log(error);
                })
        }).catch((error) => {
            console.log(error);
        })
}

exports.postLibroByCategoria = (req, res, next) => {
    const LibroCategoria = req.body.Categoria;
    Categorias.findAll()
        .then((result) => {
            const categoria = result.map((result) => result.dataValues);
            Libro.findAll({ include: [{ model: Categorias }, { model: Editorial }, { model: Autor }], where: { CategoriaId: LibroCategoria } })
                .then((result) => {
                    const libro = result.map((result) => result.dataValues);
                    res.render("home/libro-list",
                        {
                            pageTitle: "Home",
                            categoria: categoria,
                            libro: libro,
                            hasCategoria: categoria.length > 0,
                            hasLibros: libro.length > 0
                        });
                }).catch((error) => { console.log(error); })
        })
}
