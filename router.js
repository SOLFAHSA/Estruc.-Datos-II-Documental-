const express = require("express");
const router = express.Router();
 

router.use('/public', express.static('public'));  
router.use('/public', express.static(__dirname + '/public'));  // Ruta para archivos estáticos

router.use('/archivos', express.static('Archivos'));  


const conexion = require("./database/conexiondb");      // Conexión a la base de datos
const uploadFile = require("./controllers/SubirArchivo"); // Controlador de subida de archivos

//const crudtareas = require("./controllers/crudtareas"); 

//Ruta para ver la lista de tareas
router.get("/listatareas", (req, res)=>{  
    conexion.query("SELECT idtarea, NombreTarea, Archivo, RutaArchivo, DepartamentoAsignado,Prioridad, Estado, FechaVencimeinto FROM tareas", (error,results)=>{  // Consulta a la base de datos
        if(error){ // Si hay un error en la consulta a la base de datos 
            throw error; // Lanzamos el error
        }else{ // Si no hay error
            res.render("UsuarioTareas", {results:results},);  // Renderizamos la vista y le pasamos los resultados de la consulta
        }
})
})

/* router.get("/departamentos", (req, res)=>{  
    conexion.query("SELECT nombre FROM departamentos", (error,results)=>{  // Consulta a la base de datos
        if(error){ // Si hay un error en la consulta a la base de datos 
            throw error; // Lanzamos el error
        }else{ // Si no hay error
            res.render("UsuarioTareas", {results:results},);  // Renderizamos la vista
        }
})
}) */

router.get("/", (req, res)=>{  
    res.render("login");
})
router.get("/index", (req, res)=>{ 
    res.render("index");
})


router.get("/registro", (req, res)=>{
    res.render("registro");
})


router.get("/carpetas", (req, res)=>{
    res.render("carpetas");
})




//Ruta para guardar datos del formulario de crear tareas
router.post("/guardar", uploadFile() ,(req, res)=>{ 
 const filename = req.file.filename; // Obtenemos el nombre del archivo
  const ruta= req.file.path; // Obtenemos la ruta del archivo
  const tarea = req.body.tarea;   
  const archivo = req.file.filename;
  const DepartamentoAsignado = req.body.DepartamentoAsignado;
  const estado  = req.body.estado;
  const prioridad = req.body.prioridad;
  const fechavencimiento = req.body.fechavencimiento;

  //console.log(tarea + " " + archivo + " " + DepartamentoAsignado + " " + estado + " " + prioridad + " " + fechavencimiento);
  conexion.query("INSERT INTO tareas SET ?", {NombreTarea:tarea, Archivo: archivo, RutaArchivo:ruta, DepartamentoAsignado: DepartamentoAsignado, Estado: estado, Prioridad: prioridad, FechaVencimeinto: fechavencimiento}, (error, results)=>{
      if(error){
          throw error;
      }else{
        
          res.redirect("/listaTareas")
        }
    })

})

//Ruta para actualizar tareas
router.get("/editartarea/:idtarea", (req, res)=>{
    const idtarea = req.params.idtarea;
    conexion.query("SELECT * FROM tareas WHERE idtarea=?",[idtarea], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render("EditarTareas", {tarea:results[0]}); 
        }
    })
})

//Ruta para eliminar tareas
router.get("/eliminartarea/:idtarea", (req, res)=>{
    const id = req.params.idtarea;
    conexion.query("SELECT RutaArchivo FROM tareas WHERE idtarea=?",[id], (error, results)=>{
        if(error){
            throw error;
        }else{
        const ruta = results[0].RutaArchivo;
        const fs = require('fs');
        // Eliminar archivo
            fs.unlink(ruta, (err) => {
                if (err) {
                    console.error(err)
                    return //si hay un error, detener la ejecución
                }
                //file removed
            })
        } 
            //borrar el registro en la base de datos
            conexion.query("DELETE FROM tareas WHERE idtarea=?",[id], (error, results)=>{
                if(error){
                    throw error;
                }else{

                    res.redirect("/listaTareas");
                }
            })
            
        }
    )
})



//elimi9ar archivo de la carpeta archivos que corresponde a la tarea
router.get("/eliminararchivo/:idtarea", (req, res)=>{
    const id = req.params.idtarea;
    conexion.query("SELECT RutaArchivo FROM tareas WHERE idtarea=?",[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            var ruta = results[0].RutaArchivo;
            console.log(ruta);
            fs.unlink(ruta, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                //file removed
            })
            res.redirect("/listaTareas");
        }
    })
}
)


router.post("/archivos" ,(req, res)=>{
   res.render("archivos");
})




module.exports = router;    
