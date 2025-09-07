import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    fieldSize: 10 * 1024 * 1024, // 10MB for fields
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

export default upload;