const Editorial = require('../models/editoriales');
const Libros = require('../models/book');
const Sequelize = require('../context/appContext');

exports.getCountBookEditorial = (req, res, next) => {
    Editorial.findAll({
        attributes: ['id', 'nombre', 'telefono','pais', [Sequelize.fn('COUNT', Sequelize.col('Books.id')), 'cantidad_libros']],
        include: [{
          model: Libros,
          attributes: []
        }],
        group: ['Editorial.id']
      })
        .then((result) => {
            const editorial = result.map((result) => result.dataValues);
            res.render("editorial/editorial-list", {
                pageTitle: "Editoriales",
                homeEditorial: true,
                editorial: editorial,
                hasEditorial: editorial.length > 0
            });
        })
        .catch(err => console.log(err));
}

exports.getCreateEditorial =(req, res, next)=>{
    res.render("editorial/save-editorial",{
        pageTitle: "Crear Editorial",
        homeEditorial: true,
        editMode: false
    });
}

exports.postCreateEditorial =(req, res, next)=>{
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const pais = req.body.pais;
    Editorial.create({
        nombre: nombre,
        telefono: telefono,
        pais: pais
    })
    .then((result)=>{
        res.redirect("/editorial");
    })
    .catch(err=>console.log(err));
}

exports.getEditEditorial=(req, res, next)=>{
    const editorialId = req.params.Id;
    const edit = req.query.edit;
    if (!edit) {
        return res.redirect("/");
    }
    Editorial.findOne({ where: { id: editorialId } })
        .then((result) => {
            const editorial = result.dataValues;
            if(!editorial){
                return res.redirect("/");
            }
            res.render("editorial/save-editorial", {
                pageTitle: "Editar Editorial",
                homeEditorial: true,
                editMode: edit,
                editorial: editorial,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

exports.postEditEditorial=(req, res, next)=>{
    const editorialId = req.body.Id;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const pais = req.body.pais;
    Editorial.update({
        nombre: nombre,
        telefono: telefono,
        pais: pais
    },
    {where: {id: editorialId}}
    )
    .then((result)=>{
        res.redirect("/editorial");
    })
    .catch(err=>console.log(err));
}

exports.postDeleteEditorial = (req,res,next)=>{
    const editorialId = req.body.Id;
    Editorial.destroy({where: {id: editorialId}})
    .then((result)=>{
        res.redirect("/editorial");
    })
    .catch(err=>console.log(err));
}
    