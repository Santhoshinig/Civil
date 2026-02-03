import axios from 'axios';

// Cloudinary configuration
const cloudName = "dow8stewd";
const uploadPreset = "civil-admin"; // Matches your specific Unsigned Preset

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "civil-doctor-products"); // Store images in this specific folder

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};
