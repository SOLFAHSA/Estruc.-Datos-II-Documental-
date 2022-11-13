const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res)=>{
    res.json({
        message: "Proyecto en Desarrollo | MUCHACHOS A TRABAJAR DURO SON 20 PUNTOS | QUE SE VENGAN LOS DESVELOS"});
})

app.listen(3000,() => {
    console.log("Servidor Ejecutandose http://localhost:${PORT}");
})