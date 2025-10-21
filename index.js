const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use('/styles.css', express.static(path.join(__dirname, 'public/styles.css')));

// Multer config for file uploads (creds.js only)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, 'creds.js');  // Overwrite or unique if multi-user
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.originalname === 'creds.js') {
            cb(null, true);
        } else {
            cb(new Error('Only creds.js allowed'), false);
        }
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/upload', upload.single('creds'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded or invalid file' });
    }
    // Here, in a full setup: Save creds to session folder, trigger bot deploy (e.g., exec 'node ../VAMPARINA-V1/index.js')
    // For demo: Just confirm
    console.log('creds.js uploaded:', req.file.path);
    res.json({ message: 'Upload successful! Bot ready to deploy.' });
});

// Health check for 24/7
app.get('/health', (req, res) => res.send('VAMPARINA Hosting: Active 24/7'));

app.listen(PORT, () => {
    console.log(`VAMPARINA Hosting Panel running on port ${PORT}`);
    console.log('Deployed by Arnold Chirchir | arnoldkipruto193@gmail.com');
});