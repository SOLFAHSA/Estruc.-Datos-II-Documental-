const express = require("express");
const router = require("./router");

const app = express();
const PORT = 3000;
/*
app.get("/", (req, res)=>{
    res.json({
        message: "Proyecto en Desarrollo | MUCHACHOS A TRABAJAR DURO SON 20 PUNTOS | QUE SE VENGAN LOS DESVELOS"});
}) */

app.set('view engine', 'ejs');

app.use('/', require('./router'));

app.listen(3000,() => {
    console.log("Servidor Ejecutandose http://localhost:${PORT}");
});