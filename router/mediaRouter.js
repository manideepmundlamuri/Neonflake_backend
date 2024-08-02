const express = require('express');
const router = express.Router();
const Media = require('../model/Media');
const upload = require('../config/multer');
const cloudinary = require('../config/cloudinary');

// Route for uploading files
router.post('/upload', upload.fields([{ name: 'thumbnail' }, { name: 'video' }]), async (req, res) => {
    try {
        // Check if files are present
        if (!req.files || !req.files.thumbnail || !req.files.video) {
            return res.status(400).send('Thumbnail and video files are required.');
        }

        // Upload to Cloudinary
        const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { folder: 'uploads/thumbnails' });
        const videoResult = await cloudinary.uploader.upload(req.files.video[0].path, { folder: 'uploads/videos', resource_type: 'video' });

        // Save media details to the database
        const newMedia = new Media({
            title: req.body.title,
            description: req.body.description,
            thumbnailUrl: thumbnailResult.secure_url,
            videoUrl: videoResult.secure_url,
            thumbnailCloudinaryId: thumbnailResult.public_id,
            videoCloudinaryId: videoResult.public_id
        });

        await newMedia.save();
        res.json(newMedia);
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('An error occurred while uploading files.');
    }
});


router.get('/media', async (req, res) => {
    try {
        const media = await Media.find();
        res.json(media);
    } catch (error) {
        console.error('Error retrieving media:', error);
        res.status(500).send('An error occurred while retrieving media.');
    }
});

router.get('/media/:id', async (req, res) => {
    try {
      const media = await Media.findById(req.params.id);
      if (!media) {
        return res.status(404).json({ message: 'Media not found' });
      }
      res.json(media);
    } catch (error) {
      console.error('Error fetching media:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
