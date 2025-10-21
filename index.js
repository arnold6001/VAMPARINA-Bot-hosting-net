const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use('/styles.css', express.static(path.join(__dirname, 'public/styles.css')));

// Multer config for file uploads (any file type)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        cb(null, `${baseName}-${Date.now()}${ext}`); // Unique filename with timestamp
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Allow any file type
        cb(null, true);
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/upload', upload.single('session'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // In a full setup: Save session file to user-specific folder, trigger bot deploy
    console.log('Session file uploaded:', req.file.path);
    res.json({ message: `Upload successful! Bot ready to deploy with ${req.file.filename}.` });
});

// Health check for 24/7
app.get('/health', (req, res) => res.send('VAMPARINA Hosting: Active 24/7'));

app.listen(PORT, () => {
    console.log(`VAMPARINA Hosting Panel running on port ${PORT}`);
    console.log('Deployed by Arnold Chirchir | arnoldkipruto193@gmail.com');
});