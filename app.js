const express = require("express");
const router = require("./router");
const path = require('path');
const app = express();
const PORT = 3000;
/*
app.get("/", (req, res)=>{
    res.json({
        message: "Proyecto en Desarrollo | MUCHACHOS A TRABAJAR DURO SON 20 PUNTOS | QUE SE VENGAN LOS DESVELOS"});
}) */

app.set('view engine', 'ejs'); // Motor de plantillas
app.use(express.urlencoded({extended: false})); // Para poder recibir datos del formulario
app.use(express.json()); // Para poder recibir datos en formato JSON

app.use('/', require('./router'));

app.listen(3000,() => {
    console.log("Servidor Ejecutandose http://localhost:${PORT}"); 
});