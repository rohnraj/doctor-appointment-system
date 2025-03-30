

import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import { deflate } from 'zlib';
dotenv.config()


cloudinary.config({ 
    cloud_name: process.env.my_cloud_name, 
    api_key: process.env.api_key,
    api_secret: process.env.api_seceret
});
        
export default cloudinary;