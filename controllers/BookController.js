const Libro = require('../models/book');
const Categorias = require('../models/categorias');
const Editorial = require('../models/editoriales');
const Autor = require('../models/autor');
const transporter = require("../services/EmailService");

exports.getListBook = (req, res, next) => {
    Libro.findAll({ include: [{ model: Categorias }, { model: Editorial }, { model: Autor }] })
        .then((result) => {
            const libros = result.map((result) => result.dataValues);
            res.render("book/book-list", {
                pageTitle: "Libros",
                homeBook: true,
                libros: libros,
                hasLibros: libros.length > 0
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getCreateLibros = (req, res, next) => {
    Categorias.findAll()
        .then((result) => {
            const categoria = result.map((result) => result.dataValues);
            Editorial.findAll()
                .then((result) => {
                    const editorial = result.map((result) => result.dataValues);
                    Autor.findAll()
                        .then((result) => {
                            const autor = result.map((result) => result.dataValues);
                            res.render("book/save-book", {
                                pageTitle: "Crear Libro",
                                homeBook: true,
                                editMode: false,
                                categoria: categoria,
                                editorial: editorial,
                                autor: autor,
                                hasAutor: autor.length > 0,
                                hasEditorial: editorial.length > 0,
                                hasCategoria: categoria.length > 0
                            });
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

exports.postCreateLibros = (req, res, next) => {

    const titulo = req.body.Titulo;
    const ano = req.body.Ano;
    const categoria = req.body.Categoria;
    const editorial = req.body.Editorial;
    const autor = req.body.Autor;
    const imagen = req.file;
    Autor.findOne({ where: { id: autor } })
    .then((result) => {
        const autorList =result.dataValues;
    Libro.create({
        titulo: titulo,
        ano: ano,
        imagen: "/" + imagen.path,
        CategoriaId: categoria,
        EditorialId: editorial,
        AutorId: autor
    })
  
        .then((result) => {
            res.redirect("/libro");
            return transporter.sendMail(
                {
                    from: "Libro notificacion",
                    to: autorList.correo,
                    subject: `El libro ${titulo} a sido agregado`,
                    html: `Les informarmos señor/ar ${autorList.nombre} que su libro ${titulo} ha sido registrado.`,
                },
                (err) => {
                    console.log(err);
                }
            );
        })
        .catch(err => console.log(err));
    });
}

exports.getEditLibros = (req, res, next) => {
    const libroId = req.params.Id;
    const edit = req.query.edit;
    if (!edit) {
        return res.redirect("/");
    }
    Libro.findOne({ where: { id: libroId } })
        .then((result) => {
            const libro = result.dataValues;
            if (!libro) {
                return res.redirect("/libro");
            }
            Categorias.findAll()
                .then((result) => {
                    const categoria = result.map((result) => result.dataValues);
                    Editorial.findAll()
                        .then((result) => {
                            const editorial = result.map((result) => result.dataValues);
                            Autor.findAll()
                                .then((result) => {
                                    const autor = result.map((result) => result.dataValues);
                                    res.render("book/save-book", {
                                        pageTitle: "Editar Libro",
                                        homeBook: true,
                                        editMode: edit,
                                        libros: libro,
                                        categoria: categoria,
                                        editorial: editorial,
                                        autor: autor,
                                        hasAutor: autor.length > 0,
                                        hasEditorial: editorial.length > 0,
                                        hasCategoria: categoria.length > 0
                                    });
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postEditLibros = (req, res, next) => {
    const titulo = req.body.Titulo;
    const ano = req.body.Ano;
    const categoria = req.body.Categoria;
    const editorial = req.body.Editorial;
    const autor = req.body.Autor;
    const libroI = req.body.Id;
    const imagenLibro = req.file;

    Libro.findOne({ where: { id: libroI } })
        .then((result) => {
            const libro = result.dataValues;
            if (!libro) {
                return res.redirect("/");
            }
            const imagePath = imagenLibro ? "/" + imagenLibro.path : libro.imagen; // operador ternario    })
            Libro.update({
                titulo: titulo,
                ano: ano,
                imagen: imagePath,
                CategoriaId: categoria,
                EditorialId: editorial,
                AutorId: autor
            }, {
                where: {
                    id: libroI
                }
            })

                .then((result) => {
                    res.redirect("/libro");
                })
                .catch((err) => {
                    console.log(err);
                });
        })
}

exports.postDeleteLibros = (req, res, next) => {
    const libroId = req.body.Id;
    Libro.findByPk(libroId)
        .then((libro) => {
            return libro.destroy();
        })
        .then((result) => {
            res.redirect("/libro");
        })
        .catch((err) => {
            console.log(err);
        });
}