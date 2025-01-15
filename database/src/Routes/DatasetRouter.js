import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { deleteDataset, uploadCSV } from '../Controller/dataset.js';
import { fileURLToPath } from 'url';

// Ensure the uploads directory exists
const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = path.dirname(__filename); // Get the directory path of the current module
const uploadPath = path.join(__dirname, 'database', 'uploads'); // Correct path to the uploads folder

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Set the destination for file uploads
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).single('file');

// Router to handle CSV upload
const router = express.Router();

// Upload route
router.post('/upload-csv', (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Multer-specific error
            return res.status(500).send({ message: `Multer Error: ${err.message}` });
        } else if (err) {
            // General error
            return res.status(500).send({ message: `Error: ${err.message}` });
        }
        // Call your uploadCSV function after successful upload
        uploadCSV(req, res);
    });
});

// Delete dataset route
router.delete('/delete-dataset/:id', deleteDataset);

export default router;
