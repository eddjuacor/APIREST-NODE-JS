import express from 'express';

import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombra el archivo con un timestamp único
  }
});

export const upload = multer({ storage });

export default router
