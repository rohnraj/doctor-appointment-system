// config/cloudinaryStorage.js
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Bootcamp-project-doctorImg', // optional
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export default storage;
