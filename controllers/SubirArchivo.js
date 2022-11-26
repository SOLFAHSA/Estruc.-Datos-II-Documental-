const multer=require('multer'); // Importamos multer
 



function uploadFile(){
    const storage = multer.diskStorage({
        
        destination: 'Archivos', // Ruta donde se guardan los archivos
        filename: (req, file, cb)=>{ 
            //obtyene el nombre del archivo antes del punto
            const nombre = file.originalname.split('.')[0];//obtyene el nombre del archivo antes del punto
            
            let extencion = file.originalname.slice(file.originalname.lastIndexOf('.')); // Obtenemos la extención del archivo
            cb(null, nombre + '-' + Date.now() + extencion); 
           


        }
    })

    const upload = multer({storage: storage}).single('archivo'); // Nombre del campo del formulario

    return upload; // Retornamos la función upload
}

module.exports = uploadFile; 