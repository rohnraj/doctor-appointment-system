
import multer from 'multer';
import path from 'path';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from '@/config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'BootCamp/DoctorApp',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage: storage });
export default upload;