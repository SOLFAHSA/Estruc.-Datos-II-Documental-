const multer=require('multer'); // Importamos multer
  // Importamos path


function uploadFile(){
    const storage = multer.diskStorage({
        destination: 'Archivos', // Ruta donde se guardan los archivos
        filename: (req, file, cb)=>{
            
            let extencion = file.originalname.slice(file.originalname.lastIndexOf('.')); // Obtenemos la extención del archivo
            cb(null, file.originalname+ '-' + Date.now() + extencion); 
            console.log.path; 
        }
    })

    const upload = multer({storage: storage}).single('archivo'); // Nombre del campo del formulario

    return upload;
}

module.exports = uploadFile;