import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}
const removeFromCloudinary = async (fileUrl) => {
    try {
        if (!fileUrl || typeof fileUrl !== 'string') {
            throw new Error('Invalid file URL provided.');
        }

        // Extract the filename (public ID) from the last part of the URL
        const urlParts = fileUrl.split('/');
        const publicIdWithExtension = urlParts.pop();  // Get the last part (e.g. 'sample.jpg')

        // Remove the file extension to get the Cloudinary public ID
        const publicId = publicIdWithExtension.split('.')[0];

        // Delete the file from Cloudinary using the extracted public ID
        const response = await cloudinary.uploader.destroy(publicId);

        if (response.result === 'ok') {
            console.log('File successfully deleted from Cloudinary.');
        } else {
            console.warn('File not found or already deleted.');
        }
    } 
    catch (error) {
        console.error('Error deleting file from Cloudinary:', error.message);
    }
};


export {uploadOnCloudinary,removeFromCloudinary}