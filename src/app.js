const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();
// importing routes
const customerRoutes = require('./routes/customer.');

// SETTINGS
app.set('port', process.env.PORT || 3000); // VARIABLE DONDE SE DEFINE LA VARIABLE DEL PIERTO
app.set('view engine', 'ejs'); // SE USA EJS COMO MOTOR DE PLANTILLAS
app.set('views', path.join(__dirname, 'views')) // SE DEFINE LA RUTA DEL ARCHIO VIEWS

// MIDDLEWARES
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '123',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({ extend: false })); // MÉTODO QUE PERMITE ENTENDER LOS DATOS QUE VENGAN DEL FORM

// ROUTES
app.use('/', customerRoutes);

// STATICS FILES
app.use(express.static(path.join(__dirname, 'public')));

// STARTING THE SERVER

app.listen(app.get('port'), () => {
    console.log("Server on port 3000");
})