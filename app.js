const path = require('path');
const express = require('express');
const sequelize = require('./context/appContext');
const errorController = require('./controllers/ErrorController');
const compareHelpers = require('./util/hbs/compare');
const autor = require('./models/autor');
const book = require('./models/book');
const categorias = require('./models/categorias');
const editorial = require('./models/editoriales');
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const {engine} = require('express-handlebars');


const app = express();
app.engine(
    'hbs',
    engine({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layouts',
        extname: 'hbs',
        helpers:{
            equalValue: compareHelpers.EqualValue,
            and: compareHelpers.and,
        },
    })
)

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/images",express.static(path.join(__dirname, "images")));

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

app.use(multer({ storage: imageStorage }).single("Imagen"));


const editorialAdmin = require('./routes/editorialAdmin');
const autorAdmin = require('./routes/autorAdmin');
const categoriaAdmin = require('./routes/categoriaAdmin');
const bookAdmin = require('./routes/bookAdmin');
const homeAdmin = require('./routes/homeAdmin');

app.use("/categoria", categoriaAdmin)
app.use("/editorial", editorialAdmin);
app.use("/autor", autorAdmin);
app.use("/libro", bookAdmin);
app.use( homeAdmin);


app.use("/", errorController.Get404);


book.belongsTo(autor,{consstraint: true, onDelete:"CASCADE"});
autor.hasMany(book);

book.belongsTo(editorial,{consstraint: true, onDelete:"CASCADE"});
editorial.hasMany(book);

book.belongsTo(categorias,{consstraint: true, onDelete:"CASCADE"});
categorias.hasMany(book);


sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})
