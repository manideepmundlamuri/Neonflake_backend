const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify your desired upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to accept only specific image and video types
const fileFilter = (req, file, cb) => {
    console.log('File MIME Type:', file.mimetype);  // Log the MIME type

    // Allowed image and video file types
    const allowedImageTypes = ['image/jpeg', 'image/png'];
    const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mpeg', 'video/x-msvideo'];

    if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPG, PNG, MPG, AVI, and MP4 are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
