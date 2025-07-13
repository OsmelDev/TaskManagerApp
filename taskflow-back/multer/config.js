const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'audio/wav' || file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/webm') {
      cb(null, true);
    } else {
      cb(new Error('Formato de audio no soportado'), false);
    }
  }
});

module.exports = upload