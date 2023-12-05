const { existsSync, mkdirSync } = require('fs-extra');
const multer = require('multer');
const path = require('path');

// Valida que envie un archivo y administra su nombre y destino
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      const folderPath = path.join(__dirname, '../uploadsImages');
      if (!existsSync(folderPath)) {
         mkdirSync(folderPath);
      }
      cb(null, folderPath);
   },
   filename: (req, file, cb) => {
      try {
         if (!file.originalname) {
            throw new Error('Debes agregar una imagen');
         }
   
         cb(null, `${Date.now()}-${file.originalname}`);
      } catch (error) {
         cb(new Error(error.message));
      }
   },
})

// El tamaño de la imagen maximo
const fileSizeRequired = 50 * 1024 *1024 //5mb
// Tipos de extensiones disponibles
const imageType = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/svg"]

// Valida los formatos, el peso y guarda la imagen
const upload = multer({
   storage: storage,
   fileFilter: async(req, file, cb) => {
      try {
         if (!(imageType.includes(file.mimetype))){
            throw new Error(`Solamente formatos ${imageType.join(' ')} son permitidos`);
         }

         if (file.size > fileSizeRequired) {
            throw new Error('La imagen debe ser menor a 5mb');
         }
         console.log('Se subio la imagen correctamente')
         cb(null, true)
      } catch (error) {
         cb(new Error(error.message));
         console.log(error)
      }
   },
   limits: {
      fieldSize: 10000000,
   },
});

module.exports = {
   upload
};