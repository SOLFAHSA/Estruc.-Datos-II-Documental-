const conexion = require("../database/conexiondb"); 
const uploadFile = require("../controllers/SubirArchivo");




exports.guardar = (req, res) => {

    

   const tarea = req.body.tarea;   
   const archivo = req.file.filename;
    const DepartamentoAsignado = req.body.DepartamentoAsignado;
    const estado  = req.body.estado;
    const prioridad = req.body.prioridad;
    const fechavencimiento = req.body.fechavencimiento;


    console.log(tarea + " " + archivo + " " + DepartamentoAsignado + " " + estado + " " + prioridad + " " + fechavencimiento);

    conexion.query("INSERT INTO tareas SET ?", {NombreTarea:tarea, Archivo: archivo, DepartamentoAsignado: DepartamentoAsignado, Estado: estado, Prioridad: prioridad, FechaVencimeinto: fechavencimiento}, (error, results)=>{
        if(error){
            throw error;
        }else{
          
            res.redirect("/listaTareas")
        }
    })

}

function convertDateMysql(strDate){
    const parts = strDate.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return year+"-"+month.padStart(2, "0")+"-"+day.padStart(2, "0");
}