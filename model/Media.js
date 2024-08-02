const mongoose = require('mongoose');
const mediaSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnailUrl: String,
    videoUrl: String,
    thumbnailCloudinaryId: String,
    videoCloudinaryId: String
})

module.exports = mongoose.model('Media', mediaSchema);